import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';
import pLimit from 'p-limit';

const INPUT_FILE = path.resolve(process.cwd(), 'all_4000_casinos_verified_with_urls.txt');
const OUTPUT_DIR = path.resolve(process.cwd(), 'logoCasinos');
const LOG_FILE = path.resolve(OUTPUT_DIR, 'capture-log.json');
const CONCURRENCY = 3;
const VIEWPORT = { width: 1200, height: 900 };
const SCREENSHOT_SIZE = { width: 500, height: 380 };

function parseLine(line) {
  const regex = /.*?([^\s].*?)\s*→\s*(https?:\/\/[^\s\]]+)/;
  const match = line.match(regex);
  if (!match) return null;
  return {
    name: match[1].trim(),
    url: match[2].trim(),
    confidence: null,
  };
}

function safeFileName(name, url) {
  const base = name || url.replace(/^https?:\/\//, '');
  return `${base.replace(/[<>:\\"/\\|?*]+/g, '_').replace(/\s+/g, '_').slice(0, 120)}.png`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

async function ensureOutputDirectory() {
  await fsPromises.mkdir(OUTPUT_DIR, { recursive: true });
}

async function loadCasinoList() {
  const raw = await fsPromises.readFile(INPUT_FILE, 'utf8');
  return raw
    .split(/\r?\n/)
    .map(parseLine)
    .filter(Boolean);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function findLogoElement(page) {
  const handle = await page.evaluateHandle(() => {
    const isVisible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return (
        rect.width >= 24 &&
        rect.height >= 24 &&
        style.visibility !== 'hidden' &&
        style.display !== 'none' &&
        rect.top >= 0 &&
        rect.left >= 0
      );
    };

    const images = Array.from(document.querySelectorAll('img')).filter(isVisible);
    const score = (img) => {
      let value = img.naturalWidth * img.naturalHeight;
      const text = `${img.alt || ''} ${img.className || ''} ${img.id || ''} ${img.src || ''}`;
      if (/logo/i.test(text)) value += 250000;
      if (/brand/i.test(text)) value += 120000;
      return value;
    };

    images.sort((a, b) => score(b) - score(a));
    return images[0] || null;
  });

  const element = handle.asElement();
  if (element) return element;
  await handle.dispose();
  return null;
}

function buildClip(box) {
  const width = SCREENSHOT_SIZE.width;
  const height = SCREENSHOT_SIZE.height;
  const x = clamp(Math.round(box.x + box.width / 2 - width / 2), 0, VIEWPORT.width - width);
  const y = clamp(Math.round(box.y + box.height / 2 - height / 2), 0, VIEWPORT.height - height);
  return { x, y, width, height };
}

async function captureLogo(page, entry, outputPath) {
  const log = { name: entry.name, url: entry.url, outputPath, success: false, reason: null };

  try {
    await page.setViewport(VIEWPORT);
    await page.goto(entry.url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await sleep(2500);
    const logo = await findLogoElement(page);

    if (logo) {
      await logo.evaluate((node) => node.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' }));
      await sleep(400);
      const box = await logo.boundingBox();
      if (box) {
        const clip = buildClip(box);
        await page.screenshot({ path: outputPath, clip });
        log.success = true;
        log.reason = 'logo-element-screenshot';
      }
      await logo.dispose();
    }

    if (!log.success) {
      await page.screenshot({ path: outputPath, clip: { x: 0, y: 0, width: SCREENSHOT_SIZE.width, height: SCREENSHOT_SIZE.height } });
      log.success = true;
      log.reason = 'fallback-top-screenshot';
    }
  } catch (error) {
    log.reason = `error: ${error.message}`;
  }

  return log;
}

async function saveLog(logs) {
  await fsPromises.writeFile(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8');
}

async function main() {
  console.log('Starting casino logo capture...');
  await ensureOutputDirectory();
  const casinos = await loadCasinoList();
  console.log(`Found ${casinos.length} verified casinos to process.`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const limit = pLimit(CONCURRENCY);
  const logs = [];

  const tasks = casinos.map((entry) =>
    limit(async () => {
      const filename = safeFileName(entry.name, entry.url);
      const outputPath = path.join(OUTPUT_DIR, filename);
      if (fs.existsSync(outputPath)) {
        console.log(`Skipping existing: ${filename}`);
        logs.push({ name: entry.name, url: entry.url, outputPath, success: true, reason: 'skipped-existing' });
        return;
      }

      const page = await browser.newPage();
      const log = await captureLogo(page, entry, outputPath);
      await page.close();
      console.log(`${log.success ? 'Saved' : 'Failed'}: ${filename} (${log.reason})`);
      logs.push(log);
    })
  );

  await Promise.all(tasks);
  await browser.close();
  await saveLog(logs);
  console.log(`Done. Screenshots saved to ${OUTPUT_DIR} and log written to ${LOG_FILE}`);
}

main().catch((error) => {
  console.error('Capture script failed:', error);
  process.exit(1);
});
