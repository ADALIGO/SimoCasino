import { RewardDefinition } from '../reward-types';

export const claim_bonus: RewardDefinition = {
  coins: 2,
  totalPoints: 6,
  levelProgress: 0,
  once: false,
  enabled: true,
  safe: true,
  description: 'Claim a valid bonus',
  cooldownMinutes: 30,
  dailyLimit: 10,
  antiAbuse: 'Bonus must be active',
};
