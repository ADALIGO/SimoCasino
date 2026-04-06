import { RewardDefinition } from '../reward-types';

export const visit_homepage: RewardDefinition = {
  coins: 0,
  totalPoints: 1,
  levelProgress: 0,
  once: false,
  enabled: true,
  safe: true,
  description: 'Visit the homepage',
  cooldownMinutes: 10,
  dailyLimit: 20,
  antiAbuse: 'Ignore repeat same session',
};
