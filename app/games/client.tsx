'use client';

import { useFetch } from '@/hooks/useFetch';
import styles from './games.module.scss';

interface Game {
  id: string;
  name: string;
  type: string;
  provider: string;
  rating: number;
  casino: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function GamesClient() {
  const { data: games, loading, error } = useFetch<Game[]>('/api/games');

  return (
    <div className={styles['games-page']}>
      <section className={styles['hero']}>
        <h1>🎮 Casino Games</h1>
        <p>Discover top slots, live dealer, table games and video poker picks.</p>
      </section>

      {loading && <div className={styles['status']}>Loading top games...</div>}
      {error && <div className={`${styles['status']} ${styles['error']}`}>Unable to load games. Try again later.</div>}

      {games && games.length > 0 && (
        <section className={styles['games-grid']}>
          {games.map((game) => (
            <article key={game.id} className={styles['game-card']}>
              <h3>{game.name}</h3>
              <p><strong>Type:</strong> {game.type}</p>
              <p><strong>Provider:</strong> {game.provider}</p>
              <p><strong>Rating:</strong> {game.rating?.toFixed(1) ?? 'N/A'}</p>
              <p><strong>Casino:</strong> {game.casino?.name ?? 'Unknown'}</p>
            </article>
          ))}
        </section>
      )}

      {!loading && games && games.length === 0 && <div className={styles['status']}>No games available right now.</div>}
    </div>
  );
}
