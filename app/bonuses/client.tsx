'use client';

import { useFetch } from '@/hooks/useFetch';
import styles from './bonuses.module.scss';

interface BonusCard {
  casinoId: string;
  casinoName: string;
  bonus: string;
}

export default function BonusesClient() {
  const { data, loading, error } = useFetch<BonusCard[]>('/api/bonuses');

  return (
    <div className={styles['bonuses-page']}>
      <section className={styles['hero']}>
        <h1>🎁 Best Casino Bonuses</h1>
        <p>Find the highest value bonus offers from top casinos.</p>
      </section>

      {loading && <p className={styles['status']}>Loading offers...</p>}
      {error && <p className={`${styles['status']} ${styles['error']}`}>Unable to load bonus offers. Please try later.</p>}

      {data && data.length > 0 && (
        <div className={styles['bonuses-grid']}>
          {data.map((item, index) => (
            <article key={`${item.casinoId}-${index}`} className={styles['bonus-card']}>
              <h3>{item.casinoName}</h3>
              <p>{item.bonus}</p>
            </article>
          ))}
        </div>
      )}

      {!loading && data && data.length === 0 && <p className={styles['status']}>No bonus offers available at the moment.</p>}
    </div>
  );
}
