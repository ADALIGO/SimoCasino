import { RewardDefinition } from '../reward-types';

export const stay_30_seconds: RewardDefinition = {
  coins: 0,
  totalPoints: 2,
  levelProgress: 0,
  once: false,
  enabled: true,
  safe: true,
  description: 'Stay 30 seconds on a page',
  dailyLimit: 20,
  antiAbuse: 'Active tab required',
};
