'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function NoDepositBonusPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('no_deposit_bonus_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('no_deposit_bonus_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>{t('no_deposit_what_title')}</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
            {t('no_deposit_what_desc')}
          </p>
          <h2>{t('no_deposit_types_title')}</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <li>{t('no_deposit_cash')}</li>
            <li>{t('no_deposit_spins')}</li>
            <li>{t('no_deposit_freeplay')}</li>
            <li>{t('no_deposit_tournament')}</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}