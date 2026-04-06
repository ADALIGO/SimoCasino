'use client';

import Link from 'next/link';
import React, { useState, useEffect, useCallback, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { preserveLocalePath } from '@/lib/locale';
import { RootState, setSidebarOpen, setRightSidebarOpen, logout } from '@/store/store';
import {
  Home,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  DollarSign,
  Link as LinkIcon,
  TrendingUp,
  CreditCard,
  Activity,
  Bell,
  MessageCircle,
  Gift,
  Star,
  Heart,
  ClipboardList,
  Info,
} from 'lucide-react';
import styles from './UserRightSidebar.module.scss';

interface MenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface MenuSection {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
  expandable?: boolean;
}

const SidebarMenuItem = memo(({ item, pathname, onItemSelect }: { item: MenuItem; pathname: string; onItemSelect?: () => void }) => {
  const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
    if (onItemSelect) {
      onItemSelect();
    }
  };

  return (
    <li
      className={`${styles['menu-item']} ${pathname === item.href ? styles.active : ''}`}
    >
      <Link
        href={item.href}
        className={styles['menu-link']}
        scroll={false}
        onClick={handleLinkClick}
      >
        {item.icon && <span className={styles['menu-icon']}>{item.icon}</span>}
        {item.label}
      </Link>
    </li>
  );
});

SidebarMenuItem.displayName = 'SidebarMenuItem';

const SidebarSection = memo(({ 
  section, 
  isExpanded, 
  onToggle, 
  pathname,
  onItemSelect
}: { 
  section: MenuSection; 
  isExpanded: boolean; 
  // eslint-disable-next-line no-unused-vars
  onToggle: (_title: string) => void; 
  pathname: string;
  onItemSelect?: () => void;
}) => (
  <div className={styles['sidebar-section']}>
    <div
      className={styles['section-header']}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        section.expandable && onToggle(section.title);
      }}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && section.expandable) {
          e.preventDefault();
          onToggle(section.title);
        }
      }}
    >
      <h3 className={styles['section-title']}>
        <span className={styles['section-icon']}>{section.icon}</span>
        {section.title}
      </h3>
      {section.expandable && (
        <span className={styles['expand-icon']}>
          {isExpanded ? '▾' : '▸'}
        </span>
      )}
    </div>
    <ul
      className={`${styles['menu-list']} ${
        section.expandable && !isExpanded ? styles.collapsed : ''
      }`}
    >
      {section.items.map((item) => (
        <SidebarMenuItem
          key={item.href}
          item={item}
          pathname={pathname}
          {...(onItemSelect ? { onItemSelect } : {})}
        />
      ))}
    </ul>
  </div>
));

SidebarSection.displayName = 'SidebarSection';

export default function UserRightSidebar() {
  const dispatch = useDispatch();
  const rightSidebarOpen = useSelector((state: RootState) => state.ui.rightSidebarOpen);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  // Build user menu sections with translations
  const USER_MENU_SECTIONS: MenuSection[] = [
    {
      title: t('user_account'),
      icon: <User size={14} />,
      items: [
        { label: t('user_dashboard'), href: '/user/dashboard', icon: <Home size={16} /> },
        { label: t('user_edit_profile'), href: '/user/profile', icon: <User size={16} /> },
        { label: t('user_settings'), href: '/user/settings', icon: <Settings size={16} /> },
        { label: t('user_security'), href: '/user/security', icon: <ShieldCheck size={16} /> },
        { label: t('user_notifications'), href: '/user/notifications', icon: <Bell size={16} /> },
      ],
    },
    {
      title: t('user_activity'),
      icon: <Activity size={14} />,
      expandable: true,
      items: [
        { label: t('user_reward_center'), href: '/user/rewards', icon: <Gift size={16} /> },
        { label: t('user_bonus_history'), href: '/user/bonuses', icon: <Heart size={16} /> },
        { label: t('user_play_history'), href: '/user/history', icon: <ClipboardList size={16} /> },
        { label: t('user_reviews'), href: '/user/reviews', icon: <Star size={16} /> },
        { label: t('user_favorites'), href: '/user/favorites', icon: <Heart size={16} /> },
      ],
    },
    {
      title: t('user_affiliate'),
      icon: <DollarSign size={14} />,
      expandable: true,
      items: [
        { label: t('user_affiliate_dashboard'), href: '/affiliate', icon: <TrendingUp size={16} /> },
        { label: t('user_affiliate_links'), href: '/affiliate/links', icon: <LinkIcon size={16} /> },
        { label: t('user_payout_settings'), href: '/affiliate/payouts', icon: <CreditCard size={16} /> },
        { label: t('user_marketing_tools'), href: '/affiliate/tools', icon: <TrendingUp size={16} /> },
        { label: t('user_reports'), href: '/affiliate/reports', icon: <Star size={16} /> },
        { label: t('user_referrals'), href: '/affiliate/referrals', icon: <User size={16} /> },
      ],
    },
    {
      title: t('user_support'),
      icon: <MessageCircle size={14} />,
      expandable: true,
      items: [
        { label: t('user_messages'), href: '/user/messages', icon: <MessageCircle size={16} /> },
        { label: t('user_support_tickets'), href: '/user/support', icon: <ClipboardList size={16} /> },
        { label: t('user_account_activity'), href: '/user/activity', icon: <Activity size={16} /> },
        { label: t('user_instructions'), href: '/user/instructions', icon: <Info size={16} /> },
      ],
    },
  ];

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && rightSidebarOpen) {
      dispatch(setRightSidebarOpen(false));
    }
  }, [isAuthenticated, rightSidebarOpen, dispatch]);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const shouldExpandSection = useCallback((section: MenuSection): boolean => {
    return (section.expandable ?? false) && section.items.some(item => item.href === pathname);
  }, [pathname]);

  useEffect(() => {
    const newExpanded = new Set<string>();
    USER_MENU_SECTIONS.forEach(section => {
      if (shouldExpandSection(section)) {
        newExpanded.add(section.title);
      }
    });
    setExpandedSections(newExpanded);
  }, [pathname, shouldExpandSection]);

  const toggleSection = useCallback((sectionTitle: string) => {
    setExpandedSections(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(sectionTitle)) {
        newExpanded.delete(sectionTitle);
      } else {
        newExpanded.clear();
        newExpanded.add(sectionTitle);
      }
      return newExpanded;
    });
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(setSidebarOpen(false));
    dispatch(setRightSidebarOpen(false));
    router.push(preserveLocalePath(pathname, '/'));
  }, [dispatch, router, pathname]);

  const closeSidebar = useCallback(() => {
    if (rightSidebarOpen) {
      dispatch(setRightSidebarOpen(false));
    }
  }, [rightSidebarOpen, dispatch]);

  if (!hasHydrated) {
    return null;
  }

  const displayName = hasHydrated
    ? user?.name || user?.email?.split('@')[0] || 'Player'
    : 'Player';
  const profileEmail = hasHydrated ? user?.email || 'No email available' : 'Loading...';
  const userAvatarUrl = hasHydrated ? user?.avatarUrl : '';
  const userTier = 'Member';

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <aside
        className={`${styles.sidebar} ${!rightSidebarOpen ? styles.collapsed : ''}`}
        role="dialog"
        aria-label="User Sidebar"
      >
        <div className={styles['sidebar-profile']}>
          <div className={styles['profile-avatar']}>
            {userAvatarUrl ? (
              <img
                src={userAvatarUrl}
                alt={displayName}
                width={64}
                height={64}
                loading="lazy"
              />
            ) : (
              <span>{displayName.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className={styles['profile-copy']}>
            <p className={styles['profile-name']}>{displayName}</p>
            <p className={styles['profile-email']}>{profileEmail}</p>
            <span className={styles['profile-tier']}>{userTier}</span>
          </div>
        </div>

        {USER_MENU_SECTIONS.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            isExpanded={expandedSections.has(section.title)}
            onToggle={toggleSection}
            pathname={pathname}
            onItemSelect={closeSidebar}
          />
        ))}

        {hasHydrated && isAuthenticated && (
          <div className={styles['sidebar-footer']}>
            <button type="button" className={styles['logout-button']} onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </aside>

      {rightSidebarOpen && (
        <div
          className={styles.overlay}
          role="button"
          tabIndex={0}
          onClick={closeSidebar}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              closeSidebar();
            }
          }}
        />
      )}
    </>
  );
}
