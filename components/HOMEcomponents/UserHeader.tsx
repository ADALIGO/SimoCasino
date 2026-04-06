'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { preserveLocalePath } from '@/lib/locale';
import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { logout, toggleSidebar, toggleRightSidebar, setSidebarOpen, setRightSidebarOpen, setUser } from '@/store/store';
import { RootState } from '@/store/store';
import UserHeaderProgressCompact from '@/components/UserHeaderProgressCompact';
import LanguageSelector from '@/components/LanguageSelector';
import { submitRewardAction, USER_VISIT_HOMEPAGE_KEY } from '@/lib/rewardActions';
import styles from './UserHeader.module.scss';

interface UserHeaderProps {
  className?: string;
}

const UserHeaderMemo = memo(function UserHeader({ className }: UserHeaderProps = {}) {
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
  const [isMobileHeader, setIsMobileHeader] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 516px)');
    const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobileHeader(event.matches);
    };

    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    const runRegisteredReward = async () => {
      if (!isAuthenticated || !isHydrated || !user?.id) return;

      try {
        const storageKey = `${USER_VISIT_HOMEPAGE_KEY}_${user.id}`;
        if (sessionStorage.getItem(storageKey) === '1') return;

        const result = await submitRewardAction(user.id, 'visit_homepage');
        if (result?.user) {
          dispatch(
            setUser({
              id: result.user.id,
              email: result.user.email,
              name: result.user.firstName || result.user.name || 'Player',
              userCountry: result.user.lastCountry || result.user.userCountry,
              totalPoints: result.user.totalPoints ?? user.totalPoints,
              coins: result.user.coins ?? user.coins,
              lastLoginAt: result.user.lastLoginAt ?? user.lastLoginAt,
              lastDailyLoginAt: result.user.lastDailyLoginAt ?? user.lastDailyLoginAt,
            })
          );
        }

        sessionStorage.setItem(storageKey, '1');
      } catch (error) {
        console.error('Registered reward action error:', error);
      }
    };

    runRegisteredReward();
  }, [dispatch, isAuthenticated, isHydrated, user?.id]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(setSidebarOpen(false));
    dispatch(setRightSidebarOpen(false));
    router.push(preserveLocalePath(pathname, '/'));
  }, [dispatch, pathname, router]);

  const displayName = useMemo(
    () => user?.name || `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || user?.email?.split('@')[0] || 'Player',
    [user?.name, user?.firstName, user?.lastName, user?.email]
  );
  const avatarInitial = useMemo(() => displayName.charAt(0).toUpperCase(), [displayName]);
  const showUserMenu = useMemo(() => hasMounted && isAuthenticated && user, [hasMounted, isAuthenticated, user]);

  const handleToggleSidebar = useCallback(() => dispatch(toggleSidebar()), [dispatch]);
  const handleToggleRightSidebar = useCallback(() => dispatch(toggleRightSidebar()), [dispatch]);

  const userMenuContent = showUserMenu ? (
    <>
      <button
        className={styles['user-profile']}
        onClick={handleToggleRightSidebar}
        type="button"
      >
        <span className={styles['welcome-back-text']}>{t('welcome_back')}</span>
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={displayName}
            width={40}
            height={40}
            className={styles['user-avatar']}
            loading="lazy"
          />
        ) : (
          <span className={styles['user-avatar']}>{avatarInitial}</span>
        )}
        <span className={styles['user-name']}>{displayName}</span>
      </button>
      <LanguageSelector />
      <button
        className={`${styles.btn} ${styles.login} ${styles['logout-btn']}`}
        onClick={handleLogout}
      >
        {t('logout')}
      </button>
    </>
  ) : (
    <div className={styles['user-menu-placeholder']} suppressHydrationWarning />
  );

  return (
    <header className={`${styles.header} ${className || ''}`.trim()}>
      
      <button className={styles['sidebar-toggle']} onClick={handleToggleSidebar}>
        ☰
      </button> 
     

    

      {!isMobileHeader && (
        <nav className={styles.nav}>
          <Link href={preserveLocalePath(pathname, '/')} >{t('home')}</Link>
          <Link href={preserveLocalePath(pathname, '/blog')} >{t('blog')}</Link>
          <Link href={preserveLocalePath(pathname, '/guides')} >{t('guides')}</Link>
          <a href="#casinos">{t('best_casinos')}</a>
        </nav>
      )}

    

      <div className={styles['user-menu']}>
       
        <div className={styles['progress-wrapper']}>
          <UserHeaderProgressCompact
            totalPoints={user?.totalPoints ?? 1250}
            coins={user?.coins ?? 3910}
            minimal={isMobileHeader}
          />
        </div>


     

        {userMenuContent}
      </div>
    </header>
  );
});

export default UserHeaderMemo;
