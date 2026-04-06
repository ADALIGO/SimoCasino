import { RewardDefinition } from '../reward-types';
import { visit_homepage } from './visit_homepage';
import { visit_casino_page } from './visit_casino_page';
import { click_affiliate_link } from './click_affiliate_link';
import { stay_30_seconds } from './stay_30_seconds';
import { stay_2_minutes } from './stay_2_minutes';
import { stay_5_minutes } from './stay_5_minutes';
import { scroll_50_percent_page } from './scroll_50_percent_page';
import { scroll_90_percent_page } from './scroll_90_percent_page';
import { click_bonus } from './click_bonus';
import { claim_bonus } from './claim_bonus';

export const REWARD_ACTIONS: Record<string, RewardDefinition> = {
  visit_homepage,
  visit_casino_page,
  click_affiliate_link,
  stay_30_seconds,
  stay_2_minutes,
  stay_5_minutes,
  scroll_50_percent_page,
  scroll_90_percent_page,
  click_bonus,
  claim_bonus,
};
