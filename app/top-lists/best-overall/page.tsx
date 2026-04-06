'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function BestOverallPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1>{t('best_overall_title')}</h1>
          <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
            {t('best_overall_description')}
          </p>
        </div>

        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2>{t('ranking_criteria_title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ textAlign: 'center', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎁</div>
              <h4 style={{ margin: '0 0 8px 0' }}>{t('criteria_bonuses_title')}</h4>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{t('criteria_bonuses_desc')}</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎮</div>
              <h4 style={{ margin: '0 0 8px 0' }}>{t('criteria_games_title')}</h4>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{t('criteria_games_desc')}</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>💳</div>
              <h4 style={{ margin: '0 0 8px 0' }}>{t('criteria_payments_title')}</h4>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{t('criteria_payments_desc')}</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🛡️</div>
              <h4 style={{ margin: '0 0 8px 0' }}>{t('criteria_security_title')}</h4>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{t('criteria_security_desc')}</p>
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3>{t('top_rankings_coming_soon')}</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              {t('top_rankings_coming_soon_desc')}
            </p>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}