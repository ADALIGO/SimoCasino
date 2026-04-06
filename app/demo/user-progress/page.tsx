'use client';

import React, { useState } from 'react';
import UserProgressHeader, { 
  calculateLevelData, 
  LEVEL_THRESHOLDS 
} from '@/components/UserProgressHeader';

/**
 * Demo page showcasing the UserProgressHeader component
 * Shows different point levels and interactivity
 */
export default function UserProgressDemo() {
  const [currentPoints, setCurrentPoints] = useState(1250);
  const levelData = calculateLevelData(currentPoints);

  const handleAddPoints = (amount: number) => {
    setCurrentPoints((prev) => Math.min(prev + amount, LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] || 5500));
  };

  const handleReset = () => {
    setCurrentPoints(0);
  };

  return (
    <div style={{ padding: '40px', background: '#0f0f1e', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', marginBottom: '40px' }}>User Progress Component Demo</h1>

      {/* Main Component */}
      <UserProgressHeader totalPoints={currentPoints} showAnimation={true} />

      {/* Interactive Controls */}
      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          background: 'rgba(255, 107, 53, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 107, 53, 0.2)',
        }}
      >
        <h2 style={{ color: '#fff', marginTop: 0 }}>Demo Controls</h2>
        <p style={{ color: '#aaa', marginBottom: '20px' }}>
          Current Points: <strong style={{ color: '#FFD700' }}>{currentPoints}</strong> | Current Level:{' '}
          <strong style={{ color: '#FF6B35' }}>{levelData.currentLevel}</strong>
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button
            onClick={() => handleAddPoints(50)}
            style={{
              padding: '10px 16px',
              background: '#FF6B35',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            +50 Points
          </button>
          <button
            onClick={() => handleAddPoints(100)}
            style={{
              padding: '10px 16px',
              background: '#FF6B35',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            +100 Points
          </button>
          <button
            onClick={() => handleAddPoints(500)}
            style={{
              padding: '10px 16px',
              background: '#FFD700',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            +500 Points
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '10px 16px',
              background: '#666',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Reset
          </button>
        </div>

        {/* Level Information */}
        <div style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.8' }}>
          <p>
            <strong>Current Level XP:</strong> {levelData.currentLevelXP.toLocaleString()}
          </p>
          <p>
            <strong>Next Level XP:</strong> {levelData.nextLevelXP.toLocaleString()}
          </p>
          <p>
            <strong>Progress to Next Level:</strong> {levelData.xpProgress.toLocaleString()} /{' '}
            {levelData.xpToNextLevel.toLocaleString()} ({Math.round(levelData.progressPercentage)}%)
          </p>
          <p>
            <strong>XP Remaining:</strong> {(levelData.xpToNextLevel - levelData.xpProgress).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Level Thresholds Reference */}
      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h2 style={{ color: '#fff', marginTop: 0 }}>Level Thresholds Reference</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
          {LEVEL_THRESHOLDS.map((threshold, index) => (
            <div
              key={index}
              style={{
                padding: '12px',
                background:
                  currentPoints >= threshold
                    ? 'rgba(255, 107, 53, 0.3)'
                    : 'rgba(255, 255, 255, 0.05)',
                border: currentPoints >= threshold ? '1px solid #FF6B35' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: '0 0 4px 0', color: '#aaa', fontSize: '12px' }}>Level {index}</p>
              <p style={{ margin: 0, color: currentPoints >= threshold ? '#FFD700' : '#fff', fontWeight: '700' }}>
                {threshold.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
