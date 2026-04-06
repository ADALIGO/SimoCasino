import { CoinEconomyEntry } from './types';

export const COIN_ECONOMY: CoinEconomyEntry[] = [
  {
    source: 'Basic actions',
    coins: '0–2',
    details: 'Designed to be slow to avoid abuse',
    notes: '✅ Safe',
  },
  {
    source: 'Time spent',
    coins: '1–2',
    details: 'Encourages long sessions',
    notes: '✅ Safe',
  },
  {
    source: 'Affiliate actions',
    coins: '5–10',
    details: 'Main monetization driver',
    notes: '⚠️ Risky — track carefully',
  },
  {
    source: 'Missions',
    coins: '3–15',
    details: 'Keeps users returning daily',
    notes: '✅ Safe',
  },
  {
    source: 'Achievements',
    coins: '10–50',
    details: 'Rare and valuable',
    notes: '✅ Safe',
  },
  {
    source: 'Leaderboards',
    coins: '20+',
    details: 'Competitive rewards',
    notes: '✅ Safe',
  },
  {
    source: 'Deposits',
    coins: '10–20',
    details: 'Highest value action',
    notes: '⚠️ Risky — only verified transactions',
  },
];
