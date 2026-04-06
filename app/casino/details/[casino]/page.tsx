import { Metadata } from 'next';
import Link from 'next/link';
import { casinosData } from '@/casinos_data';
import styles from './casino-details.module.scss';

interface CasinoParams {
  casino: string;
}

export async function generateStaticParams() {
  return casinosData.map((casino) => ({
    casino: casino.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<CasinoParams> }): Promise<Metadata> {
  const { casino: casinoSlug } = await params;
  const casino = casinosData.find((item) => item.slug === casinoSlug);

  if (!casino) {
    return {
      title: 'Casino not found | Simocasino',
      description: 'No casino found',
    };
  }

  return {
    title: `${casino.name} | Simocasino Casino Details`,
    description: `Review for ${casino.name} - bonus ${casino.bonus}, rating ${casino.rating}`,
    openGraph: {
      title: `${casino.name} | Simocasino Casino Details`,
      description: `Review for ${casino.name} - bonus ${casino.bonus}`,
      type: 'website',
      url: `https://simocasino.com/casino/details/${casino.slug}`,
    },
  };
}

export default async function CasinoDetailPage({ params }: { params: Promise<CasinoParams> }) {
  const { casino: slug } = await params;
  const casino = casinosData.find((item) => item.slug === slug);

  if (!casino) {
    return (
      <div className={styles['casino-not-found']}>
        <h1>Casino Not Found</h1>
        <p>We could not find casino <strong>{slug}</strong>. Try another casino</p>
        <Link href="/">Go back home</Link>
      </div>
    );
  }

  return (
    <div className={styles['casino-details-page']}>
      <Link className={styles.back} href="/">← Back to Home</Link>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1>{casino.name}</h1>
          <span className={styles.rating}>{casino.rating.toFixed(1)} ⭐</span>
        </div>

        <div className={styles.meta}>
          <p><strong>Country:</strong> {casino.country}</p>
          <p><strong>Bonus:</strong> {casino.bonus}</p>
          <p><strong>Description:</strong> {casino.description || 'No description available'}</p>
          <p><strong>Min Deposit:</strong> {casino.minDeposit ?? 'N/A'} | <strong>Min Withdrawal:</strong> {casino.minWithdrawal ?? 'N/A'}</p>
          <p><strong>Withdrawal Limit:</strong> {casino.withdrawalLimit ?? 'N/A'} | <strong>Withdrawal Time:</strong> {casino.withdrawalTime ?? 'N/A'}</p>
          <p><strong>Currencies:</strong> {casino.currencies?.join(', ') || 'N/A'}</p>
          <p><strong>VIP Levels:</strong> {casino.vipLevels ?? 'N/A'} | <strong>Live Casino:</strong> {casino.liveCasinoAvailable ? 'Yes' : 'No'}</p>
          <p><strong>Support:</strong> {casino.supportEmail ?? 'N/A'} / {casino.supportPhone ?? 'N/A'}</p>
          <p><strong>Likes:</strong> {casino.likes ?? 0} | <strong>Comments:</strong> {casino.comments ?? 0}</p>
        </div>

        <div className={styles.providers}>
          <h2>Providers</h2>
          <ul>
            {casino.providers.map((provider) => (
              <li key={`${casino.slug}-${provider}`}>{provider}</li>
            ))}
          </ul>
        </div>

        <div className={styles.operating}>
          <h2>Operating Countries</h2>
          <p>{casino.operatingCountries.join(', ')}</p>
        </div>

        <div className={styles.footer}>
          <Link href={`/casino/${casino.country.toLowerCase().replace(/\s+/g, '-')}`}>
            See all casinos for {casino.country}
          </Link>
        </div>
      </div>
    </div>
  );
}
