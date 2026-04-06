'use client';

import { ReactNode, useEffect, useState, CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import HOMESleftsidebare from '@/components/HOMEcomponents/HOMESleftsidebare';
import UserRightSidebar from '@/components/HOMEcomponents/UserRightSidebar';
import HOMEcontent from '@/components/HOMEcomponents/HOMEcontent';
import HOMEfooter from '@/components/HOMEcomponents/HOMEfooter';
import TopLoadingBar from '@/components/TopLoadingBar';
import { RootState, setShowTopLoadingBar, setSidebarOpen, setRightSidebarOpen } from '@/store/store';
import styles from './HOMELayouts.module.scss';

import UserHeader from '@/components/HOMEcomponents/UserHeader';
import HOMEheader from '@/components/HOMEcomponents/HOMEheader';

interface HOMELayoutsProps {
  children: ReactNode;
  backgroundColor?: string;
  isUserPage?: boolean;
}

export default function HOMELayouts({ children, backgroundColor, isUserPage }: HOMELayoutsProps) {
  const pathname = usePathname();
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);
  const rightSidebarOpen = useSelector((state: RootState) => state.ui.rightSidebarOpen);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSidebarState = localStorage.getItem('sidebarOpen');
      if (savedSidebarState !== null) {
        dispatch(setSidebarOpen(JSON.parse(savedSidebarState)));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user && rightSidebarOpen) {
      dispatch(setRightSidebarOpen(false));
    }
  }, [user, rightSidebarOpen, dispatch]);

  useEffect(() => {
    if (!isAuthenticated && rightSidebarOpen) {
      dispatch(setRightSidebarOpen(false));
    }
  }, [isAuthenticated, rightSidebarOpen, dispatch]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
    }
  }, [sidebarOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    dispatch(setShowTopLoadingBar(true));
    const timeoutId = setTimeout(() => {
      dispatch(setShowTopLoadingBar(false));
    }, 650);

    return () => {
      clearTimeout(timeoutId);
      dispatch(setShowTopLoadingBar(false));
    };
  }, [pathname, dispatch]);

  const isAuthPage =
    pathname?.includes('/auth/login') || pathname?.includes('/auth/register');

  useEffect(() => {
    if (isAuthPage) {
      dispatch(setSidebarOpen(false));
    }
  }, [isAuthPage, dispatch]);

  const isUserRoute = isUserPage ?? pathname?.includes('/user/') ?? false;
  const showUserHeader = isUserRoute || (isHydrated && isAuthenticated);
  const Header = showUserHeader ? UserHeader : HOMEheader;

  return (
    <div className={styles['layout-wrapper']} style={{ '--page-background': backgroundColor } as CSSProperties}>
      <TopLoadingBar />
      <Header />
      <div
        className={`${styles['main-content']} ${sidebarOpen ? styles['sidebar-open'] : ''} ${rightSidebarOpen ? styles['right-sidebar-open'] : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => {
          if (sidebarOpen || rightSidebarOpen) {
            if (sidebarOpen) dispatch(setSidebarOpen(false));
            if (rightSidebarOpen) dispatch(setRightSidebarOpen(false));
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (sidebarOpen || rightSidebarOpen) {
              if (sidebarOpen) dispatch(setSidebarOpen(false));
              if (rightSidebarOpen) dispatch(setRightSidebarOpen(false));
            }
          }
        }}
      >
        <HOMESleftsidebare />
        <HOMEcontent>{children}</HOMEcontent>
        {!isAuthPage && <UserRightSidebar />}
      </div>
      <HOMEfooter />
    </div>
  );
}
