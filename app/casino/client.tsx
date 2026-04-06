'use client';

import { useState } from 'react';
import CasinoCard from '@/components/CasinoCard';
import CasinoCardSkeleton from '@/components/CasinoCardSkeleton';
import { useFetch } from '@/hooks/useFetch';
import { useDeferredGuestCountry } from '@/hooks/useDeferredGuestCountry';
import styles from '@/app/casino/[country]/casino.module.scss';

interface Casino {
  id: string;
  name: string;
  slug: string;
  country: string;
  bonus: string;
  rating: number;
  revenueRank?: number;
  spins?: number;
  providers: string[];
  likes?: number;
  comments?: number;
  operatingCountries: string[];
  description?: string;
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
  isFeatured?: boolean;
}

export default function AllCasinosClient() {
  const guestCountry = useDeferredGuestCountry();
  const [displayCount, setDisplayCount] = useState(12);
  const { data: casinos, loading, error } = useFetch<Casino[]>('/api/casinos');

  const annotatedCasinos = casinos?.map((casino, index) => ({
    ...casino,
    isPremium: casino.isPremium ?? index < 100,
    isAffiliate: casino.isAffiliate ?? (index >= 100 && index < 150),
  }));



  return (
    <div className={styles['casino-page']}>
      <section className={styles['hero-section']}>
        <h1 className={styles['hero-title']}>All Online Casinos</h1>
        <p className={styles['hero-subtitle']}>
          Browse the full list of online casinos available on Simocasino. Compare ratings, bonuses, and features across thousands of casinos.
        </p>
      </section>

      {loading && (
        <section className={styles['casinos-section']}>
          <h2 className={styles['section-title']}>Loading Casinos...</h2>
          <div className={styles['casinos-grid']}>
            {[...Array(12)].map((_, index) => (
              <div key={`skeleton-${index}`}>
                <CasinoCardSkeleton />
              </div>
            ))}
          </div>
        </section>
      )}

      {error && (
        <div className={styles.error}>
          Failed to load casinos. Please try again later.
        </div>
      )}

      {!loading && casinos && casinos.length > 0 && (
        <section className={styles['casinos-section']}>
          <h2 className={styles['section-title']}>
            Available Casinos ({casinos.length})
          </h2>
          <div className={styles['casinos-grid']}>
            {annotatedCasinos?.slice(0, displayCount).map((casino, index) => (
              <div key={`${casino.id || casino.slug || index}-${casino.name}`}>
                <CasinoCard
                  name={casino.name}
                  country={casino.country}
                  bonus={casino.bonus}
                  rating={casino.rating}
                  operatingCountries={casino.operatingCountries}
                  slug={casino.slug}
                  {...(casino.spins !== undefined && { spins: casino.spins })}
                  {...(casino.providers && { providers: casino.providers })}
                  {...(casino.likes !== undefined && { likes: casino.likes })}
                  {...(casino.imageUrl && { imageUrl: casino.imageUrl })}
                  {...(casino.avatarUrl && { avatarUrl: casino.avatarUrl })}
                  {...(casino.imageGallery && { imageGallery: casino.imageGallery })}
                  {...(casino.affiliateLink && { affiliateLink: casino.affiliateLink })}
                  {...(casino.isAffiliate !== undefined && { isAffiliate: casino.isAffiliate })}
                  {...(casino.isPremium !== undefined && { isPremium: casino.isPremium })}
                  {...(casino.isExclusive !== undefined && { isExclusive: casino.isExclusive })}
                  guestCountry={guestCountry}
                />
              </div>
            ))}
          </div>

          {displayCount < casinos.length && (
            <div className={styles['load-more-wrapper']}>
              <button
                onClick={() => setDisplayCount((prev) => prev + 12)}
                className={styles['load-more-button']}
              >
                Load More Casinos ({displayCount} of {casinos.length})
              </button>
            </div>
          )}
        </section>
      )}

      {!loading && casinos && casinos.length === 0 && (
        <div className={styles['no-data']}>
          <p>No casinos available yet.</p>
        </div>
      )}

      <section className={styles['info-section']}>
        <h2>About All Online Casinos</h2>
        <p>
          Our full casino directory includes every casino we track. Use filters and ratings to find the best match for your country, bonus preferences, and play style.
        </p>
      </section>
    </div>
  );
}
