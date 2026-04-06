import { AntiAbuseRule } from './types';

export const ANTI_ABUSE_RULES: AntiAbuseRule[] = [
  {
    rule: 'Max XP per day',
    limit: '150',
    details: 'Prevents farming',
    notes: '✅ Safe',
  },
  {
    rule: 'Max coins per day',
    limit: '40',
    details: 'Protects economy',
    notes: '✅ Safe',
  },
  {
    rule: 'Max affiliate rewards/day',
    limit: '3',
    details: 'Avoid fake traffic',
    notes: '⚠️ Risky — track & throttle',
  },
  {
    rule: 'Max session rewards/hour',
    limit: '20',
    details: 'Limits bots',
    notes: '✅ Safe',
  },
  {
    rule: 'Same IP multiple accounts',
    limit: 'BLOCK',
    details: 'Fraud prevention',
    notes: '✅ Safe',
  },
  {
    rule: 'Bot behavior',
    limit: 'NO XP',
    details: 'Auto detection',
    notes: '✅ Safe',
  },
  {
    rule: 'Fake clicks',
    limit: 'IGNORE',
    details: 'No reward given',
    notes: '✅ Safe',
  },
];
