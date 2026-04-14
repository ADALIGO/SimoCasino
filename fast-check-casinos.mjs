import fs from 'fs';
import path from 'path';
import axios from 'axios';
import pLimit from 'p-limit';
import { load } from 'cheerio';

const DATA_FILE = path.join(process.cwd(), 'casinos_data.json');
const OUTPUT_FILE = path.join(process.cwd(), 'all_4000_casinos_checked_style.txt');
const JSON_OUTPUT_FILE = path.join(process.cwd(), 'all_4000_casinos_checked_style.json');
const PROGRESS_FILE = path.join(process.cwd(), 'fast_casino_check_progress.json');
const LOG_FILE = path.join(process.cwd(), 'fast_casino_check.log');

const DEFAULT_CONCURRENCY = 12;
const TIMEOUT = 3000;
const RETRIES = 1;
const SAVE_INTERVAL = 1;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

const KEYWORDS_RE = /\b(casino|slot|slots|bet|bets|game|games|jackpot|live casino|live dealer|poker|blackjack|roulette|spin|spins)\b/i;
const NEGATIVE_RE = /\b(parked|parked domain|buy this domain|for sale|404|not found|domain expired|suspended|expired|unavailable|access denied|no access|error page|coming soon|dns error|service unavailable|502|503|504|forbidden)\b/i;
const SSL_ERROR_RE = /SSL|certificate|tls|protocol|self signed/i;
const AFFILIATE_BLACKLIST = /\b(affiliate|trustpilot|facebook|twitter|linkedin|youtube|instagram|pinterest|google\.com|bing\.com|yelp\.com|tripadvisor\.com|godaddy\.com|squarespace\.com|wix\.com|domain\.com|webnode\.com|zoho\.com|mailchimp\.com)\b/i;

const limit = pLimit(DEFAULT_CONCURRENCY);

function parseArgs() {
  const args = {
    resume: false,
    inferOnly: false,
    max: undefined,
    concurrency: DEFAULT_CONCURRENCY,
    help: false,
  };

  for (const raw of process.argv.slice(2)) {
    if (raw === '--resume') {
      args.resume = true;
    } else if (raw === '--infer-only') {
      args.inferOnly = true;
    } else if (raw.startsWith('--max=')) {
      args.max = Number(raw.split('=')[1]) || undefined;
    } else if (raw.startsWith('--concurrency=')) {
      args.concurrency = Number(raw.split('=')[1]) || DEFAULT_CONCURRENCY;
    } else if (raw === '--help' || raw === '-h') {
      args.help = true;
    }
  }

  return args;
}

function printHelp() {
  console.log('Usage: node fast-check-casinos.mjs [options]');
  console.log('Options:');
  console.log('  --resume              Resume from the last saved progress');
  console.log('  --infer-only          Infer candidate URLs without network validation');
  console.log('  --max=<n>             Process at most <n> entries');
  console.log('  --concurrency=<n>     Number of concurrent HTTP requests');
  console.log('  --help, -h            Show this help');
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function normalizeSlug(rawSlug, fallbackName) {
  const slugSource = rawSlug || fallbackName || '';
  return String(slugSource)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeDomainBase(value) {
  if (!value || typeof value !== 'string') {
    return '';
  }

  let normalized = value
    .normalize('NFKD')
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9-.]/g, '-')
    .replace(/\.{2,}/g, '.')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/\.+$/g, '')
    .toLowerCase();

  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    try {
      normalized = new URL(normalized).hostname;
    } catch {
      // ignore
    }
  }

  normalized = normalized.replace(/^www\./, '');
  normalized = normalized.replace(/-+/g, '-');

  if (!/[a-z0-9]/.test(normalized)) {
    return '';
  }

  return normalized;
}

function buildDomainCandidates(name, slug) {
  const candidates = new Set();
  const safeName = normalizeDomainBase(name);
  const safeSlug = normalizeDomainBase(slug);
  const base = safeName || safeSlug;
  const tlds = ['.com', '.net', '.org', '.io', '.co', '.casino', '.bet', '.site', '.online'];

  if (base && base.includes('.') && /^[a-z0-9-]+\.[a-z]{2,}$/i.test(base)) {
    candidates.add(base);
    candidates.add(`www.${base}`);
  }

  if (base && !base.includes('.')) {
    for (const tld of tlds) {
      candidates.add(`${base}${tld}`);
    }
    if (!base.endsWith('casino')) {
      candidates.add(`${base}-casino.com`);
    }
    if (!base.endsWith('bet')) {
      candidates.add(`${base}-bet.com`);
    }
  }

  if (safeSlug && safeSlug !== base) {
    for (const tld of tlds) {
      candidates.add(`${safeSlug}${tld}`);
    }
    if (!safeSlug.endsWith('casino')) {
      candidates.add(`${safeSlug}-casino.com`);
    }
    if (!safeSlug.endsWith('bet')) {
      candidates.add(`${safeSlug}-bet.com`);
    }
  }

  return [...candidates].map((candidate) => candidate.trim()).filter(Boolean);
}

function ensureUrl(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let url = raw.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}

function clampScore(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }
  return Math.min(100, Math.max(0, Math.round(value)));
}

function extractMetadata(html, url) {
  const document = load(html);
  const title = document('title').first().text().trim();
  const description = document('meta[name="description"]').attr('content') || document('meta[property="og:description"]').attr('content') || '';
  const pageText = `${title} ${description} ${document('body').text()}`.replace(/\s+/g, ' ').trim();
  return { title, description, pageText, url };
}

function evaluateMetadata(metadata) {
  const text = String(metadata.pageText || '').toLowerCase();
  const title = String(metadata.title || '').toLowerCase();
  const description = String(metadata.description || '').toLowerCase();
  const negative = NEGATIVE_RE.test(text) || NEGATIVE_RE.test(title) || NEGATIVE_RE.test(description);
  const hasKeywords = KEYWORDS_RE.test(text) || KEYWORDS_RE.test(title) || KEYWORDS_RE.test(description);
  const hasLive = /live casino|live dealer|live games|live baccarat|live blackjack|live roulette|live poker/i.test(text);
  const score = clampScore(
    40 + (hasKeywords ? 30 : 10) + (hasLive ? 10 : 0) + (title && KEYWORDS_RE.test(title) ? 10 : 0) + (description && KEYWORDS_RE.test(description) ? 10 : 0)
  );
  const verified = hasKeywords && !negative;
  return { score, verified, negative, hasLive, hasKeywords };
}

async function fetchHtml(url) {
  try {
    const response = await axios.get(url, {
      timeout: TIMEOUT,
      maxRedirects: 5,
      responseType: 'text',
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      validateStatus: (status) => status >= 200 && status < 400,
    });

    const contentType = String(response.headers['content-type'] || '');
    const html = String(response.data || '');
    const finalUrl = response.request?.res?.responseUrl || response.config.url;

    return { html, contentType, finalUrl, status: response.status };
  } catch (error) {
    return { error: error.message || 'request failed' };
  }
}

async function retryRequest(url) {
  let lastError = null;
  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    const result = await fetchHtml(url);
    if (!result.error) {
      return result;
    }
    lastError = result.error;
    if (SSL_ERROR_RE.test(lastError)) {
      break;
    }
  }
  return { error: lastError };
}

function shouldSkipUrl(url) {
  return AFFILIATE_BLACKLIST.test(url || '') || !url;
}

async function validateCandidate(candidate) {
  const url = ensureUrl(candidate);
  if (!url || shouldSkipUrl(url)) {
    return null;
  }

  const attempt = await retryRequest(url);
  if (attempt.error) {
    return { candidate: url, error: attempt.error };
  }

  if (!attempt.contentType.toLowerCase().includes('html')) {
    return { candidate: url, error: 'non-html response', status: attempt.status };
  }

  const metadata = extractMetadata(attempt.html, attempt.finalUrl || url);
  const evaluation = evaluateMetadata(metadata);
  return {
    candidate: url,
    url: attempt.finalUrl || url,
    contentType: attempt.contentType,
    status: attempt.status,
    metadata,
    ...evaluation,
  };
}

function formatLine(entry) {
  const label = entry.status.startsWith('✅') ? '✅ Valid casino' : entry.status.startsWith('⚠️ Possible') ? '⚠️ Possible casino' : entry.status.startsWith('⚠️ Inferred') ? '⚠️ Inferred casino' : '⚠️ Unverified casino';
  const url = entry.resolvedUrl || entry.candidateUrl || '[no-url]';
  return `${label}: ${entry.name} → ${url} (${entry.confidence}%)`;
}

function writeOutput(results) {
  const lines = results.map(formatLine);
  fs.writeFileSync(OUTPUT_FILE, lines.join('\n'), 'utf8');
  saveJson(JSON_OUTPUT_FILE, results);
}

function saveProgress(progress) {
  saveJson(PROGRESS_FILE, progress);
}

function loadProgress() {
  if (!fs.existsSync(PROGRESS_FILE)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  } catch {
    return null;
  }
}

function log(message) {
  const entry = `[${new Date().toISOString()}] ${message}`;
  fs.appendFileSync(LOG_FILE, `${entry}\n`, 'utf8');
  console.log(message);
}

async function buildEntry(index, casino, args, checkLimit) {
  const name = String(casino.name || '').trim() || `unknown-${index + 1}`;
  const slug = normalizeSlug(casino.slug, name || casino.slug || '');
  const candidates = buildDomainCandidates(name, casino.slug);
  const preparedCandidates = candidates.map((candidate) => ensureUrl(candidate)).filter(Boolean);

  const entry = {
    index: index + 1,
    name,
    slug: slug || `entry-${index + 1}`,
    candidateUrl: null,
    resolvedUrl: null,
    confidence: 0,
    status: '⚠️ Unverified casino',
    checked: false,
    verified: false,
    reason: 'no-candidate',
    candidates: preparedCandidates,
    checkedCandidates: [],
    timestamp: new Date().toISOString(),
  };

  if (preparedCandidates.length > 0) {
    entry.candidateUrl = preparedCandidates[0];
    entry.reason = 'inferred';
  }

  if (!args.inferOnly && preparedCandidates.length > 0) {
    for (const candidate of preparedCandidates) {
      const validation = await checkLimit(() => validateCandidate(candidate));
      entry.checkedCandidates.push({ candidate, result: validation });

      if (validation && validation.verified) {
        entry.resolvedUrl = validation.url || validation.candidate;
        entry.confidence = validation.score;
        entry.checked = true;
        entry.verified = true;
        entry.status = '✅ Valid casino';
        entry.reason = 'verified';
        break;
      }

      if (validation && !validation.negative) {
        entry.resolvedUrl = validation.url || validation.candidate;
        entry.confidence = validation.score;
        entry.checked = true;
        entry.status = '⚠️ Possible casino';
        entry.reason = 'possible';
      }
    }
  }

  if (!entry.checked && entry.candidateUrl) {
    entry.confidence = 20;
    entry.status = '⚠️ Inferred casino';
    entry.reason = 'inferred';
  }

  if (!entry.candidateUrl) {
    entry.confidence = 0;
    entry.status = '⚠️ Unverified casino';
    entry.reason = 'no-candidate';
  }

  return entry;
}

async function run() {
  const args = parseArgs();
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`Missing dataset file: ${DATA_FILE}`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const total = Array.isArray(rawData) ? rawData.length : 0;
  const concurrency = args.concurrency || DEFAULT_CONCURRENCY;

  let startIndex = 0;
  let results = [];

  if (args.resume) {
    const progress = loadProgress();
    if (progress && Array.isArray(progress.results)) {
      startIndex = progress.lastProcessedIndex + 1;
      results = progress.results || [];
      log(`🔄 Resuming from entry ${startIndex + 1}/${total} (${results.length} already processed)`);
    } else {
      log('⚠️ No valid resume progress found, starting from the beginning');
    }
  }

  const remaining = total - startIndex;
  const maxCount = args.max ? Math.min(args.max, remaining) : remaining;

  log(`📦 Loaded ${total} casinos from ${DATA_FILE}`);
  log(`⚙️  Fast checking ${maxCount} entries with concurrency ${concurrency} ${args.inferOnly ? '[infer-only]' : ''}`);

  const checkLimit = pLimit(concurrency);
  const batchSize = SAVE_INTERVAL;
  const resultsByIndex = results.slice();
  const entries = rawData.slice(startIndex, startIndex + maxCount);

  for (let batchStart = 0; batchStart < entries.length; batchStart += batchSize) {
    const batch = entries.slice(batchStart, batchStart + batchSize);
    const tasks = batch.map((casino, offset) => {
      const actualIndex = startIndex + batchStart + offset;
      return checkLimit(() => buildEntry(actualIndex, casino, args, checkLimit));
    });

    const completed = await Promise.all(tasks);
    resultsByIndex.push(...completed);

    const lastProcessedIndex = startIndex + batchStart + completed.length - 1;
    writeOutput(resultsByIndex);
    saveProgress({ lastProcessedIndex, results: resultsByIndex, timestamp: new Date().toISOString() });
    log(`💾 Saved progress at ${lastProcessedIndex + 1}/${total} entries`);
  }

  writeOutput(resultsByIndex);
  saveProgress({ lastProcessedIndex: startIndex + maxCount - 1, results: resultsByIndex, timestamp: new Date().toISOString(), completed: true });
  log(`✅ Completed fast check for ${maxCount} casinos`);
  log(`   Output file: ${OUTPUT_FILE}`);
  log(`   JSON file: ${JSON_OUTPUT_FILE}`);
}

run().catch((error) => {
  console.error('❌ Fast check failed:', error?.stack || error);
  process.exit(1);
});
