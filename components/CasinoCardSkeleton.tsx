'use client';

import styles from './CasinoCardSkeleton.module.scss';

export default function CasinoCardSkeleton() {
  return (
    <div className={styles['skeleton-card']}>
      {/* Avatar skeleton */}
      <div className={styles['skeleton-avatar']} />

      {/* Name skeleton */}
      <div className={styles['skeleton-text-lg']} />

      {/* Likes skeleton */}
      <div className={styles['skeleton-likes']} />

      {/* Rating skeleton */}
      <div className={styles['skeleton-text-sm']} />

      {/* Country skeleton */}
      <div className={styles['skeleton-text-sm']} />

      {/* Bonus skeleton */}
      <div className={styles['skeleton-text-sm']} />

      {/* Details skeleton */}
      <div className={styles['skeleton-details']}>
        <div className={styles['skeleton-text-xs']} />
        <div className={styles['skeleton-text-xs']} />
        <div className={styles['skeleton-text-xs']} />
        <div className={styles['skeleton-text-xs']} />
      </div>

      {/* Status skeleton */}
      <div className={styles['skeleton-status']} />
    </div>
  );
}
