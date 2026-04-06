'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function ResponsibleGamblingPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1>🛡️ Responsible Gambling</h1>
          <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
            Play responsibly at online casinos. Learn about gambling addiction, self-exclusion, and responsible gaming practices.
          </p>
        </div>

        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2>🎯 What is Responsible Gambling?</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            Responsible gambling means understanding that gambling is a form of entertainment, not a way to make money.
            It involves setting limits, recognizing when gambling becomes a problem, and knowing when to stop.
          </p>

          <h2>💡 Responsible Gaming Tips</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>Set a budget and stick to it</li>
            <li>Take regular breaks from gambling</li>
            <li>Don&apos;t chase losses</li>
            <li>Gambling should be fun, not stressful</li>
            <li>Use self-exclusion tools if needed</li>
            <li>Never gamble with money needed for essentials</li>
          </ul>

          <h2>🚨 Signs of Problem Gambling</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>Gambling more than you can afford</li>
            <li>Thinking about gambling constantly</li>
            <li>Chasing losses to win back money</li>
            <li>Lying about gambling activities</li>
            <li>Neglecting responsibilities due to gambling</li>
            <li>Feeling anxious or depressed about gambling</li>
          </ul>

          <h2>{t('help_support_title')}</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            {t('help_support_desc')}
          </p>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li><strong>{t('help_gamblers_anon')}</strong> gamblersanonymous.org</li>
            <li><strong>{t('help_ncpg')}</strong> ncpgambling.org</li>
            <li><strong>{t('help_begambleaware')}</strong> begambleaware.org</li>
            <li><strong>{t('help_local')}</strong></li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}