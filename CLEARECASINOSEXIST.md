You are a senior full-stack developer, scraping expert, and data engineer.

I have ~4000 casino entries (JSON + folders).

IMPORTANT RULE:
- DO NOT delete original data
- ONLY filter, enrich, and reorganize

GOAL:
Build a high-quality, verified casino database (~2400 real casinos max).

-----------------------------------
1. DOMAIN VALIDATION (CORE)
-----------------------------------
- Validate casino.website using HTTP (axios)
- Accept status 200–399
- Use HEAD first, fallback to GET

If website missing or invalid:
- Rebuild domain from name:
    normalize:
        lowercase
        remove spaces/symbols

Try:
https://{name}.com
https://{name}.io
https://{name}.net
https://{name}.org
https://{name}.co
https://{name}.casino
https://{name}.bet

-----------------------------------
2. GOOGLE SEARCH FALLBACK (ADVANCED)
-----------------------------------
If domain not found:
- Search:
    "<casino name> casino official site"

Use:
- SerpAPI OR scraping (Bing/Google HTML)

Extract:
- first organic result (ignore ads)
- skip:
    affiliate links
    trackers
    review sites

Validate extracted domain again.

-----------------------------------
3. CONTENT VALIDATION (STRICT)
-----------------------------------
Load HTML with cheerio.

Casino is VALID only if:
- contains at least 3 keywords:
    "casino", "slots", "jackpot", "blackjack", "roulette", "live casino", "bet"

Reject if:
- parked domains ("buy this domain")
- empty pages
- unrelated content

-----------------------------------
4. AI CLASSIFIER (SMART FILTER)
-----------------------------------
Create a lightweight AI scoring system:

Input:
- page text
- title
- meta description

Logic:
- classify:
    REAL_CASINO
    NOT_CASINO
    UNKNOWN

Heuristics:
- casino keywords density
- presence of:
    games
    bonuses
    deposit/withdraw
- negative signals:
    blog
    news
    unrelated services

Only accept:
REAL_CASINO or high-confidence UNKNOWN

-----------------------------------
5. METADATA ENRICHMENT
-----------------------------------
Extract:
- title
- meta description
- license:
    MGA
    Curacao
    UKGC
    Gibraltar
- live casino presence
- crypto support (BTC, ETH keywords)

-----------------------------------
6. GEO DETECTION 🌍
-----------------------------------
Detect supported countries using:
- keywords:
    "restricted countries"
    "available in"
- license hints:
    UKGC → UK
    MGA → EU/global
    Curacao → global

Add field:
allowedCountries: []

-----------------------------------
7. CONFIDENCE SCORE
-----------------------------------
Scoring system:

- domain works → +30
- content keywords → +30
- AI classifier REAL → +20
- metadata quality → +10
- license found → +10

Reject if score < 60

-----------------------------------
8. DUPLICATES
-----------------------------------
- remove duplicates by domain
- keep highest score

-----------------------------------
9. FOLDER MANAGEMENT 📂
-----------------------------------
You have folders for each casino.

If VALID:
- keep in /casinos/

If INVALID:
- move folder to:
    /invalid_casinos/{slug}

Use fs.rename()

-----------------------------------
10. OUTPUT FILES
-----------------------------------
DO NOT overwrite original.

Create:

✔ clean-casinos.json
✔ invalid-casinos.json
✔ logs.txt

Each valid casino:
- name
- slug
- verified website
- status: "active"
- confidence score
- metadata
- allowedCountries

-----------------------------------
11. PERFORMANCE
-----------------------------------
- Use p-limit (5–10 concurrency)
- Timeout: 5000ms
- Retry: 2 times
- Use User-Agent

-----------------------------------
12. BONUS LOGGING
-----------------------------------
Log:
- fixed domains
- duplicates removed
- AI decisions
- moved folders

-----------------------------------
FINAL GOAL:
Transform messy 4000 dataset → clean ~2400 REAL casinos database like top affiliate platforms.
-----------------------------------

Return FULL Node.js script.