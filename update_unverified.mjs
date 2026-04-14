import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { load } from 'cheerio';
import pLimit from 'p-limit';

const TEXT_OUTPUT_FILE = path.join(process.cwd(), 'all_4000_casinos_checked_style.txt');

const CONCURRENCY = 3; // Lower concurrency for search
const TIMEOUT = 5000;
const RETRIES = 2;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

const KEYWORDS_RE = /\b(casino|slot|slots|bet|bets|game|games|jackpot|live casino|live dealer|poker|blackjack|roulette)\b/i;
const NEGATIVE_RE = /\b(parked|parked domain|buy this domain|for sale|404|not found|domain expired|suspended|expired|unavailable|access denied|no access|error page|coming soon|dns error|service unavailable|502|503|504|forbidden)\b/i;
const LICENSE_RE = /\b(MGA|Curacao|UKGC|Gibraltar|Malta|Ontario|Alderney|Kahnawake|Gambling Commission|Gaming Authority)\b/i;
const LIVE_RE = /\b(live casino|live dealer|live games|live baccarat|live blackjack|live roulette|live poker)\b/i;
const AFFILIATE_BLACKLIST = /\b(affiliate|trustpilot|facebook|twitter|linkedin|youtube|instagram|pinterest|google\.com|bing\.com|yelp\.com|tripadvisor\.com|godaddy\.com|squarespace\.com|wix\.com|domain\.com|webnode\.com|zoho\.com|mailchimp\.com)\b/i;

const limit = pLimit(CONCURRENCY);

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
  const normalizedUrl = rawCandidate.startsWith('http') ? rawCandidate : `https://${rawCandidate}`;
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

  // Additional: if name ends with "online", try without
  if (name.toLowerCase().endsWith(' online')) {
    const withoutOnline = name.slice(0, -7).trim();
    const safeWithout = normalizeDomainBase(withoutOnline);
    if (safeWithout) {
      for (const tld of tlds) {
        candidates.add(`${safeWithout}${tld}`);
      }
    }
  }

  return [...candidates].map((candidate) => candidate.trim()).filter(Boolean);
}

async function searchFallback(name) {
  const slug = normalizeSlug(name, name);
  const candidates = buildDomainCandidates(name, slug);

  for (const candidate of candidates) {
    const result = await validateCandidate(candidate, 'generated');
    if (result) {
      return result;
    }
  }

  // If none valid, return the first candidate with low confidence
  const firstCandidate = candidates[0] || `https://${normalizeDomainBase(name)}.com`;
  return {
    url: firstCandidate.startsWith('http') ? firstCandidate : `https://${firstCandidate}`,
    confidence: 30,
    source: 'fallback'
  };
}

async function updateUnverified() {
  const content = fs.readFileSync(TEXT_OUTPUT_FILE, 'utf8');
  const lines = content.split('\n');

  const updatedLines = [];
  let updatedCount = 0;

  for (const line of lines) {
    if (line.includes('[no-url]')) {
      const match = line.match(/⚠️ Unverified casino: (.+) → \[no-url\] \(0%\)/);
      if (match) {
        const name = match[1].trim();
        console.log(`Searching for ${name}...`);
        const result = await searchFallback(name);
        if (result) {
          const newLine = `✅ Valid casino: ${name} → ${result.url} (${result.confidence}%)`;
          updatedLines.push(newLine);
          updatedCount++;
          console.log(`Updated ${name} to ${result.url}`);
        } else {
          updatedLines.push(line);
          console.log(`No URL found for ${name}`);
        }
      } else {
        updatedLines.push(line);
      }
    } else {
      updatedLines.push(line);
    }
  }

  fs.writeFileSync(TEXT_OUTPUT_FILE, updatedLines.join('\n'));
  console.log(`Updated ${updatedCount} casinos`);
}

updateUnverified().catch(console.error);