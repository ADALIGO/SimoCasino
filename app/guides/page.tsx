'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import HOMELayouts from '@/app/layouts/HOMELayouts';
import styles from './page.module.scss';

export default function GuidesIndexPage() {
  const { t } = useTranslation();
  
  const guides = [
    {
      slug: 'how-to-play-slots',
      titleKey: 'guide_slots_title',
      excerptKey: 'guide_slots_excerpt',
      difficulty: 'Beginner',
    },
    {
      slug: 'casino-bonuses-explained',
      titleKey: 'guide_bonuses_title',
      excerptKey: 'guide_bonuses_excerpt',
      difficulty: 'Beginner',
    },
    {
      slug: 'responsible-gambling',
      titleKey: 'guide_responsible_title',
      excerptKey: 'guide_responsible_excerpt',
      difficulty: 'Intermediate',
    },
    {
      slug: 'blackjack-strategy',
      titleKey: 'guide_blackjack_title',
      excerptKey: 'guide_blackjack_excerpt',
      difficulty: 'Intermediate',
    },
  ];

  return (
    <HOMELayouts>
      <div className={styles['guides-index']}>
        <h1 className={styles['page-title']}>{t('guides_page_title')}</h1>
        <p className={styles['page-subtitle']}>
          {t('guides_page_subtitle')}
        </p>

        <div className={styles['guides-grid']}>
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`}>
              <article className={styles['guide-card']}>
                <div className={styles['difficulty']}>
                  <span className={styles[guide.difficulty.toLowerCase()]}>
                    {t(`difficulty_${guide.difficulty.toLowerCase()}`)}
                  </span>
                </div>
                <h2 className={styles['guide-title']}>{t(guide.titleKey)}</h2>
                <p className={styles['excerpt']}>{t(guide.excerptKey)}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </HOMELayouts>
  );
}
