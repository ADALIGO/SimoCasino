'use client';

import { useDeferredGuestCountry } from '@/hooks/useDeferredGuestCountry';
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
    country: string;
    bonus: string;
    rating: number;
    slug?: string;
    spins?: number;
    providers?: string[];
    likes?: number;
    comments?: number;
    operatingCountries?: string[];
    imageUrl?: string;
    avatarUrl?: string;
    imageGallery?: string[];
  }>;
}

export default function HomeClient({ featuredBonuses, featuredCasinos }: HomeClientProps) {
  const { t } = useTranslation();
  const guestCountry = useDeferredGuestCountry();

  // If a property is missing (like slug/spins), provide defaults so the card is full.
  const normalizedCasinos = featuredCasinos.map((casino) => ({
    slug:
      casino.slug ||
      `${casino.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${casino.country
        .toLowerCase()
        .replace(/\s+/g, '-')}`,
    spins: casino.spins ?? 50,
    providers: casino.providers ?? ['Playtech'],
    likes: casino.likes ?? 0,
    comments: casino.comments ?? 0,
    operatingCountries:
      casino.operatingCountries ?? [casino.country, 'United States', 'United Kingdom'],
    ...casino,
  }));

  // Group casinos by country
  const casinosByCountry = normalizedCasinos.reduce((acc, casino) => {
    if (!acc[casino.country]) {
      acc[casino.country] = [];
    }
    acc[casino.country]!.push(casino);
    return acc;
  }, {} as Record<string, typeof normalizedCasinos>);

  return (
    <>
      <section className={styles['hero-section']}>
        <video
          className={styles['hero-video-bg']}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/SIMOCASINOphoto/video/sectionvideo.mp4" type="video/mp4" />
        </video>
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

      {Object.entries(casinosByCountry).map(([country, casinos]) => (
        <section key={country} className={styles['casinos-section']}>
          <h2 className={styles['section-title']}>{t('top_casinos_in', { country })}</h2>
          <div className={styles['casinos-grid']}>
            {casinos.map((casino) => (
              <div key={casino.name} className={styles['casino-card-wrapper']}>
                <CasinoCard
                  name={casino.name}
                  country={casino.country}
                  bonus={casino.bonus}
                  rating={casino.rating}
                  slug={casino.slug}
                  spins={casino.spins}
                  providers={casino.providers}
                  likes={casino.likes}
                  operatingCountries={casino.operatingCountries}
                  {...(casino.imageUrl && { imageUrl: casino.imageUrl })}
                  {...(casino.avatarUrl && { avatarUrl: casino.avatarUrl })}
                  {...(casino.imageGallery && { imageGallery: casino.imageGallery })}
                  guestCountry={guestCountry}
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className={styles['cta-section']}>
        <h2>{t('cta_title')}</h2>
        <p>{t('cta_description')}</p>
        <button className={styles['cta-button']}>{t('cta_button')}</button>
      </section>
    </>
  );
}
