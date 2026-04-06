import React from 'react';
import styles from './UserFlag.module.scss';
import { getCountryCode } from './countryUtils';

interface UserFlagProps {
  userCountry?: string | undefined;
  size?: 'small' | 'medium' | 'large';
}

export default function UserFlag({ userCountry, size = 'medium' }: UserFlagProps) {
  const sanitizedCountry = userCountry?.toString().trim();
  if (!sanitizedCountry || sanitizedCountry.toLowerCase() === 'undefined') {
    return null;
  }

  const countryCode = getCountryCode(sanitizedCountry);
  if (!countryCode) {
    return null;
  }

  const flagUrl = `/flags/4x3/${countryCode}.svg`;
  return (
    <img
      src={flagUrl}
      alt={`${sanitizedCountry} flag`}
      width={24}
      height={18}
      className={`${styles.flag} ${styles[size]}`}
      loading="lazy"
      title={`Country: ${sanitizedCountry}`}
    />
  );
}