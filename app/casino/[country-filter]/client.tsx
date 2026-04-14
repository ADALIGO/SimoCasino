'use client';

import { useCallback, useMemo, useState, useTransition } from 'react';
import { useSelector } from 'react-redux';
import HOMELayouts from '@/app/layouts/HOMELayouts';
import { useDeferredGuestCountry } from '@/hooks/useDeferredGuestCountry';
import CasinoCard from '@/components/CasinoCard';
import CasinoCardSkeleton from '@/components/CasinoCardSkeleton';
import { useFetch } from '@/hooks/useFetch';
import { RootState } from '@/store/store';
import styles from './casino.module.scss';

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

interface CasinoCountryPageProps {
  country: string;
  initialCasinos?: Casino[];
}

export default function CasinoCountryPage({
  country,
  initialCasinos,
}: CasinoCountryPageProps) {
  const countryName = country
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const guestCountry = useDeferredGuestCountry();
  const [displayCount, setDisplayCount] = useState(12);
  const [isPending, startTransition] = useTransition();
  const userCountry = useSelector(
    (state: RootState) => state.auth.user?.userCountry ?? null
  );
  const effectiveUserCountry = userCountry || guestCountry;

  const { data: casinos, loading, error } = useFetch<Casino[]>(
    `/api/casinos?country=${countryName}`,
    [countryName],
    initialCasinos
  );

  const annotatedCasinos = useMemo(
    () => casinos?.map((casino, index) => ({
      ...casino,
      isPremium: casino.isPremium ?? index < 100,
      isAffiliate: casino.isAffiliate ?? (index >= 100 && index < 150),
    })),
    [casinos]
  );

  const visibleCasinos = useMemo(
    () => annotatedCasinos?.slice(0, displayCount) ?? [],
    [annotatedCasinos, displayCount]
  );

  const handleLoadMore = useCallback(() => {
    startTransition(() => {
      setDisplayCount((prev) => prev + 12);
    });
  }, [startTransition]);

  return (
    <HOMELayouts>
      <div className={styles['casino-page']}>
        <section className={styles['hero-section']}>
          <h1 className={styles['hero-title']}>
            Best Casinos in {countryName}
          </h1>
          <p className={styles['hero-subtitle']}>
            Discover top-rated online casinos with exclusive bonuses for{' '}
            {countryName} players
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
              {visibleCasinos.map((casino, index) => (
                <div
                  key={`${casino.id || casino.slug || index}-${casino.name}`}
                >
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
                    userCountry={effectiveUserCountry}
                  />
                </div>
              ))}
            </div>

            {displayCount < (casinos?.length ?? 0) && (
              <div className={styles['load-more-wrapper']}>
                <button
                  onClick={handleLoadMore}
                  disabled={isPending}
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
            <p>No casinos available for {countryName} yet.</p>
          </div>
        )}

        <section className={styles['info-section']}>
          <h2>About Casinos in {countryName}</h2>
          <p>
            Our curated list of casinos provides the best selection of gaming
            options tailored for {countryName} players. Each casino is
            thoroughly reviewed for safety, reliability, and bonus offerings.
          </p>
        </section>
      </div>
    </HOMELayouts>
  );
}