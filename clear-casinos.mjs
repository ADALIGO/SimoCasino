import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { load } from 'cheerio';
import pLimit from 'p-limit';
import { PrismaClient } from '@prisma/client';

const DATA_FILE = path.join(process.cwd(), 'casinos_data.json');
const OUTPUT_FILE = path.join(process.cwd(), 'casinos_data_clean.json');
const TEXT_OUTPUT_FILE = path.join(process.cwd(), 'all_4000_casinos_checked_style.txt');
const REPORT_FILE = path.join(process.cwd(), 'clean_casinos_report.json');
const INVALID_FILE = path.join(process.cwd(), 'invalid_casinos.json');
const FIXED_FILE = path.join(process.cwd(), 'fixed_domains.json');
const PROGRESS_FILE = path.join(process.cwd(), 'casino_cleanup_progress.json');

const CONCURRENCY = 6;
const TIMEOUT = 5000;
const RETRIES = 2;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

const KEYWORDS_RE = /\b(casino|slot|slots|bet|bets|game|games|jackpot|live casino|live dealer|poker|blackjack|roulette)\b/i;
const NEGATIVE_RE = /\b(parked|parked domain|buy this domain|for sale|404|not found|domain expired|suspended|expired|unavailable|access denied|no access|error page|coming soon|dns error|service unavailable|502|503|504|forbidden)\b/i;
const LICENSE_RE = /\b(MGA|Curacao|UKGC|Gibraltar|Malta|Ontario|Alderney|Kahnawake|Gambling Commission|Gaming Authority)\b/i;
const LIVE_RE = /\b(live casino|live dealer|live games|live baccarat|live blackjack|live roulette|live poker)\b/i;
const AFFILIATE_BLACKLIST = /\b(affiliate|trustpilot|facebook|twitter|linkedin|youtube|instagram|pinterest|google\.com|bing\.com|yelp\.com|tripadvisor\.com|godaddy\.com|squarespace\.com|wix\.com|domain\.com|webnode\.com|zoho\.com|mailchimp\.com)\b/i;

const prisma = new PrismaClient();
const limit = pLimit(CONCURRENCY);

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error?.stack || error);
  process.exit(1);
});

// Handle graceful shutdown to save progress
process.on('SIGINT', () => {
  console.log('\n🛑 Received interrupt signal, saving progress...');
  // Progress will be saved in the main loop
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received termination signal, saving progress...');
  // Progress will be saved in the main loop
  process.exit(0);
});

function parseArgs() {
  const args = {
    import: false,
    dropDb: false,
    max: undefined,
    noSearch: false,
    importOnly: false,
    resume: false,
    help: false,
  };

  for (const arg of process.argv.slice(2)) {
    if (arg === '--import' || arg === '-i') {
      args.import = true;
    } else if (arg === '--drop-db') {
      args.dropDb = true;
    } else if (arg === '--import-only') {
      args.importOnly = true;
    } else if (arg === '--resume') {
      args.resume = true;
    } else if (arg.startsWith('--max=')) {
      args.max = Number(arg.split('=')[1]);
    } else if (arg === '--no-search') {
      args.noSearch = true;
    } else if (arg === '--help' || arg === '-h') {
      args.help = true;
    }
  }

  return args;
}

function printHelp() {
  console.log('Usage: node clear-casinos.mjs [options]');
  console.log('Options:');
  console.log('  --import, -i       Import cleaned casinos into Prisma after cleanup');
  console.log('  --import-only       Import existing cleaned casinos without running cleanup');
  console.log('  --drop-db          Delete existing casino rows before import');
  console.log('  --max=<n>          Process at most <n> casino entries');
  console.log('  --no-search        Skip Bing fallback search during cleanup');
  console.log('  --resume           Resume from last saved progress');
  console.log('  --help, -h         Show this help');
}

function saveProgress(progress) {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
  } catch (error) {
    console.warn('⚠️ Failed to save progress:', error.message);
  }
}

function loadProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    }
  } catch (error) {
    console.warn('⚠️ Failed to load progress:', error.message);
  }
  return null;
}

function clearProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      fs.unlinkSync(PROGRESS_FILE);
    }
  } catch (error) {
    console.warn('⚠️ Failed to clear progress file:', error.message);
  }
}

function countOutputLines(filePath) {
  if (!fs.existsSync(filePath)) {
    return 0;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  return content.split(/\r?\n/).filter((line) => line.trim().length > 0).length;
}

function parseHostsFromOutput(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .split(/\r?\n/)
    .map((line) => {
      const match = line.match(/→\s*(https?:\/\/[^\s]+)/);
      if (!match) return null;
      try {
        return new URL(match[1]).host;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function parseCasinoNamesFromOutput(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .split(/\r?\n/)
    .map((line) => {
      const match = line.match(/: (.+?) → /);
      return match ? match[1].trim() : null;
    })
    .filter(Boolean);
}

function loadJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.warn(`⚠️ Failed to load JSON from ${filePath}:`, error.message);
    return null;
  }
}

function formatLine(entry) {
  const status = entry.verifiedWebsite ? '✅ Valid casino' : '⚠️ Unverified casino';
  const url = entry.verifiedWebsite || '[no-url]';
  const score = entry.confidenceScore || 0;
  return `${status}: ${entry.name} → ${url} (${score}%)`;
}

function normalizeSlug(rawSlug, fallbackName) {
  const slugSource = rawSlug || fallbackName || '';
  return slugSource
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') ||
    fallbackName
      .toString()
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
    .replace(/[^a-zA-Z0-9-\.]/g, '-')
    .replace(/\.{2,}/g, '.')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/\.\.+/g, '.')
    .toLowerCase();

  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    try {
      normalized = new URL(normalized).hostname;
    } catch {
      // keep best effort
    }
  }

  normalized = normalized.replace(/^www\./, '');
  normalized = normalized.replace(/\.+$/, '');
  normalized = normalized.replace(/^-+|-+$/g, '');

  if (!normalized.match(/[a-z0-9]/)) {
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

  if (base && base.includes('.') && base.match(/^[a-z0-9-]+\.[a-z]{2,}$/i)) {
    candidates.add(base);
    candidates.add(`www.${base}`);
  } else if (base) {
    candidates.add(base);
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
  }

  return [...candidates].map((candidate) => candidate.trim()).filter(Boolean);
}

function ensureUrl(raw) {
  if (!raw || typeof raw !== 'string') {
    return null;
  }

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

function getOrigin(url) {
  try {
    return new URL(url).origin.replace(/^https?:\/\/www\./, 'https://');
  } catch {
    return null;
  }
}

async function fetchHtml(url) {
  try {
    const response = await axios.get(url, {
      timeout: TIMEOUT,
      maxRedirects: 5,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      validateStatus: (status) => status >= 200 && status < 400,
    });

    const contentType = String(response.headers['content-type'] || '');
    const html = String(response.data || '');

    return { html, contentType, status: response.status, finalUrl: response.request?.res?.responseUrl || response.config.url };
  } catch (error) {
    return { error: error.message || 'request failed' };
  }
}

function extractMetadata(html, url) {
  const document = load(html);
  const title = document('title').first().text().trim();
  const description = document('meta[name="description"]').attr('content') || document('meta[property="og:description"]').attr('content') || '';
  const metaTitle = document('meta[property="og:title"]').attr('content') || title;
  const pageText = `${title} ${description} ${document('body').text()}`.replace(/\s+/g, ' ').trim();
  return { title, description, metaTitle, pageText, url };
}

function isValidCasinoPage(metadata) {
  const text = String(metadata.pageText || '').toLowerCase();
  return KEYWORDS_RE.test(text) && !NEGATIVE_RE.test(text);
}

function extractLicense(metadata) {
  const match = metadata.pageText.match(LICENSE_RE);
  return match ? match[0] : undefined;
}

function hasLiveCasino(metadata) {
  return LIVE_RE.test(metadata.pageText);
}

function identifyHost(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
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
  }
  return { error: lastError };
}

async function validateCandidate(rawCandidate, sourceLabel) {
  const normalizedUrl = ensureUrl(rawCandidate);
  if (!normalizedUrl) {
    return null;
  }

  if (AFFILIATE_BLACKLIST.test(normalizedUrl)) {
    return null;
  }

  const attempt = await retryRequest(normalizedUrl);
  if (attempt.error) {
    return null;
  }

  const { html, contentType, finalUrl } = attempt;
  if (!contentType.toLowerCase().includes('html')) {
    return null;
  }

  const metadata = extractMetadata(html, finalUrl || normalizedUrl);
  const host = identifyHost(metadata.url || normalizedUrl);
  if (!host) {
    return null;
  }

  if (!isValidCasinoPage(metadata)) {
    return null;
  }

  return {
    url: metadata.url || normalizedUrl,
    host,
    title: metadata.metaTitle || metadata.title,
    description: metadata.description,
    license: extractLicense(metadata),
    liveCasino: hasLiveCasino(metadata),
    confidence: 50 + (KEYWORDS_RE.test(`${metadata.title} ${metadata.description}`) ? 20 : 0) + (extractLicense(metadata) ? 15 : 0) + (hasLiveCasino(metadata) ? 10 : 0),
    source: sourceLabel,
  };
}

async function attemptCandidates(candidates, sourceLabel) {
  const tasks = candidates.map((candidate) => limit(async () => validateCandidate(candidate, sourceLabel)));
  const results = await Promise.all(tasks);
  return results.find((result) => result) || null;
}

function parseSearchLinks(html) {
  const document = load(html);
  const links = [];

  document('a').each((_, element) => {
    const href = document(element).attr('href');
    if (!href || typeof href !== 'string') {
      return;
    }

    if (href.startsWith('/search') || href.includes('bing.com/search') || href.includes('google.com/search')) {
      return;
    }

    try {
      const url = new URL(href, 'https://www.bing.com');
      if (url.hostname.includes('bing.com')) {
        return;
      }
      links.push(url.origin);
    } catch {
      // ignore parse errors
    }
  });

  return [...new Set(links)].filter((link) => !AFFILIATE_BLACKLIST.test(link));
}

async function searchFallback(name) {
  const query = encodeURIComponent(`${name} casino official site`);
  const searchUrl = `https://www.bing.com/search?q=${query}`;

  const response = await retryRequest(searchUrl);
  if (response.error || !response.html) {
    return null;
  }

  const candidates = parseSearchLinks(response.html);
  return attemptCandidates(candidates, 'search-fallback');
}

function clampScore(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 50;
  }
  return Math.min(100, Math.max(0, Math.round(value)));
}

async function importToPrisma(cleaned, dropDb) {
  if (dropDb) {
    console.log('🧹 Clearing existing casino collection before import...');
    await prisma.casino.deleteMany({});
  }

  let importedCount = 0;
  let skippedCount = 0;

  for (const casino of cleaned) {
    try {
      // Validate required fields
      if (!casino.name || !casino.slug) {
        console.log(`⚠️ Skipping casino with missing name or slug: ${casino.name || 'unknown'}`);
        skippedCount++;
        continue;
      }

      // Only include the most basic required fields
      const data = {
        name: String(casino.name).trim(),
        slug: String(casino.slug).trim(),
        country: String(casino.country || 'Unknown').trim(),
        bonus: String(casino.bonus || '').trim(),
        providers: [],
        operatingCountries: [],
        languages: ['English'],
        currencies: ['EUR'],
        vipRewards: [],
        popularGames: [],
        socialMediaLinks: [],
        favoriteGamesIds: [],
        topPlayersIds: [],
        jackpotHistory: [],
        imageGallery: [],
        metaKeywords: [],
      };

      // Add description if it exists
      if (casino.description) {
        data.description = String(casino.description).trim();
      }

      // Add rating if it's a valid number
      if (typeof casino.rating === 'number' && !isNaN(casino.rating)) {
        data.rating = casino.rating;
      }

      // Add liveCasinoAvailable if it's a boolean
      if (typeof casino.liveCasinoAvailable === 'boolean') {
        data.liveCasinoAvailable = casino.liveCasinoAvailable;
      }

      await prisma.casino.upsert({
        where: { slug: casino.slug },
        create: data,
        update: data,
      });

      importedCount += 1;
    } catch (error) {
      console.log(`❌ Failed to import casino ${casino.name}: ${error.message}`);
      skippedCount++;
    }
  }

  console.log(`✅ Imported ${importedCount} cleaned casinos into Prisma`);
  if (skippedCount > 0) {
    console.log(`⚠️ Skipped ${skippedCount} casinos due to validation errors`);
  }
}

async function run() {
  const args = parseArgs();
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  // Handle import-only mode
  if (args.importOnly) {
    if (!fs.existsSync(OUTPUT_FILE)) {
      console.error(`ERROR: Clean data file not found: ${OUTPUT_FILE}`);
      console.log('Run cleanup first: node clear-casinos.mjs --max=4000 --no-search');
      process.exit(1);
    }

    console.log('📦 Importing existing cleaned casinos...');
    const cleaned = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    console.log(`📊 Found ${cleaned.length} cleaned casinos to import`);

    await importToPrisma(cleaned, args.dropDb);
    await prisma.$disconnect();
    return;
  }

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`ERROR: Missing dataset file ${DATA_FILE}`);
    process.exit(1);
  }

  // Create directories for folder management
  fs.mkdirSync(path.join(process.cwd(), 'casinos'), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), 'invalid_casinos'), { recursive: true });
  const logs = [];

  const rawData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const total = Array.isArray(rawData) ? rawData.length : 0;
  const maxCount = args.max ? Math.min(args.max, total) : total;

  // Load progress if resuming
  let startIndex = 0;
  let cleaned = [];
  let invalid = [];
  let fixedDomains = [];
  let duplicateSlugs = [];
  let duplicateHosts = [];
  let seenSlugs = new Set();
  let seenHosts = new Set();
  let hostCache = new Map();
  let progress = null;

  if (args.resume) {
    progress = loadProgress();
    
    // Always check current output file for already-processed casinos
    if (fs.existsSync(TEXT_OUTPUT_FILE)) {
      const processedLines = countOutputLines(TEXT_OUTPUT_FILE);
      const processedHosts = parseHostsFromOutput(TEXT_OUTPUT_FILE);
      const processedNames = parseCasinoNamesFromOutput(TEXT_OUTPUT_FILE);
      
      if (processedLines > 0) {
        console.log(`🔍 Found ${processedLines} existing output lines`);
        console.log(`📝 Tracking ${processedNames.length} casino names and ${processedHosts.length} unique hosts`);
        
        // Mark all existing entries as seen to prevent duplicates
        for (const name of processedNames) {
          seenSlugs.add(normalizeSlug('', name));
        }
        for (const host of processedHosts) {
          seenHosts.add(host);
        }
      }
    }
    
    if (progress) {
      console.log('🔄 Resuming from saved progress...');
      startIndex = typeof progress.lastProcessedIndex === 'number' ? progress.lastProcessedIndex + 1 : 0;
      cleaned = progress.cleaned || [];
      invalid = progress.invalid || [];
      fixedDomains = progress.fixedDomains || [];
      duplicateSlugs = progress.duplicateSlugs || [];
      duplicateHosts = progress.duplicateHosts || [];
      const progressSeenSlugs = progress.seenSlugs || [];
      const progressSeenHosts = progress.seenHosts || [];
      for (const slug of progressSeenSlugs) {
        seenSlugs.add(slug);
      }
      for (const host of progressSeenHosts) {
        seenHosts.add(host);
      }
      hostCache = new Map(progress.hostCache || []);
      console.log(`📊 Resumed at entry ${startIndex + 1}/${total}`);
      console.log(`   Already processed: ${cleaned.length} valid, ${invalid.length} invalid`);
    } else if (fs.existsSync(TEXT_OUTPUT_FILE)) {
      const processedLines = countOutputLines(TEXT_OUTPUT_FILE);
      if (processedLines > 0) {
        console.log('⚠️ No progress file found, resuming from existing text output file');
        startIndex = processedLines;
        cleaned = loadJsonIfExists(OUTPUT_FILE) || [];
        invalid = loadJsonIfExists(INVALID_FILE) || [];
        fixedDomains = loadJsonIfExists(FIXED_FILE) || [];
        duplicateSlugs = [];
        duplicateHosts = [];
        console.log(`📊 Resumed from existing output at entry ${startIndex + 1}/${total} (${processedLines} lines already present)`);
      } else {
        console.log('⚠️ No progress found, starting from beginning');
        fs.writeFileSync(TEXT_OUTPUT_FILE, '', 'utf8');
      }
    } else {
      console.log('⚠️ No progress file found, starting from beginning');
      fs.writeFileSync(TEXT_OUTPUT_FILE, '', 'utf8');
    }
  } else {
    // Clear text file for new start
    fs.writeFileSync(TEXT_OUTPUT_FILE, '', 'utf8');
  }

  console.log(`📦 Loaded ${total} casinos from ${DATA_FILE}`);
  console.log(`⚙️  Running cleanup for ${maxCount} entries with concurrency ${CONCURRENCY} (starting from ${startIndex + 1})`);
  if (args.noSearch) {
    console.log('🚫 Bing fallback search is disabled');
  }

  if (startIndex >= total || startIndex >= maxCount) {
    console.log('✅ Nothing to process: resume position is already at or beyond the requested max.');
    return;
  }

  const entries = rawData.slice(startIndex, maxCount);

  for (const [index, casino] of entries.entries()) {
    const actualIndex = startIndex + index;
    if (actualIndex > 0 && actualIndex % 50 === 0) {
      console.log(`📌 Processing entry ${actualIndex + 1}/${maxCount}`);
      
      // Save progress every 50 entries
      const progress = {
        lastProcessedIndex: actualIndex,
        cleaned,
        invalid,
        fixedDomains,
        duplicateSlugs,
        duplicateHosts,
        seenSlugs: Array.from(seenSlugs),
        seenHosts: Array.from(seenHosts),
        hostCache: Array.from(hostCache.entries()),
        timestamp: new Date().toISOString(),
      };
      saveProgress(progress);
    }

    const name = String(casino.name || '').trim();
    if (!name) {
      invalid.push({ slug: casino.slug, reason: 'Missing casino name' });
      const invalidEntry = { name: casino.slug || 'unknown', verifiedWebsite: null, confidenceScore: 0 };
      fs.appendFileSync(TEXT_OUTPUT_FILE, formatLine(invalidEntry) + '\n', 'utf8');
      continue;
    }

    const slug = normalizeSlug(casino.slug, name);
    if (!slug) {
      invalid.push({ name, reason: 'Unable to normalize slug' });
      const invalidEntry = { name, verifiedWebsite: null, confidenceScore: 0 };
      fs.appendFileSync(TEXT_OUTPUT_FILE, formatLine(invalidEntry) + '\n', 'utf8');
      continue;
    }

    if (seenSlugs.has(slug)) {
      duplicateSlugs.push({ name, slug });
      
      // Append duplicate to text file
      const duplicateEntry = { name, verifiedWebsite: null, confidenceScore: 0 };
      const line = formatLine(duplicateEntry);
      fs.appendFileSync(TEXT_OUTPUT_FILE, line + '\n', 'utf8');
      
      // Move duplicate slug folder
      const sourceDir = path.join(process.cwd(), 'data', 'casinoDATAjson', slug);
      const destDir = path.join(process.cwd(), 'invalid_casinos', slug);
      if (fs.existsSync(sourceDir)) {
        try {
          fs.renameSync(sourceDir, destDir);
          logs.push(`Moved duplicate slug casino ${name} to invalid_casinos/${slug}`);
        } catch (error) {
          logs.push(`Failed to move duplicate slug casino ${name}: ${error.message}`);
        }
      }
      continue;
    }

    seenSlugs.add(slug);
    const candidates = buildDomainCandidates(name, casino.slug);
    let validation = null;

    if (candidates.length > 0) {
      validation = await attemptCandidates(candidates, 'heuristic');
    }

    if (!validation && !args.noSearch) {
      validation = await searchFallback(name);
    }

    if (!validation) {
      invalid.push({ name, slug, reason: 'No valid website found', candidates });
      
      const invalidEntry = { name, verifiedWebsite: null, confidenceScore: 0 };
      fs.appendFileSync(TEXT_OUTPUT_FILE, formatLine(invalidEntry) + '\n', 'utf8');
      
      const sourceDir = path.join(process.cwd(), 'data', 'casinoDATAjson', slug);
      const destDir = path.join(process.cwd(), 'invalid_casinos', slug);
      if (fs.existsSync(sourceDir)) {
        try {
          fs.renameSync(sourceDir, destDir);
          logs.push(`Moved invalid casino ${name} to invalid_casinos/${slug}`);
        } catch (error) {
          logs.push(`Failed to move invalid casino ${name}: ${error.message}`);
        }
      }
      continue;
    }

    if (seenHosts.has(validation.host)) {
      duplicateHosts.push({ name, slug, host: validation.host, website: validation.url });
      const duplicateHostEntry = { name, verifiedWebsite: null, confidenceScore: 0 };
      fs.appendFileSync(TEXT_OUTPUT_FILE, formatLine(duplicateHostEntry) + '\n', 'utf8');
      // Move duplicate host folder
      const sourceDir = path.join(process.cwd(), 'data', 'casinoDATAjson', slug);
      const destDir = path.join(process.cwd(), 'invalid_casinos', slug);
      if (fs.existsSync(sourceDir)) {
        try {
          fs.renameSync(sourceDir, destDir);
          logs.push(`Moved duplicate host casino ${name} to invalid_casinos/${slug}`);
        } catch (error) {
          logs.push(`Failed to move duplicate host casino ${name}: ${error.message}`);
        }
      }
      continue;
    }

    seenHosts.add(validation.host);

    const confidence = clampScore(validation.confidence);
    const cleanedEntry = {
      name,
      slug,
      country: String(casino.country || 'Unknown').trim(),
      verifiedWebsite: validation.url,
      status: 'active',
      confidenceScore: confidence,
      title: validation.title,
      description: validation.description,
      license: validation.license,
      liveCasino: validation.liveCasino,
      source: validation.source,
      metaTitle: validation.title,
      metaDescription: validation.description,
      websiteLicense: validation.license,
      liveCasinoAvailable: validation.liveCasino,
      bonus: casino.bonus,
      rating: casino.rating,
      revenueRank: casino.revenueRank,
      spins: casino.spins,
      providers: casino.providers || [],
      likes: casino.likes,
      comments: casino.comments,
      operatingCountries: casino.operatingCountries || [],
      languages: casino.languages || ['English'],
      avatarUrl: casino.avatarUrl,
      imageUrl: casino.imageUrl,
      imageGallery: casino.imageGallery || [],
      promotionsActive: casino.promotionsActive,
    };

    cleaned.push(cleanedEntry);
    fixedDomains.push({ name, slug, website: validation.url, source: validation.source });
    // Move valid casino folder
    const sourceDir = path.join(process.cwd(), 'data', 'casinoDATAjson', slug);
    const destDir = path.join(process.cwd(), 'casinos', slug);
    if (fs.existsSync(sourceDir)) {
      try {
        fs.renameSync(sourceDir, destDir);
        logs.push(`Moved valid casino ${name} to casinos/${slug}`);
      } catch (error) {
        logs.push(`Failed to move valid casino ${name}: ${error.message}`);
      }
    }
    console.log(`✅ Valid casino: ${name} → ${validation.url} (${confidence}%)`);
    
    // Append to text file immediately
    const line = formatLine(cleanedEntry);
    fs.appendFileSync(TEXT_OUTPUT_FILE, line + '\n', 'utf8');
  }

  fs.writeFileSync(path.join(process.cwd(), 'logs.txt'), logs.join('\n'), 'utf8');
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cleaned, null, 2), 'utf8');
  console.log(`💾 Updated ${TEXT_OUTPUT_FILE}`);
  
  fs.writeFileSync(REPORT_FILE, JSON.stringify({
    createdAt: new Date().toISOString(),
    totalInput: maxCount,
    activeCount: cleaned.length,
    invalidCount: invalid.length,
    duplicateSlugs: duplicateSlugs.length,
    duplicateHosts: duplicateHosts.length,
    fixedDomains: fixedDomains.length,
    invalidEntries: invalid,
    duplicateSlugEntries: duplicateSlugs,
    duplicateHostEntries: duplicateHosts,
  }, null, 2), 'utf8');
  fs.writeFileSync(INVALID_FILE, JSON.stringify(invalid, null, 2), 'utf8');
  fs.writeFileSync(FIXED_FILE, JSON.stringify(fixedDomains, null, 2), 'utf8');

  // Clear progress file on successful completion
  clearProgress();

  console.log('---');
  console.log(`📊 Cleanup summary:`);
  console.log(`   Total processed: ${maxCount}`);
  console.log(`   Active casinos: ${cleaned.length}`);
  console.log(`   Invalid entries: ${invalid.length}`);
  console.log(`   Duplicate slugs skipped: ${duplicateSlugs.length}`);
  console.log(`   Duplicate domains skipped: ${duplicateHosts.length}`);
  console.log(`   Clean data written to: ${OUTPUT_FILE}`);
  console.log(`   Report written to: ${REPORT_FILE}`);
  console.log('✅ Progress saved and cleanup completed successfully!');

  if (args.import) {
    await importToPrisma(cleaned, args.dropDb);
  }

  await prisma.$disconnect();
}

run().catch(async (error) => {
  console.error('❌ Cleanup failed:', error?.stack || error);
  await prisma.$disconnect();
  process.exit(1);
});
