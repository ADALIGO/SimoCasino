import { HighRiskReward } from './types';

export const HIGH_RISK_REWARDS: HighRiskReward[] = [
  {
    action: 'Clicking Google Ads',
    xp: 0,
    coins: 0,
    notes: '❌ Never reward users for ads',
  },
  {
    action: 'Clicking affiliate links directly',
    xp: 0,
    coins: 0,
    notes: '❌ Avoid monetized clicks for reward',
  },
  {
    action: 'Forced popups / redirects',
    xp: 0,
    coins: 0,
    notes: '❌ Leads to policy violations',
  },
  {
    action: 'Auto-click scripts / bots',
    xp: 0,
    coins: 0,
    notes: '❌ Detect and block immediately',
  },
  {
    action: 'Incentivized surveys / CPA offers',
    xp: 50,
    coins: 0,
    notes: '⚠️ Risky, only if TOS compliant',
  },
];
