import { NextResponse } from 'next/server';
import { REWARD_CONFIG } from '../reward-config';

export async function GET() {
  return NextResponse.json({ rewardSettings: REWARD_CONFIG });
}
