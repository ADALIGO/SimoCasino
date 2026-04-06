'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function FreeSpinsPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('free_spins_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('free_spins_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>{t('free_spins_opportunities_title')}</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <li>{t('free_spins_no_deposit')}</li>
            <li>{t('free_spins_bonus')}</li>
            <li>{t('free_spins_daily')}</li>
            <li>{t('free_spins_vip')}</li>
            <li>{t('free_spins_tournament')}</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}