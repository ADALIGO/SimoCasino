'use client';

import React, { useMemo } from 'react';
import { Trophy, Star, Zap } from 'lucide-react';
import { useSelector } from 'react-redux';
import UserFlag from './UserFlag';
import styles from './UserProgressHeader.module.scss';
import { useDeferredGuestCountry } from '@/hooks/useDeferredGuestCountry';

interface UserProgressHeaderProps {
  totalPoints?: number;
  showAnimation?: boolean;
}

interface LevelData {
  currentLevel: number;
  currentLevelXP: number;
  nextLevelXP: number;
  xpProgress: number;
  xpToNextLevel: number;
  progressPercentage: number;
  isMaxLevel: boolean;
}

// Level thresholds: points required to reach each level
const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500];
const MAX_LEVEL = LEVEL_THRESHOLDS.length - 1;

/**
 * Calculate level data based on total points
 */
const calculateLevelData = (totalPoints: number): LevelData => {
  let currentLevel = 0;
  let currentLevelXP = 0;

  // Find current level
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
    currentLevelXP,
    nextLevelXP: nextLevelXP!,
    xpProgress,
    xpToNextLevel,
    progressPercentage,
    isMaxLevel,
  };
};

export default function UserProgressHeader({
  totalPoints = 1250,
  showAnimation = true,
}: UserProgressHeaderProps) {
  const levelData = useMemo(() => calculateLevelData(totalPoints), [totalPoints]);
  const user = useSelector((state: any) => state.auth.user);
  const guestCountry = useDeferredGuestCountry(user?.userCountry || null);

  // Calculate badge based on level
  const getBadgeColor = (level: number): string => {
    if (level >= 8) return '#FFD700'; // Gold
    if (level >= 6) return '#C0C0C0'; // Silver
    if (level >= 4) return '#CD7F32'; // Bronze
    return '#FF6B35'; // Orange (default)
  };

  const badgeColor = getBadgeColor(levelData.currentLevel);

  return (
    <div className={styles['progress-header']}>
      {/* Background gradient blur effect */}
      <div className={styles['bg-gradient']} />

      <div className={styles['container']}>
        {/* Level Badge Section */}
        <div className={styles['level-section']}>
          <div
            className={styles['level-badge']}
            style={{
              borderColor: badgeColor,
              boxShadow: `0 0 20px ${badgeColor}40`,
            }}
          >
            <div className={styles['badge-content']}>
              <Trophy
                size={24}
                color={badgeColor}
                className={showAnimation ? styles['trophy-animate'] : ''}
              />
              <span className={styles['level-number']}>{levelData.currentLevel}</span>
            </div>
          </div>
          <UserFlag userCountry={user?.userCountry || guestCountry} size="small" />
          <div className={styles['level-label']}>
            <p className={styles['level-text']}>Level {levelData.currentLevel}</p>
            {levelData.isMaxLevel && <p className={styles['max-level']}>MAX</p>}
          </div>
        </div>

        {/* Progress Section */}
        <div className={styles['progress-section']}>
          {/* Points Display */}
          <div className={styles['points-display']}>
            <div className={styles['points-item']}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <span className={styles['points-value']}>{totalPoints.toLocaleString()}</span>
              <span className={styles['points-label']}>pts</span>
            </div>
            <div className={styles['divider']} />
            <div className={styles['points-item']}>
              <Zap size={16} color="#FF6B35" fill="#FF6B35" />
              <span className={styles['xp-value']}>
                {levelData.xpProgress.toLocaleString()} / {levelData.xpToNextLevel.toLocaleString()}
              </span>
              <span className={styles['xp-label']}>XP</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={styles['progress-bar-wrapper']}>
            <div className={styles['progress-bar-container']}>
              <div
                className={styles['progress-bar-fill']}
                style={{
                  width: `${levelData.progressPercentage}%`,
                }}
              />
              <div className={styles['progress-bar-shimmer']} />
            </div>
            <span className={styles['progress-text']}>
              {Math.round(levelData.progressPercentage)}%
            </span>
          </div>

          {/* Level Info */}
          {!levelData.isMaxLevel && (
            <div className={styles['next-level-info']}>
              <p className={styles['next-level-text']}>
                {(levelData.xpToNextLevel - levelData.xpProgress).toLocaleString()} XP to Level{' '}
                {levelData.currentLevel + 1}
              </p>
            </div>
          )}
        </div>

        {/* Decorative Stars */}
        <div className={styles['decorative-stars']}>
          {[...Array(3)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={styles['star']}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Export utility for external use
export { calculateLevelData, LEVEL_THRESHOLDS, MAX_LEVEL };
