export type CoreActionDetail = {
  action: string;
  xp: number;
  coins: number;
  cooldown: string;
  dailyLimit: string;
  antiAbuseRule: string;
  details: string;
  notes: string;
};

export type LevelSystemTier = {
  level: number;
  pointsRequired: number;
  totalXp: number;
  rewardCoins: number;
  details: string;
  notes: string;
};

export type CoinEconomyEntry = {
  source: string;
  coins: string;
  details: string;
  notes: string;
};

export type MissionEntry = {
  mission: string;
  requirement: string;
  xp: number;
  coins: number;
  details: string;
  notes: string;
};

export type AntiAbuseRule = {
  rule: string;
  limit: string;
  details: string;
  notes: string;
};

export type RetentionFeature = {
  feature: string;
  effect: string;
  details: string;
  notes: string;
};

export type HighRiskReward = {
  action: string;
  xp: number;
  coins: number;
  notes: string;
};
