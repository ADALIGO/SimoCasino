'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Star, Coins } from 'lucide-react';
import { useSelector } from 'react-redux';
import UserFlag from '@/components/UserFlag';
import { useDeferredGuestCountry } from '@/hooks/useDeferredGuestCountry';
import styles from './UserHeaderProgressCompact.module.scss';

interface UserHeaderProgressCompactProps {
  totalPoints?: number;
  coins?: number;
  minimal?: boolean;
}

// Level thresholds
const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500];
const MAX_LEVEL = LEVEL_THRESHOLDS.length - 1;

const calculateLevelData = (totalPoints: number) => {
  let currentLevel = 0;
  let currentLevelXP = 0;

  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalPoints >= LEVEL_THRESHOLDS[i]!) {
      currentLevel = i;
      currentLevelXP = LEVEL_THRESHOLDS[i]!;
      break;
    }
  }

  const isMaxLevel = currentLevel === MAX_LEVEL;
  const nextLevelXP = isMaxLevel ? currentLevelXP : LEVEL_THRESHOLDS[currentLevel + 1]!;
  const xpProgress = totalPoints - currentLevelXP;
  const xpToNextLevel = nextLevelXP - currentLevelXP;
  const progressPercentage = isMaxLevel ? 100 : (xpProgress / xpToNextLevel) * 100;

  return {
    currentLevel,
    xpProgress,
    xpToNextLevel,
    progressPercentage,
  };
};

export default function UserHeaderProgressCompact({
  totalPoints = 0,
  coins = 0,
  minimal = false,
}: UserHeaderProgressCompactProps) {
  const [isMounted, setIsMounted] = useState(false);
  const levelData = useMemo(() => calculateLevelData(totalPoints), [totalPoints]);
  const user = useSelector((state: any) => state.auth.user);
  const guestCountry = useDeferredGuestCountry(user?.userCountry || null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={styles['progress-compact']} suppressHydrationWarning>
        <div className={styles['progress-placeholder']} />
      </div>
    );
  }

  if (minimal) {
    return (
      <div className={styles['progress-compact']}>
        <div className={styles['progress-item']}>
          <UserFlag userCountry={user?.userCountry || guestCountry || undefined} size="small" />
          <Star size={18} className={styles['icon']} />
          <span className={styles['label']}>Level {levelData.currentLevel}</span>
          <Coins size={18} className={styles['icon']} />
          <span className={styles['coins']}>{coins.toLocaleString()} Coins</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['progress-compact']}>
      <div className={styles['progress-item']}>
        <UserFlag userCountry={user?.userCountry || guestCountry || undefined} size="small" />
        <Star size={18} className={styles['icon']} />
        <span className={styles['label']}>Level {levelData.currentLevel}</span>
        <span className={styles['progress-percentage']}>
          {Math.round(levelData.progressPercentage)}%
        </span>
        <span className={styles['xp']}>
          {levelData.xpProgress} / {levelData.xpToNextLevel}
        </span>
        <Coins size={18} className={styles['icon']} />
        <span className={styles['coins']}>{coins.toLocaleString()} Coins</span>
      </div>
    </div>
  );
}

export { calculateLevelData, LEVEL_THRESHOLDS };
