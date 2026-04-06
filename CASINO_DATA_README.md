# Casino Data Import Guide

## Generated Files

✅ **`casinos_data.json`** - Complete casino database in JSON format (4000 casinos)
✅ **`casinos_data.js`** - JavaScript module export for easy importing
✅ **`import_casinos.js`** - Node.js script to import data into MongoDB via Prisma

## Data Structure

Each casino includes:
- **name**: Casino name
- **slug**: URL-friendly identifier (unique)
- **country**: Primary operating country
- **bonus**: Realistic bonus offer text
- **rating**: Float between 3.0-5.0
- **revenueRank**: Optional ranking (1-100 for top casinos)
- **spins**: Free spins offered (0-500)
- **providers**: Array of game providers
- **likes**: User likes count
- **comments**: Comment count
- **operatingCountries**: Countries where casino operates
- **createdAt/updatedAt**: Timestamps

## Usage Options

### Option 1: Direct Database Import (Recommended)
```bash
# Make sure Prisma client is generated
npx prisma generate

# Run the import script
node import_casinos.js
```

### Option 2: Manual JSON Import
```javascript
import { casinosData } from './casinos_data.js';
// Use casinosData array in your application
```

### Option 3: MongoDB Direct Import
```bash
# Convert JSON to MongoDB format and import directly
mongoimport --db yourdb --collection casinos --file casinos_data.json --jsonArray
```

## Sample Data Preview

```json
{
  "name": "Betfair",
  "slug": "betfair-united-states",
  "country": "United States",
  "bonus": "Welcome Bonus 50% up to $200",
  "rating": 4.8,
  "revenueRank": 1,
  "spins": 100,
  "providers": ["Playtech", "NetEnt"],
  "likes": 150,
  "comments": 25,
  "operatingCountries": ["United States", "United Kingdom", "Morocco"]
}
```

## Features

🎯 **Realistic Data**: All bonuses, ratings, and stats are generated to look authentic
🌍 **Global Coverage**: Casinos from multiple countries with proper operating regions
🎮 **Provider Diversity**: Each casino has 1-8 game providers from real companies
📊 **Engagement Metrics**: Likes and comments to simulate user activity
🏆 **Revenue Rankings**: Top casinos get ranking positions
🎁 **Bonus Variety**: Different bonus types and amounts

## Database Schema Compliance

All data matches your Prisma schema:
- ✅ String fields properly typed
- ✅ Arrays for providers and operatingCountries
- ✅ Optional fields handled correctly
- ✅ Unique slugs generated
- ✅ Proper date formatting

---

**Total Casinos Generated:** 4000 (896 unique + 3104 variations)
**File Size:** ~10MB JSON
**Last Updated:** March 25, 2026