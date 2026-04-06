'use client';

import styles from './BonusCardSkeleton.module.scss';

export default function BonusCardSkeleton() {
  return (
    <div className={styles['skeleton-bonus']}>
      <div className={styles['skeleton-badge']} />
      <div className={styles['skeleton-text-lg']} />
      <div className={styles['skeleton-text-sm']} />
    </div>
  );
}
