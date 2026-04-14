/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
'use client';

import { memo } from 'react';
import styles from './CasinoCard.module.scss';

interface CasinoCardProps {
  name: string;
  rating: number;
  spins?: number | undefined;
  likes?: number | undefined;
  website?: string | undefined;
  affiliateLink?: string | undefined;
  isAffiliate?: boolean | undefined;
  isPremium?: boolean | undefined;
  isExclusive?: boolean | undefined;
}

function CasinoCard({
  name,
  rating,
  spins,
  likes,
  website,
  affiliateLink,
  isAffiliate,
  isPremium,
  isExclusive,
}: CasinoCardProps) {
  const isGoldAffiliate = isAffiliate || (!!affiliateLink && !isExclusive);
  const cardClasses = [styles.card];
  if (isExclusive) cardClasses.push(styles.exclusiveCard);
  else if (isGoldAffiliate) cardClasses.push(styles.affiliateCard);
  else if (isPremium) cardClasses.push(styles.premiumCard);

  const trustLabel = rating >= 4.5 ? 'Top Rated' : rating >= 4.0 ? 'Trusted' : 'Popular';

  return (
    <article className={`${cardClasses.join(' ')} casino-card`} aria-labelledby={`casino-${name}`}>
      <div className={styles['top-section']}>
        <div className={styles['card-badge']}>{trustLabel}</div>
        <div className={styles.border}></div>
        <div className={styles.icons}>
          <div className={styles.logo}>
            <span className={styles['casino-initial']}>{name.charAt(0).toUpperCase()}</span>
          </div>
          <div className={styles['social-media']}>
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className={styles.svg} title="Visit Website">
                🌐
              </a>
            )}
            {affiliateLink && (
              <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className={styles.svg} title="Register">
                🎰
              </a>
            )}
          </div>
        </div>
      </div>
      <div className={styles['bottom-section']}>
        <span className={styles.title}>{name}</span>
        <div className={styles.row}>
          <div className={styles.item}>
            <span className={styles['big-text']}>{rating.toFixed(1)}</span>
            <span className={styles['regular-text']}>Rating</span>
          </div>
          <div className={styles.item}>
            <span className={styles['big-text']}>{likes || 0}</span>
            <span className={styles['regular-text']}>Likes</span>
          </div>
          <div className={styles.item}>
            <span className={styles['big-text']}>{spins || 0}</span>
            <span className={styles['regular-text']}>Spins</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(CasinoCard);