'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { preserveLocalePath } from '@/lib/locale';
import styles from './HOMEfooter.module.scss';
import logo from '@/SIMOCASINOphoto/logo/simocasinologo1.png';
import gambleAwareLogo from '@/SIMOCASINOphoto/logo/ORGAlogos/GAMBLEAWARE.jpg';
import beGambleAwareLogo from '@/SIMOCASINOphoto/logo/ORGAlogos/BEGAMBLEAWAR.png';
import gameCareLogo from '@/SIMOCASINOphoto/logo/ORGAlogos/gamecare.png';
import gaLogo from '@/SIMOCASINOphoto/logo/ORGAlogos/GA.png';
import egbaLogo from '@/SIMOCASINOphoto/logo/ORGAlogos/EGBA.png';
import icrgLogo from '@/SIMOCASINOphoto/logo/ORGAlogos/ICRG.jpeg';

interface HOMEfooterProps {
  className?: string;
}

export default function HOMEfooter({ className }: HOMEfooterProps = {}) {
  const pathname = usePathname() || '/';
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${className || ''}`.trim()}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-grid']}>
          <div className={styles['footer-section']}>
            <h4>{t('about_simocasino')}</h4>
            <ul>
              <li><Link href="#about">{t('about_us')}</Link></li>
              <li><Link href="#team">{t('our_team')}</Link></li>
              <li><Link href="#careers">{t('careers')}</Link></li>
              <li><Link href="#press">{t('press')}</Link></li>
            </ul>
          </div>

          <div className={styles['footer-section']}>
            <h4>{t('resources')}</h4>
            <ul>
              <li><Link href={preserveLocalePath(pathname, '/guides')}>{t('guides')}</Link></li>
              <li><Link href={preserveLocalePath(pathname, '/blog')}>{t('blog')}</Link></li>
              <li><Link href="#faq">{t('faq')}</Link></li>
              <li><Link href="#glossary">{t('glossary')}</Link></li>
            </ul>
          </div>

          <div className={styles['footer-section']}>
            <h4>{t('support')}</h4>
            <ul>
              <li><Link href="#contact">{t('contact_us')}</Link></li>
              <li><Link href="#support">{t('support_center')}</Link></li>
              <li><Link href="#status">{t('status_page')}</Link></li>
              <li><Link href="#privacy">{t('privacy_policy')}</Link></li>
            </ul>
          </div>

     
          <div className={styles['footer-section']}>
            <h4>{t('connect')}</h4>
            <div className={styles['social-links']}>
              <a href="https://x.com" title="Twitter" target="_blank" rel="noopener noreferrer">𝕏</a>
              <a href="https://facebook.com" title="Facebook" target="_blank" rel="noopener noreferrer">f</a>
              <a href="https://instagram.com" title="Instagram" target="_blank" rel="noopener noreferrer">📷</a>
              <a href="https://linkedin.com" title="LinkedIn" target="_blank" rel="noopener noreferrer">in</a>
            </div>
          </div>
        </div>

        <div className={styles['footer-bottom']}>
          <p>
            &copy; {currentYear} <span className={styles['footer-logo']}><Image src={logo} alt="Simocasino" width={72} height={24} style={{ width: 'auto', height: 'auto' }} priority /></span> {t('all_rights_reserved')} | {t('responsible_gambling')}
          </p>
          <p>
            <Link href="#terms">{t('terms_of_service')}</Link> •
            <Link href="#privacy"> {t('privacy_policy')}</Link> •
            <Link href="#cookies"> {t('cookie_policy')}</Link>
          </p>
        </div>

        <div className={styles['footer-extra']}>
          <h4>{t('responsible_gambling')}</h4>
          <div className={styles['footer-logos']}>
            {[
              { src: gambleAwareLogo, alt: 'GambleAware', href: 'https://www.gambleaware.org/' },
              { src: beGambleAwareLogo, alt: 'BeGambleAware', href: 'https://www.gambleaware.org/' },
              { src: gameCareLogo, alt: 'GamCare International', href: 'https://www.gamcare.org.uk/' },
              { src: gaLogo, alt: 'Gamblers Anonymous', href: 'https://gamblersanonymous.org/' },
              { src: egbaLogo, alt: 'European Gaming and Betting Association', href: 'https://www.egba.eu/' },
              { src: icrgLogo, alt: 'International Center for Responsible Gaming', href: 'https://www.ncpgambling.org/' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['footer-logo-item']}
                title={item.alt}
                aria-label={item.alt}
              >
                <Image src={item.src} alt={item.alt} width={50} height={50} />
              </a>
            ))}
          </div>
          <p>{t('gambling_can_be_addictive')}</p>
          <p>{t('external_links_notice')}</p>
        </div>
      </div>
    </footer>
  );
}
