import { RewardDefinition } from '../reward-types';

export const click_bonus: RewardDefinition = {
  coins: 1,
  totalPoints: 3,
  levelProgress: 0,
  once: false,
  enabled: true,
  safe: true,
  description: 'Click a bonus link',
  cooldownMinutes: 5,
  dailyLimit: 20,
  antiAbuse: 'Unique bonus only',
};
