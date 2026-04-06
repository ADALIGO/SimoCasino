'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('contact_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('contact_subtitle')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Get In Touch</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            We value your feedback and are here to help. Whether you have questions about casinos,
            need recommendations, or want to report an issue, our team is ready to assist you.
          </p>

          <h2>Contact Methods</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📧</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Email Support</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>support@simocasino.com<br/>24-48 hour response</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💬</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Live Chat</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Available 9 AM - 9 PM GMT<br/>Instant responses</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📝</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Feedback Form</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Detailed inquiries<br/>and suggestions</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📱</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Social Media</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Follow us for updates<br/>and announcements</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Response Times</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>💬 Live Chat - Instant responses during business hours</li>
            <li>📧 Email - 24-48 hours for standard inquiries</li>
            <li>🚨 Urgent Issues - Priority handling for critical matters</li>
            <li>📝 Feedback - Reviewed within 1-2 business days</li>
            <li>🔍 Research Questions - 2-3 business days for detailed responses</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}