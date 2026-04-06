export type RewardDefinition = {
  coins: number;
  totalPoints: number;
  levelProgress: number;
  once: boolean;
  enabled: boolean;
  safe: boolean;
  description: string;
  cooldownMinutes?: number;
  dailyLimit?: number;
  antiAbuse?: string;
};
