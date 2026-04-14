'use client';

import { useState } from 'react';
import CasinoCard from '@/components/CasinoCard';
import CasinoCardSkeleton from '@/components/CasinoCardSkeleton';
import CasinoFiltersSidebar from '@/components/CasinoFiltersSidebar';
import { useFetch } from '@/hooks/useFetch';
import { useDeferredGuestCountry } from '@/hooks/useDeferredGuestCountry';
import styles from '@/app/casino/[country-filter]/casino.module.scss';

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

interface FilterState {
  search: string;
  ratingMin: number;
  ratingMax: number;
  currencies: string[];
  isAffiliate: boolean | null;
  isPremium: boolean | null;
  isExclusive: boolean | null;
  liveCasinoAvailable: boolean | null;
  cryptoSupport: boolean | null;
  minDepositMin: number;
  minDepositMax: number;
  minWithdrawalMin: number;
  minWithdrawalMax: number;
  country: string;
  operatingCountries: string[];
  providers: string[];
}

export default function AllCasinosClient() {
  const guestCountry = useDeferredGuestCountry();
  const [displayCount, setDisplayCount] = useState(12);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    ratingMin: 0,
    ratingMax: 5,
    currencies: [],
    isAffiliate: null,
    isPremium: null,
    isExclusive: null,
    liveCasinoAvailable: null,
    cryptoSupport: null,
    minDepositMin: 0,
    minDepositMax: 10000,
    minWithdrawalMin: 0,
    minWithdrawalMax: 10000,
    country: '',
    operatingCountries: [],
    providers: [],
  });
  const { data: casinos, loading, error } = useFetch<Casino[]>('/api/casinos');

  const annotatedCasinos = casinos?.map((casino, index) => ({
    ...casino,
    isPremium: casino.isPremium ?? index < 100,
    isAffiliate: casino.isAffiliate ?? (index >= 100 && index < 150),
  }));

  // Apply filters
  const filteredCasinos = annotatedCasinos?.filter(casino => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!casino.name.toLowerCase().includes(searchLower) &&
          !casino.description?.toLowerCase().includes(searchLower) &&
          !casino.bonus.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    // Rating filter
    if (casino.rating < filters.ratingMin || casino.rating > filters.ratingMax) {
      return false;
    }

    // Currencies filter
    if (filters.currencies.length > 0) {
      const hasMatchingCurrency = filters.currencies.some(currency =>
        casino.currencies?.includes(currency as any)
      );
      if (!hasMatchingCurrency) return false;
    }

    // Boolean filters
    if (filters.isAffiliate !== null && casino.isAffiliate !== filters.isAffiliate) return false;
    if (filters.isPremium !== null && casino.isPremium !== filters.isPremium) return false;
    if (filters.isExclusive !== null && casino.isExclusive !== filters.isExclusive) return false;
    if (filters.liveCasinoAvailable !== null && casino.liveCasinoAvailable !== filters.liveCasinoAvailable) return false;
    if (filters.cryptoSupport !== null && casino.cryptoSupport !== filters.cryptoSupport) return false;

    // Deposit/Withdrawal filters
    if (casino.minDeposit !== undefined && (casino.minDeposit < filters.minDepositMin || casino.minDeposit > filters.minDepositMax)) return false;
    if (casino.minWithdrawal !== undefined && (casino.minWithdrawal < filters.minWithdrawalMin || casino.minWithdrawal > filters.minWithdrawalMax)) return false;

    // Country filter
    if (filters.country && casino.country !== filters.country) return false;

    // Operating countries filter
    if (filters.operatingCountries.length > 0) {
      const hasMatchingCountry = filters.operatingCountries.some(country =>
        casino.operatingCountries?.includes(country)
      );
      if (!hasMatchingCountry) return false;
    }

    // Providers filter
    if (filters.providers.length > 0) {
      const hasMatchingProvider = filters.providers.some(provider =>
        casino.providers?.includes(provider)
      );
      if (!hasMatchingProvider) return false;
    }

    return true;
  });

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setDisplayCount(12); // Reset display count when applying filters
    setSidebarOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      ratingMin: 0,
      ratingMax: 5,
      currencies: [],
      isAffiliate: null,
      isPremium: null,
      isExclusive: null,
      liveCasinoAvailable: null,
      cryptoSupport: null,
      minDepositMin: 0,
      minDepositMax: 10000,
      minWithdrawalMin: 0,
      minWithdrawalMax: 10000,
      country: '',
      operatingCountries: [],
      providers: [],
    });
    setDisplayCount(12);
    setSidebarOpen(false);
  };

  return (
    <div className={`${styles['casino-page']} ${sidebarOpen ? styles['sidebar-open'] : ''}`}>
      <section className={styles['hero-section']}>
        <div className={styles['hero-controls']}>
          <button
            onClick={() => setSidebarOpen(true)}
            className={styles['filter-btn']}
          >
            🔍 Filter Casinos
          </button>
        </div>
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
            Available Casinos ({filteredCasinos?.length || 0})
          </h2>
          
          <div className={styles['casinos-grid']}>
            {filteredCasinos?.slice(0, displayCount).map((casino, index) => (
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

          {displayCount < (filteredCasinos?.length || 0) && (
            <div className={styles['load-more-wrapper']}>
              <button
                onClick={() => setDisplayCount((prev) => prev + 12)}
                className={styles['load-more-button']}
              >
                Load More Casinos ({displayCount} of {filteredCasinos?.length || 0})
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

      <CasinoFiltersSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <section className={styles['info-section']}>
        <h2>About All Online Casinos</h2>
        <p>
          Our full casino directory includes every casino we track. Use filters and ratings to find the best match for your country, bonus preferences, and play style.
        </p>
      </section>
    </div>
  );
}
