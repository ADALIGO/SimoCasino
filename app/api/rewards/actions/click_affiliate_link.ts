import { RewardDefinition } from '../reward-types';

export const click_affiliate_link: RewardDefinition = {
  coins: 1,
  totalPoints: 5,
  levelProgress: 0,
  once: false,
  enabled: false,
  safe: false,
  description: 'Click an affiliate link (disabled by default)',
  cooldownMinutes: 10,
  dailyLimit: 15,
  antiAbuse: 'Must redirect external; ensure real stay',
};
