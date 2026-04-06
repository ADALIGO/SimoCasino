'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function WelcomeBonusPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('welcome_bonus_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('welcome_bonus_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>{t('welcome_bonus_types_title')}</h2>
          <div style={{ display: 'grid', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
              <h3 style={{ color: '#0ea5e9', margin: '0 0 12px 0' }}>{t('bonus_match_label')}</h3>
              <p style={{ margin: 0, color: '#374151' }}>{t('bonus_match_desc')}</p>
            </div>
            <div style={{ padding: '24px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #22c55e' }}>
              <h3 style={{ color: '#22c55e', margin: '0 0 12px 0' }}>{t('bonus_spins_label')}</h3>
              <p style={{ margin: 0, color: '#374151' }}>{t('bonus_spins_desc')}</p>
            </div>
            <div style={{ padding: '24px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <h3 style={{ color: '#f59e0b', margin: '0 0 12px 0' }}>{t('bonus_package_label')}</h3>
              <p style={{ margin: 0, color: '#374151' }}>{t('bonus_package_desc')}</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>{t('welcome_bonus_terms_title')}</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>{t('bonus_term_wagering')}</li>
            <li>{t('bonus_term_time')}</li>
            <li>{t('bonus_term_games')}</li>
            <li>{t('bonus_term_cashout')}</li>
            <li>{t('bonus_term_deposit')}</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}