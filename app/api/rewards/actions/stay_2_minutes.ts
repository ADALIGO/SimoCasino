import { RewardDefinition } from '../reward-types';

export const stay_2_minutes: RewardDefinition = {
  coins: 1,
  totalPoints: 5,
  levelProgress: 0,
  once: false,
  enabled: true,
  safe: true,
  description: 'Stay 2 minutes on a page',
  dailyLimit: 10,
  antiAbuse: 'Active tab required',
};
