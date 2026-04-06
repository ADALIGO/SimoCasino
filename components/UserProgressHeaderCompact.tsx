'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Star, Coins } from 'lucide-react';
import { useSelector } from 'react-redux';
import UserFlag from '@/components/UserFlag';
import { useDeferredGuestCountry } from '@/hooks/useDeferredGuestCountry';
import styles from './UserProgressHeaderCompact.module.scss';

interface UserProgressHeaderCompactProps {
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

const cleanCountry = (country?: string | null) => {
  const sanitized = country?.toString().trim();
  if (!sanitized || sanitized.toLowerCase() === 'undefined') return undefined;
  return sanitized;
};

export default function UserProgressHeaderCompact({
  totalPoints = 0,
  coins = 0,
  minimal = false,
}: UserProgressHeaderCompactProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const levelData = useMemo(() => calculateLevelData(totalPoints), [totalPoints]);
  const user = useSelector((state: any) => state.auth.user);
  const guestCountry = useDeferredGuestCountry(user?.userCountry || null);
  const displayCountry = !hasMounted ? undefined : cleanCountry(user?.userCountry) || cleanCountry(guestCountry);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
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
          <UserFlag userCountry={displayCountry} size="small" />
          <Star size={18} className={styles['icon']} />
          <span className={styles['xp']}>
            {levelData.xpProgress} / {levelData.xpToNextLevel}
          </span>
          <Coins size={18} className={styles['icon']} />
          <span className={styles['coins']}>{coins.toLocaleString()} Coins</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['progress-compact']}>
      {/* Level Display with Flag */}
      <div className={styles['progress-item']}>
        <UserFlag userCountry={displayCountry} size="small" />
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
