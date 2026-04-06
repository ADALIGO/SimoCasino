'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { countryToCode } from '@/components/countryUtils';
import styles from './countries.module.scss';

interface CountryData {
  name: string;
  code: string;
  count: number;
  path: string;
}

export default function CountriesClient() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [displayedCountries, setDisplayedCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Lazy load casinos data
    import('@/casinos_data.json').then((module) => {
      const casinosData = module.default;
      // Count casinos per country
      const countryCounts: { [key: string]: number } = {};
      casinosData.forEach((casino: any) => {
        const country = casino.country;
        countryCounts[country] = (countryCounts[country] || 0) + 1;
      });

      // Create country data
      const countryList: CountryData[] = Object.keys(countryCounts).map(country => ({
        name: country,
        code: countryToCode[country] || 'unknown',
        count: countryCounts[country] || 0,
        path: `/casino/${country.toLowerCase().replace(/\s+/g, '-')}`
      }));

      // Sort by count descending
      countryList.sort((a, b) => b.count - a.count);

      setCountries(countryList);
      setDisplayedCountries(countryList.slice(0, 8));
      setHasMore(countryList.length > 8);
    });
  }, []);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const currentLength = displayedCountries.length;
      const nextBatch = countries.slice(currentLength, currentLength + 8);
      setDisplayedCountries(prev => [...prev, ...nextBatch]);
      setHasMore(currentLength + nextBatch.length < countries.length);
      setLoading(false);
    }, 1000); // Simulate loading
  };

  return (
    <div className={styles['countries-page']}>
      <div className={styles.hero}>
        <h1>🌍 All Countries</h1>
        <p>
          Browse online casinos by country. Find the best casinos for your location with local bonuses and payment methods.
        </p>
      </div>

      <div className={styles['countries-grid']}>
        {displayedCountries.map((country) => (
          <Link key={country.path} href={country.path} style={{ textDecoration: 'none' }}>
            <div className={styles['country-card']}>
              <div className={styles['flag-container']}>
                <Image
                  src={`/flags/4x3/${country.code}.svg`}
                  alt={`${country.name} flag`}
                  width={64}
                  height={48}
                  className={styles['flag-image']}
                  loading="lazy"
                />
              </div>
              <h3 className={styles['country-name']}>{country.name}</h3>
              <p className={styles['country-count']}>
                {country.count} casino{country.count !== 1 ? 's' : ''}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className={styles['load-more-container']}>
          <button
            onClick={loadMore}
            disabled={loading}
            className={styles['load-more-btn']}
          >
            {loading && <div className={styles.spinner}></div>}
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}