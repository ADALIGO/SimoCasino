'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CasinoCard from '@/components/CasinoCard';
import { useFetch } from '@/hooks/useFetch';
import { useDeferredGuestCountry } from '@/hooks/useDeferredGuestCountry';
import styles from './casino-details.module.scss';

interface Casino {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string;
  bonus: string;
  rating: number;
  revenueRank?: number;
  spins?: number;
  providers: string[];
  likes?: number;
  comments?: number;
  operatingCountries: string[];
  languages: string[];
  license?: string;
  website?: string;
  appAvailable: boolean;
  minDeposit?: number;
  minWithdrawal?: number;
  withdrawalLimit?: number;
  withdrawalTime?: string;
  currencies: string[];
  vipLevels?: number;
  vipRewards?: string[];
  liveCasinoAvailable: boolean;
  supportEmail?: string;
  supportPhone?: string;
  avatarUrl?: string;
  imageUrl?: string;
  imageGallery: string[];
  affiliateLink?: string;
  isAffiliate: boolean;
  isPremium: boolean;
  isExclusive: boolean;
  displayPriority?: number;
  jackpotAmount?: number;
  isFeatured: boolean;
  isNew: boolean;
  totalPlayers?: number;
  monthlyActivePlayers?: number;
  cryptoSupport: boolean;
  popularGames: string[];
  tournamentsActive: boolean;
  leaderboardEnabled: boolean;
}

interface CasinoDetailsClientProps {
  slug: string;
}

export default function CasinoDetailsClient({ slug }: CasinoDetailsClientProps) {
  const router = useRouter();
  const guestCountry = useDeferredGuestCountry();
  const { data: casinos, loading, error } = useFetch<Casino[]>('/api/casinos');
  const [casino, setCasino] = useState<Casino | null>(null);

  useEffect(() => {
    if (casinos) {
      // Find casino by slug or by name (fallback for URL generation)
      const foundCasino = casinos.find(c =>
        c.slug === slug || c.name.toLowerCase().replace(/\s+/g, '-') === slug
      );
      setCasino(foundCasino || null);
    }
  }, [casinos, slug]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading casino details...</div>
      </div>
    );
  }

  if (error || !casino) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Casino Not Found</h2>
          <p>The casino you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => router.push('/casino')} className={styles.backBtn}>
            Back to Casinos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.casinoHeader}>
            <h1 className={styles.casinoName}>{casino.name}</h1>
            <div className={styles.casinoMeta}>
              <span className={styles.rating}>⭐ {casino.rating.toFixed(1)}</span>
              <span className={styles.country}>📍 {casino.country}</span>
              {casino.isPremium && <span className={styles.badge}>Premium</span>}
              {casino.isExclusive && <span className={styles.badge}>Exclusive</span>}
            </div>
          </div>

          <div className={styles.heroActions}>
            {casino.website && (
              <a href={casino.website} target="_blank" rel="noopener noreferrer" className={styles.visitBtn}>
                🌐 VISITE WEBSITE
              </a>
            )}
            {casino.affiliateLink && (
              <a href={casino.affiliateLink} target="_blank" rel="noopener noreferrer" className={styles.registerBtn}>
                🎰 REGISTER NOW
              </a>
            )}
          </div>
        </div>

        {casino.imageUrl && (
          <div className={styles.heroImage}>
            <img src={casino.imageUrl} alt={casino.name} />
          </div>
        )}
      </section>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Left Column - Main Info */}
        <div className={styles.mainColumn}>
          {/* Description */}
          <section className={styles.section}>
            <h2>About {casino.name}</h2>
            <p className={styles.description}>{casino.description}</p>
          </section>

          {/* Bonus Information */}
          <section className={styles.section}>
            <h2>🎁 Current Bonus</h2>
            <div className={styles.bonusCard}>
              <h3>{casino.bonus}</h3>
              <p>Don't miss out on this amazing offer!</p>
            </div>
          </section>

          {/* Key Features */}
          <section className={styles.section}>
            <h2>✨ Key Features</h2>
            <div className={styles.featuresGrid}>
              {casino.liveCasinoAvailable && (
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>🎲</span>
                  <span>Live Casino</span>
                </div>
              )}
              {casino.cryptoSupport && (
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>₿</span>
                  <span>Crypto Support</span>
                </div>
              )}
              {casino.appAvailable && (
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>📱</span>
                  <span>Mobile App</span>
                </div>
              )}
              {casino.vipLevels && casino.vipLevels > 0 && (
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>👑</span>
                  <span>VIP Program</span>
                </div>
              )}
              {casino.tournamentsActive && (
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>🏆</span>
                  <span>Active Tournaments</span>
                </div>
              )}
            </div>
          </section>

          {/* Providers */}
          {casino.providers && casino.providers.length > 0 && (
            <section className={styles.section}>
              <h2>🎮 Game Providers</h2>
              <div className={styles.providersList}>
                {casino.providers.map((provider, index) => (
                  <span key={index} className={styles.providerTag}>
                    {provider}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Popular Games */}
          {casino.popularGames && casino.popularGames.length > 0 && (
            <section className={styles.section}>
              <h2>🎯 Popular Games</h2>
              <div className={styles.gamesList}>
                {casino.popularGames.map((game, index) => (
                  <span key={index} className={styles.gameTag}>
                    {game}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Stats & Info */}
        <div className={styles.sidebar}>
          {/* Quick Stats */}
          <section className={styles.statsCard}>
            <h3>📊 Quick Stats</h3>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Rating</span>
                <span className={styles.statValue}>{casino.rating.toFixed(1)}/5</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Likes</span>
                <span className={styles.statValue}>{casino.likes || 0}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Spins</span>
                <span className={styles.statValue}>{casino.spins || 0}</span>
              </div>
              {casino.totalPlayers && (
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Total Players</span>
                  <span className={styles.statValue}>{casino.totalPlayers.toLocaleString()}</span>
                </div>
              )}
            </div>
          </section>

          {/* Financial Info */}
          <section className={styles.infoCard}>
            <h3>💰 Financial Information</h3>
            <div className={styles.financialInfo}>
              {casino.minDeposit && (
                <div className={styles.infoItem}>
                  <span>Min Deposit:</span>
                  <span>${casino.minDeposit}</span>
                </div>
              )}
              {casino.minWithdrawal && (
                <div className={styles.infoItem}>
                  <span>Min Withdrawal:</span>
                  <span>${casino.minWithdrawal}</span>
                </div>
              )}
              {casino.withdrawalTime && (
                <div className={styles.infoItem}>
                  <span>Withdrawal Time:</span>
                  <span>{casino.withdrawalTime}</span>
                </div>
              )}
              {casino.currencies && casino.currencies.length > 0 && (
                <div className={styles.infoItem}>
                  <span>Currencies:</span>
                  <span>{casino.currencies.join(', ')}</span>
                </div>
              )}
            </div>
          </section>

          {/* Operating Countries */}
          {casino.operatingCountries && casino.operatingCountries.length > 0 && (
            <section className={styles.infoCard}>
              <h3>🌍 Available In</h3>
              <div className={styles.countriesList}>
                {casino.operatingCountries.map((country, index) => (
                  <span key={index} className={styles.countryTag}>
                    {country}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Contact Info */}
          {(casino.supportEmail || casino.supportPhone) && (
            <section className={styles.infoCard}>
              <h3>📞 Support</h3>
              <div className={styles.contactInfo}>
                {casino.supportEmail && (
                  <div className={styles.contactItem}>
                    <span>Email:</span>
                    <a href={`mailto:${casino.supportEmail}`}>{casino.supportEmail}</a>
                  </div>
                )}
                {casino.supportPhone && (
                  <div className={styles.contactItem}>
                    <span>Phone:</span>
                    <a href={`tel:${casino.supportPhone}`}>{casino.supportPhone}</a>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      {casino.imageGallery && casino.imageGallery.length > 0 && (
        <section className={styles.gallery}>
          <h2>🖼️ Gallery</h2>
          <div className={styles.galleryGrid}>
            {casino.imageGallery.map((image, index) => (
              <div key={index} className={styles.galleryItem}>
                <img src={image} alt={`${casino.name} ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back Button */}
      <div className={styles.backSection}>
        <button onClick={() => router.push('/casino')} className={styles.backBtn}>
          ← Back to All Casinos
        </button>
      </div>
    </div>
  );
}