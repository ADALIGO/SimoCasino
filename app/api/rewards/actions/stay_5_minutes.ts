import { RewardDefinition } from '../reward-types';

export const stay_5_minutes: RewardDefinition = {
  coins: 2,
  totalPoints: 8,
  levelProgress: 0,
  once: false,
  enabled: true,
  safe: true,
  description: 'Stay 5 minutes on a page',
  dailyLimit: 5,
  antiAbuse: 'Requires scroll activity',
};
