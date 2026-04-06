'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';
import styles from './AffiliatePage.module.scss';

export default function AffiliateHomePage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div className={styles.affiliateContainer}>
        <h1>{t('affiliate_dashboard_title')}</h1>
        <p>{t('affiliate_dashboard_description')}</p>
      </div>
    </HOMELayouts>
  );
}
