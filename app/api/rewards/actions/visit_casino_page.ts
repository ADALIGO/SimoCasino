import { RewardDefinition } from '../reward-types';

export const visit_casino_page: RewardDefinition = {
  coins: 0,
  totalPoints: 2,
  levelProgress: 0,
  once: false,
  enabled: true,
  safe: true,
  description: 'Visit a casino details page',
  cooldownMinutes: 5,
  dailyLimit: 30,
  antiAbuse: 'Unique casino only',
};
