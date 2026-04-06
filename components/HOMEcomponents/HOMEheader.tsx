'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { preserveLocalePath } from '@/lib/locale';
import { useState, useEffect } from 'react';
import { logout, toggleSidebar, setSidebarOpen, setRightSidebarOpen } from '@/store/store';
import { RootState } from '@/store/store';
import UserProgressHeaderCompact from '@/components/UserProgressHeaderCompact';
import LanguageSelector from '@/components/LanguageSelector';
import {
  createGuestUser,
  submitRewardAction,
  GUEST_USER_STORAGE_KEY,
  GUEST_VISIT_HOMEPAGE_KEY,
} from '@/lib/rewardActions';
import styles from './HOMEheader.module.scss';

const GUEST_LABEL_STORAGE_KEY = 'simocasino_guest_label';
const GUEST_LABEL_COUNTER_KEY = 'simocasino_guest_counter';

function getBrowserName() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  if (/Brave\//i.test(ua)) return 'brave';
  if (/OPR\/|Opera/i.test(ua)) return 'opera';
  if (/Edg\//i.test(ua)) return 'edge';
  if (/Chrome\//i.test(ua)) return 'chrome';
  if (/Firefox\//i.test(ua)) return 'firefox';
  if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return 'safari';
  return 'guest';
}

function generateGuestLabel() {
  const browserTag = getBrowserName();
  const storedCounter = typeof localStorage !== 'undefined'
    ? Number(localStorage.getItem(GUEST_LABEL_COUNTER_KEY) ?? '0')
    : 0;
  const nextCounter = storedCounter + 1;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(GUEST_LABEL_COUNTER_KEY, String(nextCounter));
  }
  return `guest_sc_${browserTag}_${nextCounter}`;
}

interface HOMEheaderProps {
  className?: string;
}

export default function HOMEheader({ className }: HOMEheaderProps = {}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname() || '/';
  const { t } = useTranslation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [guestLabel, setGuestLabel] = useState('Guest_****');

  useEffect(() => {
    setIsHydrated(true);
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated && isHydrated) {
      const storedGuestLabel = localStorage.getItem(GUEST_LABEL_STORAGE_KEY);
      if (storedGuestLabel) {
        setGuestLabel(storedGuestLabel);
      } else {
        const newLabel = generateGuestLabel();
        localStorage.setItem(GUEST_LABEL_STORAGE_KEY, newLabel);
        setGuestLabel(newLabel);
      }
    }
  }, [isAuthenticated, isHydrated]);

  useEffect(() => {
    const runGuestActions = async () => {
      if (isAuthenticated || !isHydrated) return;

      try {
        let guestId = localStorage.getItem(GUEST_USER_STORAGE_KEY);
        let label = localStorage.getItem(GUEST_LABEL_STORAGE_KEY);
        if (!label) {
          label = generateGuestLabel();
          localStorage.setItem(GUEST_LABEL_STORAGE_KEY, label);
          setGuestLabel(label);
        }

        if (!guestId) {
          const result = await createGuestUser(undefined, label);
          guestId = result?.user?.id;
          if (guestId) {
            localStorage.setItem(GUEST_USER_STORAGE_KEY, guestId);
          }
        }

        if (!guestId) return;

        const alreadyAwarded = sessionStorage.getItem(GUEST_VISIT_HOMEPAGE_KEY) === '1';
        if (!alreadyAwarded) {
          await submitRewardAction(guestId, 'visit_homepage');
          sessionStorage.setItem(GUEST_VISIT_HOMEPAGE_KEY, '1');
        }
      } catch (error) {
        console.error('Guest reward action error:', error);
      }
    };

    runGuestActions();
  }, [isAuthenticated, isHydrated]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setSidebarOpen(false));
    dispatch(setRightSidebarOpen(false));
    router.push(preserveLocalePath(pathname, '/'));
  };

  const showUserMenu = hasMounted && isAuthenticated && user;
  const totalPoints = hasMounted ? user?.totalPoints ?? 10 : 10;
  const coins = hasMounted ? user?.coins ?? 100 : 100;

  return (
    <header className={`${styles.header} ${className || ''}`.trim()}>
 

      <button className={styles['sidebar-toggle']} onClick={() => dispatch(toggleSidebar())}>
        ☰
      </button>

      <nav className={styles.nav}>
        <Link href={preserveLocalePath(pathname, '/')} >{t('home')}</Link>
        <Link href={preserveLocalePath(pathname, '/blog')} >{t('blog')}</Link>
        <Link href={preserveLocalePath(pathname, '/guides')} >{t('guides')}</Link>
        <a href="#casinos">{t('best_casinos')}</a>
      </nav>

      <UserProgressHeaderCompact
        totalPoints={totalPoints}
        coins={coins}
      />

      <div className={styles['user-menu']}>
        <LanguageSelector />

        {showUserMenu ? (
          <>
            <span>{user.name}</span>
            <button
              className={`${styles.btn} ${styles.login}`}
              onClick={handleLogout}
            >
              {t('logout')}
            </button>
          </>
        ) : (
          <>
            <button type="button" className={`${styles.btn} ${styles.login}`} disabled suppressHydrationWarning>
              {t('header_welcome_guest', { guestLabel })}
            </button>
            <Link href={preserveLocalePath(pathname, '/auth/login')}>
              <button className={`${styles.btn} ${styles.login}`}>{t('login')}</button>
            </Link>
            <Link href={preserveLocalePath(pathname, '/auth/register')}>
              <button className={`${styles.btn} ${styles.signup}`}>
                {t('register')}
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
