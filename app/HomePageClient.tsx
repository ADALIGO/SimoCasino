'use client';

import { useTranslation } from 'react-i18next';
import BonusCard from '@/components/BonusCard';
import CasinoCard from '@/components/CasinoCard';
import styles from './page.module.scss';

interface HomeClientProps {
  featuredBonuses: Array<{
    amount: string;
    type: string;
    description: string;
  }>;
  featuredCasinos: Array<{
    name: string;
    rating: number;
    spins?: number;
    likes?: number;
    website?: string;
    affiliateLink?: string;
    isAffiliate?: boolean;
    isPremium?: boolean;
    isExclusive?: boolean;
  }>;
  casinoData: Record<string, Array<{
    name: string;
    website: string;
    rating: number;
    spins?: number;
    likes?: number;
    affiliateLink?: string;
    isAffiliate?: boolean;
    isPremium?: boolean;
    isExclusive?: boolean;
  }>>;
}

export default function HomeClient({ featuredBonuses, featuredCasinos, casinoData }: HomeClientProps) {
  const { t } = useTranslation();

  // Normalize casino data
  const normalizedCasinos = featuredCasinos.map((casino) => ({
    spins: casino.spins ?? 50,
    likes: casino.likes ?? 0,
    website: casino.website,
    affiliateLink: casino.affiliateLink,
    isAffiliate: casino.isAffiliate ?? false,
    isPremium: casino.isPremium ?? false,
    isExclusive: casino.isExclusive ?? false,
    ...casino,
  }));

  return (
    <>
      <section className={styles['hero-section']}>
       
        <div className={styles['hero-content']}>
          <h1 className={styles['hero-title']}>{t('hero_title')}</h1>
          <p className={styles['hero-subtitle']}>{t('hero_subtitle')}</p>
          <button className={styles['hero-button']}>{t('hero_button')}</button>
        </div>
      </section>

      <section className={styles['bonuses-section']}>
        <h2 className={styles['section-title']}>{t('featured_bonuses')}</h2>
        <div className={styles['bonuses-grid']}>
          {featuredBonuses.map((bonus, idx) => (
            <div key={idx} className={styles['bonus-card-wrapper']}>
              <BonusCard
                amount={bonus.amount}
                type={bonus.type}
                description={bonus.description}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Casinos Section */}
      <section className={styles['casinos-section']}>
        <h2 className={styles['section-title']}>🏆 Top 10 Trusted Casinos</h2>
        <p className={styles['section-subtitle']}>Explore the highest-rated, most trusted casinos selected for high confidence and popularity.</p>
        <div className={styles['casinos-grid']}>
          {normalizedCasinos.slice(0, 10).map((casino) => (
            <div key={casino.name} className={styles['casino-card-wrapper']}>
              <CasinoCard
                name={casino.name}
                rating={casino.rating}
                spins={casino.spins}
                likes={casino.likes}
                website={casino.website}
                affiliateLink={casino.affiliateLink}
                isAffiliate={casino.isAffiliate}
                isPremium={casino.isPremium}
                isExclusive={casino.isExclusive}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Games Section */}
      <section className={styles['games-section']}>
        <h2 className={styles['section-title']}>🎰 Popular Games</h2>
        <div className={styles['games-grid']}>
          <div className={styles['game-card']}>
            <div className={styles['game-image']}>
              <img src="https://picsum.photos/300/200?random=1" alt="Slots" />
            </div>
            <h3>Online Slots</h3>
            <p>Thousands of slot machines with amazing graphics and features</p>
          </div>
          <div className={styles['game-card']}>
            <div className={styles['game-image']}>
              <img src="https://picsum.photos/300/200?random=2" alt="Blackjack" />
            </div>
            <h3>Blackjack</h3>
            <p>Classic card game with multiple variants and betting options</p>
          </div>
          <div className={styles['game-card']}>
            <div className={styles['game-image']}>
              <img src="https://picsum.photos/300/200?random=3" alt="Roulette" />
            </div>
            <h3>Roulette</h3>
            <p>European and American roulette with live dealer options</p>
          </div>
          <div className={styles['game-card']}>
            <div className={styles['game-image']}>
              <img src="https://picsum.photos/300/200?random=4" alt="Poker" />
            </div>
            <h3>Poker</h3>
            <p>Texas Hold&apos;em, Omaha, and other poker variations</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles['why-choose-section']}>
        <h2 className={styles['section-title']}>Why Choose SimoCasino?</h2>
        <div className={styles['features-grid']}>
          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}>🎯</div>
            <h3>Expert Reviews</h3>
            <p>Our team of experts reviews every casino to ensure quality and safety</p>
          </div>
          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}>💰</div>
            <h3>Best Bonuses</h3>
            <p>Find the highest paying bonuses and exclusive promotions</p>
          </div>
          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}>🔒</div>
            <h3>Safe & Secure</h3>
            <p>All casinos are licensed and regulated for your protection</p>
          </div>
          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}>📱</div>
            <h3>Mobile Friendly</h3>
            <p>Play on any device with our mobile-optimized casinos</p>
          </div>
          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}>⚡</div>
            <h3>Fast Payouts</h3>
            <p>Quick withdrawals with multiple payment methods</p>
          </div>
          <div className={styles['feature-card']}>
            <div className={styles['feature-icon']}>🎮</div>
            <h3>Live Support</h3>
            <p>24/7 customer support in multiple languages</p>
          </div>
        </div>
      </section>

      {/* Latest News/Blog Section */}
      <section className={styles['news-section']}>
        <h2 className={styles['section-title']}>📰 Latest Casino News</h2>
        <div className={styles['news-grid']}>
          <div className={styles['news-card']}>
            <div className={styles['news-image']}>
              <img src="https://picsum.photos/400/250?random=5" alt="Casino News" />
            </div>
            <div className={styles['news-content']}>
              <h3>2026 Casino Trends</h3>
              <p>Discover the latest trends shaping the online casino industry this year</p>
              <span className={styles['news-date']}>April 7, 2026</span>
            </div>
          </div>
          <div className={styles['news-card']}>
            <div className={styles['news-image']}>
              <img src="https://picsum.photos/400/250?random=6" alt="Bonus Guide" />
            </div>
            <div className={styles['news-content']}>
              <h3>Best Welcome Bonuses</h3>
              <p>Complete guide to the highest paying casino welcome bonuses</p>
              <span className={styles['news-date']}>April 6, 2026</span>
            </div>
          </div>
          <div className={styles['news-card']}>
            <div className={styles['news-image']}>
              <img src="https://picsum.photos/400/250?random=7" alt="Payment Methods" />
            </div>
            <div className={styles['news-content']}>
              <h3>Crypto Payments Guide</h3>
              <p>How to use Bitcoin and other cryptocurrencies at online casinos</p>
              <span className={styles['news-date']}>April 5, 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles['cta-section']}>
        <h2>{t('cta_title')}</h2>
        <p>{t('cta_description')}</p>
        <button className={styles['cta-button']}>{t('cta_button')}</button>
      </section>
    </>
  );
}
