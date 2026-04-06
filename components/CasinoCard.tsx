/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserFlag from './UserFlag';
import { shouldCasinoBeAcceptable, getCountryName } from './countryUtils';
import styles from './CasinoCard.module.scss';

interface CasinoCardProps {
  name: string;
  country: string;
  bonus: string;
  rating: number;
  operatingCountries?: string[];
  slug?: string;
  spins?: number;
  providers?: string[];
  likes?: number;
  comments?: number;
  guestCountry?: string | null;
  description?: string;
  revenueRank?: number;
  minDeposit?: number;
  minWithdrawal?: number;
  withdrawalLimit?: number;
  withdrawalTime?: string;
  currencies?: string[];
  vipLevels?: number;
  liveCasinoAvailable?: boolean;
  supportEmail?: string;
  supportPhone?: string;
  imageUrl?: string;
  avatarUrl?: string;
  imageGallery?: string[];
  affiliateLink?: string;
  isAffiliate?: boolean;
  isPremium?: boolean;
  isExclusive?: boolean;
  userCountry?: string | null;
}

function CasinoCard({
  name,
  country,
  bonus,
  rating,
  operatingCountries = [],
  slug,
  spins,
  providers = [],
  likes,
  comments,
  description,
  revenueRank,
  minDeposit,
  minWithdrawal,
  withdrawalLimit,
  withdrawalTime,
  currencies,
  vipLevels,
  liveCasinoAvailable,
  supportEmail,
  supportPhone,
  guestCountry,
  userCountry,
  imageUrl,
  avatarUrl,
  imageGallery = [],
  affiliateLink,
  isAffiliate,
  isPremium,
  isExclusive,
}: CasinoCardProps) {
  const effectiveCountry = userCountry || guestCountry;
  const resolvedCountryName = effectiveCountry ? getCountryName(effectiveCountry) || effectiveCountry : null;
  const isAcceptable = shouldCasinoBeAcceptable(effectiveCountry, operatingCountries);

  const casinoSlug = slug || name.toLowerCase().replace(/\s+/g, '-');
  const casinoReviewUrl = `/casino/details/${casinoSlug}`;

  const isGoldAffiliate = isAffiliate || (!!affiliateLink && !isExclusive);
  const cardClasses = [styles.card];
  if (isExclusive) cardClasses.push(styles.exclusiveCard);
  else if (isGoldAffiliate) cardClasses.push(styles.affiliateCard);
  else if (isPremium) cardClasses.push(styles.premiumCard);

  const badgeLabel = isExclusive
    ? 'Exclusive Casino'
    : isGoldAffiliate
    ? 'Gold Affiliate'
    : isPremium
    ? 'Premium Casino'
    : undefined;
  const badgeIcon = isExclusive ? '👑' : isGoldAffiliate ? '✨' : isPremium ? '💎' : undefined;

  return (
    <article className={cardClasses.join(' ')} aria-labelledby={`casino-${name}`}>
      <div className={styles['card-bg']}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${name} casino`}
            width={300}
            height={169}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles['card-bg-image']}
            loading="lazy"
            decoding="async"
            quality={70}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEB//EACUQAAIBAwMEAwEBAAAAAAAAAAECAwAEEQUSITFBURNhcZEigf/EABUBAFEAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A4+iiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="
          />
        )}
      </div>
      {(isPremium || isGoldAffiliate) && (
        <div className={styles['card-ornament']} aria-hidden="true">
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
            <circle cx="60" cy="60" r="50" fill="currentColor" opacity="0.14" />
            <path d="M60 22L73.8 48.6L102 53.2L80.4 74.4L85.6 102.4L60 88.6L34.4 102.4L39.6 74.4L18 53.2L46.2 48.6L60 22Z" fill="currentColor" opacity="0.22" />
          </svg>
        </div>
      )}
      <div className={styles['card-content']}>
        <div className={styles['card-avatar']}>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${name} casino logo`}
            width={64}
            height={64}
            className={styles['avatar-image']}
            loading="lazy"
            decoding="async"
            unoptimized
          />
        ) : (
          <div className={styles['avatar-placeholder']} aria-label={`${name} casino logo`}>
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      {badgeLabel && (
        <div className={styles['avatar-badge']} aria-label={badgeLabel}>
          <span aria-hidden="true">{badgeIcon}</span>
          <span>{badgeLabel}</span>
        </div>
      )}

      <h3 id={`casino-${name}`} className={styles['card-name']}>{name}</h3>

      <div className={styles['card-likes']}>
        <span className={styles['likes-icon']} aria-hidden="true">❤️</span>
        <span className={styles['likes-count']} aria-label={`${likes || 0} likes`}>{likes || 0}</span>
      </div>

      <p className={styles['card-rating']} aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}>{rating.toFixed(1)} ⭐</p>

      <div className={styles['back-country']}>
        <UserFlag userCountry={country} size="small" />
        <span>{country}</span>
      </div>

      <div className={styles['back-bonus']}>
        <small>Bonus: {bonus}</small>
      </div>

      <div className={styles['back-details']}>
        {slug && <p><small>📌 {slug}</small></p>}
        {revenueRank !== undefined && <p><small>🏆 Rank: {revenueRank}</small></p>}
        {description && <p><small>📝 {description}</small></p>}
        {spins !== undefined && <p><small>🎰 {spins} Free Spins</small></p>}
        {providers && providers.length > 0 && <p><small>🎮 {providers.slice(0, 2).join(', ')}</small></p>}
        {operatingCountries && operatingCountries.length > 0 && <p><small>🌍 {operatingCountries.slice(0, 2).join(', ')}</small></p>}
      {minDeposit !== undefined && minWithdrawal !== undefined && (
        <p><small>💰 Min Deposit: ${minDeposit} | Min Withdrawal: ${minWithdrawal}</small></p>
      )}
      {withdrawalLimit !== undefined && withdrawalTime && (
        <p><small>⏱️ Withdrawal: {withdrawalTime} / Limit: ${withdrawalLimit}</small></p>
      )}
      {comments !== undefined && <p><small>💬 {comments} Comments</small></p>}
      {currencies && currencies.length > 0 && <p><small>💱 {currencies.join(', ')}</small></p>}
      {vipLevels !== undefined && <p><small>👑 VIP Levels: {vipLevels}</small></p>}
      {liveCasinoAvailable !== undefined && <p><small>🎥 Live: {liveCasinoAvailable ? 'Yes' : 'No'}</small></p>}
      {supportEmail && <p><small>📧 {supportEmail}</small></p>}
      {supportPhone && <p><small>📞 {supportPhone}</small></p>}
      </div>

      <div className={`${styles['back-status']} ${isAcceptable === null ? styles.neutral : isAcceptable ? styles.acceptable : styles.restricted}`}>
        {isAcceptable === false && resolvedCountryName ? (
          <>
            <UserFlag userCountry={resolvedCountryName} size="small" />
            <small>❌ {resolvedCountryName} is restricted</small>
          </>
        ) : isAcceptable === true && resolvedCountryName ? (
          <>
            <UserFlag userCountry={resolvedCountryName} size="small" />
            <small>✅ {resolvedCountryName} is available</small>
          </>
        ) : (
          <small>{isAcceptable === null ? '🔒 Login to check' : '✅ Available'}</small>
        )}
      </div>

      {imageGallery && imageGallery.length > 0 && (
        <div className={styles['image-gallery']} role="group" aria-label={`${name} casino gallery`}>
          <div className={styles['gallery-thumbnails']}>
            {imageGallery.slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${name} casino gallery ${index + 1}`}
                width={120}
                height={80}
                className={styles['gallery-thumb']}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className={styles['card-actions']} role="group" aria-label="Casino actions">
        <Link href={casinoReviewUrl} className={`${styles['action-btn']} ${styles['play-btn']}`} aria-label={`Visit ${name} casino`}>
          Play
        </Link>
        {affiliateLink && (
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={`${styles['action-btn']} ${styles['register-btn']}`}
            aria-label={`Register at ${name} casino`}
          >
            Register
          </a>
        )}
      </div>

      <Link href={casinoReviewUrl} className={styles['more-btn']} aria-label={`View more details about ${name} casino`}>
        + MORE
      </Link>
      </div>
    </article>
  );
}

export default memo(CasinoCard);