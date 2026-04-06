'use client';

import Link from 'next/link';
import React, { useState, useEffect, useCallback, memo } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState, toggleSidebar } from '@/store/store';
import { preserveLocalePath, stripLocalePrefix } from '@/lib/locale';
import { Home, Globe, Gift, Gamepad2, CreditCard, Wrench, BookOpen, Trophy, Shield, ChevronDown, ChevronRight } from 'lucide-react';
import UserFlag from '@/components/UserFlag';
import styles from './HOMESleftsidebare.module.scss';

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

// Memoized menu configuration to prevent recreation - will be populated with translations in component
export const MENU_SECTIONS_BASE: MenuSection[] = [
    {
      title: 'MAIN',
      icon: <Home size={14} />,
      items: [
        { label: 'Home', href: '/', icon: <Home size={16} /> },
        { label: 'Top Casinos 2026', href: '/top-casinos-2026', icon: <Trophy size={16} /> },
        { label: 'New Casinos', href: '/new-casinos', icon: <Gift size={16} /> },
        { label: 'No Deposit Bonuses', href: '/no-deposit-bonuses', icon: <Gift size={16} /> },
        { label: 'Free Spins', href: '/free-spins', icon: <Gamepad2 size={16} /> },
      ],
    },

       {
      title: 'COUNTRIES',
      icon: <Globe size={14} />,
      expandable: true,
      items: [
        { label: 'United States', href: '/casino/united-states', icon: <UserFlag userCountry="United States" size="small" /> },
        { label: 'United Kingdom', href: '/casino/united-kingdom', icon: <UserFlag userCountry="United Kingdom" size="small" /> },
        { label: 'Canada', href: '/casino/canada', icon: <UserFlag userCountry="Canada" size="small" /> },
        { label: 'Australia', href: '/casino/australia', icon: <UserFlag userCountry="Australia" size="small" /> },
        { label: 'Germany', href: '/casino/germany', icon: <UserFlag userCountry="Germany" size="small" /> },
        { label: 'Netherlands', href: '/casino/netherlands', icon: <UserFlag userCountry="Netherlands" size="small" /> },
        { label: 'Morocco', href: '/casino/morocco', icon: <UserFlag userCountry="Morocco" size="small" /> },
        { label: 'View All Countries', href: '/countries', icon: <Globe size={16} /> },
      ],
    },
       {
      title: 'CASINOs',
      icon: <Gamepad2 size={14} />,
      expandable: true,
      items: [
        { label: 'All Online Casinos', href: '/casino', icon: <CreditCard size={16} /> },
        { label: 'Mobile Casinos', href: '/casino-types/mobile', icon: <Gamepad2 size={16} /> },
        { label: 'Live Casinos', href: '/casino-types/live', icon: <Gamepad2 size={16} /> },
        { label: 'Fast Withdrawal Casinos', href: '/casino-types/fast-withdrawal', icon: <CreditCard size={16} /> },
        { label: 'Low Deposit Casinos ($1 / $5)', href: '/casino-types/low-deposit', icon: <CreditCard size={16} /> },
        { label: 'No KYC Casinos', href: '/casino-types/no-kyc', icon: <Shield size={16} /> },
      ],
    }, 
    {
      title: 'BONUSES',
      icon: <Gift size={14} />,
      expandable: true,
      items: [
        { label: 'No Deposit Bonus', href: '/bonuses/no-deposit', icon: <Gift size={16} /> },
        { label: 'Welcome Bonus', href: '/bonuses/welcome', icon: <Gift size={16} /> },
        { label: 'Free Spins', href: '/bonuses/free-spins', icon: <Gamepad2 size={16} /> },
        { label: 'High Roller Bonuses', href: '/bonuses/high-roller', icon: <Trophy size={16} /> },
        { label: 'Cashback Offers', href: '/bonuses/cashback', icon: <CreditCard size={16} /> },
        { label: 'Crypto Bonuses', href: '/bonuses/crypto', icon: <CreditCard size={16} /> },
      ],
    },
  
   

    {
      title: 'PAYMENT METHODS',
      icon: <CreditCard size={14} />,
      expandable: true,
      items: [
        { label: 'PayPal Casinos', href: '/payment/paypal', icon: <CreditCard size={16} /> },
        { label: 'Visa / Mastercard', href: '/payment/visa-mastercard', icon: <CreditCard size={16} /> },
        { label: 'Bitcoin Casinos', href: '/payment/bitcoin', icon: <CreditCard size={16} /> },
        { label: 'Skrill / Neteller', href: '/payment/skrill-neteller', icon: <CreditCard size={16} /> },
        { label: 'Bank Transfer', href: '/payment/bank-transfer', icon: <CreditCard size={16} /> },
      ],
    },
    {
      title: 'TOOLS',
      icon: <Wrench size={14} />,
      expandable: true,
      items: [
        { label: 'RTP Calculator', href: '/tools/rtp-calculator', icon: <Wrench size={16} /> },
        { label: 'Betting Calculator', href: '/tools/betting-calculator', icon: <Wrench size={16} /> },
        { label: 'Odds Converter', href: '/tools/odds-converter', icon: <Wrench size={16} /> },
        { label: 'Bankroll Simulator', href: '/tools/bankroll-simulator', icon: <CreditCard size={16} /> },
      ],
    },
    {
      title: 'RESOURCES',
      icon: <BookOpen size={14} />,
      expandable: true,
      items: [
        { label: 'Blog', href: '/blog', icon: <BookOpen size={16} /> },
        { label: 'Guides', href: '/guides', icon: <BookOpen size={16} /> },
        { label: 'Reviews', href: '/reviews', icon: <Trophy size={16} /> },
        { label: 'Comparisons', href: '/comparisons', icon: <Wrench size={16} /> },
        { label: 'Strategies', href: '/strategies', icon: <Wrench size={16} /> },
      ],
    },
    {
      title: 'TOP LISTS',
      icon: <Trophy size={14} />,
      expandable: true,
      items: [
        { label: 'Best Casinos Overall', href: '/top-lists/best-overall', icon: <Trophy size={16} /> },
        { label: 'Best for Beginners', href: '/top-lists/beginners', icon: <Trophy size={16} /> },
        { label: 'Best High Roller Casinos', href: '/top-lists/high-roller', icon: <Trophy size={16} /> },
        { label: 'Fastest Payout Casinos', href: '/top-lists/fast-payout', icon: <CreditCard size={16} /> },
        { label: 'Trusted Casinos', href: '/top-lists/trusted', icon: <Shield size={16} /> },
      ],
    },
    {
      title: 'TRUST & INFO',
      icon: <Shield size={14} />,
      items: [
        { label: 'About Us', href: '/about', icon: <Shield size={16} /> },
        { label: 'How We Review', href: '/how-we-review', icon: <Shield size={16} /> },
        { label: 'Responsible Gambling', href: '/responsible-gambling', icon: <Shield size={16} /> },
        { label: 'FAQ', href: '/faq', icon: <Wrench size={16} /> },
        { label: 'Contact', href: '/contact', icon: <Wrench size={16} /> },
      ],
    },
  ];

// Sidebar menu item component
function SidebarMenuItemComponent({ item, pathname, onItemSelect }: { item: MenuItem; pathname: string; onItemSelect?: () => void }) {
  const strippedPath = stripLocalePrefix(pathname);
  const localizedHref = preserveLocalePath(pathname, item.href);
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
    if (onItemSelect) {
      onItemSelect();
    }
  };

  return (
    <li
      className={`${styles['menu-item']} ${strippedPath === item.href ? styles.active : ''}`}
    >
      <Link
        href={localizedHref}
        className={styles['menu-link']}
        scroll={false}
        onClick={handleClick}
      >
        {item.icon && <span className={styles['menu-icon']}>{item.icon}</span>}
        {item.label}
      </Link>
    </li>
  );
}

const SidebarMenuItem = memo(SidebarMenuItemComponent);
SidebarMenuItem.displayName = 'SidebarMenuItem';

// Sidebar section component
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
  <div className={`${styles['sidebar-section']} ${section.title === 'MAIN' ? styles.mainSection : ''} ${section.title === 'TRUST & INFO' ? styles.trustInfoSection : ''}`}>
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
          {isExpanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
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

function HOMESleftsidebare() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);
  const pathname = usePathname();
  const { t } = useTranslation();

  // Build menu sections with translations
  const MENU_SECTIONS = [
    {
      title: t('sidebar_main'),
      icon: <Home size={14} />,
      items: [
        { label: t('home'), href: '/', icon: <Home size={16} /> },
        { label: t('sidebar_top_casinos_2026'), href: '/top-casinos-2026', icon: <Trophy size={16} /> },
        { label: t('sidebar_new_casinos'), href: '/new-casinos', icon: <Gift size={16} /> },
        { label: t('no_deposit_bonuses'), href: '/no-deposit-bonuses', icon: <Gift size={16} /> },
        { label: t('free_spins'), href: '/free-spins', icon: <Gamepad2 size={16} /> },
      ],
    },
    {
      title: t('sidebar_countries'),
      icon: <Globe size={14} />,
      expandable: true,
      items: [
        { label: t('sidebar_united_states'), href: '/casino/united-states', icon: <UserFlag userCountry="United States" size="small" /> },
        { label: t('sidebar_united_kingdom'), href: '/casino/united-kingdom', icon: <UserFlag userCountry="United Kingdom" size="small" /> },
        { label: t('sidebar_canada'), href: '/casino/canada', icon: <UserFlag userCountry="Canada" size="small" /> },
        { label: t('sidebar_australia'), href: '/casino/australia', icon: <UserFlag userCountry="Australia" size="small" /> },
        { label: t('sidebar_germany'), href: '/casino/germany', icon: <UserFlag userCountry="Germany" size="small" /> },
        { label: t('sidebar_netherlands'), href: '/casino/netherlands', icon: <UserFlag userCountry="Netherlands" size="small" /> },
        { label: t('sidebar_morocco'), href: '/casino/morocco', icon: <UserFlag userCountry="Morocco" size="small" /> },
        { label: t('sidebar_view_all_countries'), href: '/countries', icon: <Globe size={16} /> },
      ],
    },
    {
      title: t('sidebar_casinos'),
      icon: <Gamepad2 size={14} />,
      expandable: true,
      items: [
        { label: t('sidebar_all_online_casinos'), href: '/casino', icon: <CreditCard size={16} /> },
        { label: t('sidebar_mobile_casinos_menu'), href: '/casino-types/mobile', icon: <Gamepad2 size={16} /> },
        { label: t('sidebar_live_casinos'), href: '/casino-types/live', icon: <Gamepad2 size={16} /> },
        { label: t('sidebar_fast_withdrawal_casinos'), href: '/casino-types/fast-withdrawal', icon: <CreditCard size={16} /> },
        { label: t('sidebar_low_deposit'), href: '/casino-types/low-deposit', icon: <CreditCard size={16} /> },
        { label: t('sidebar_no_kyc_casinos'), href: '/casino-types/no-kyc', icon: <Shield size={16} /> },
      ],
    },
    {
      title: t('sidebar_bonuses'),
      icon: <Gift size={14} />,
      expandable: true,
      items: [
        { label: t('sidebar_no_deposit_bonus'), href: '/bonuses/no-deposit', icon: <Gift size={16} /> },
        { label: t('sidebar_welcome_bonus'), href: '/bonuses/welcome', icon: <Gift size={16} /> },
        { label: t('sidebar_free_spins_menu'), href: '/bonuses/free-spins', icon: <Gamepad2 size={16} /> },
        { label: t('sidebar_high_roller_bonuses'), href: '/bonuses/high-roller', icon: <Trophy size={16} /> },
        { label: t('sidebar_cashback_offers'), href: '/bonuses/cashback', icon: <CreditCard size={16} /> },
        { label: t('sidebar_crypto_bonuses_menu'), href: '/bonuses/crypto', icon: <CreditCard size={16} /> },
      ],
    },
    {
      title: t('sidebar_payment_methods'),
      icon: <CreditCard size={14} />,
      expandable: true,
      items: [
        { label: t('sidebar_paypal_casinos'), href: '/payment/paypal', icon: <CreditCard size={16} /> },
        { label: t('sidebar_visa_mastercard'), href: '/payment/visa-mastercard', icon: <CreditCard size={16} /> },
        { label: t('sidebar_bitcoin_casinos'), href: '/payment/bitcoin', icon: <CreditCard size={16} /> },
        { label: t('sidebar_skrill_neteller'), href: '/payment/skrill-neteller', icon: <CreditCard size={16} /> },
        { label: t('sidebar_bank_transfer'), href: '/payment/bank-transfer', icon: <CreditCard size={16} /> },
      ],
    },
    {
      title: t('sidebar_tools'),
      icon: <Wrench size={14} />,
      expandable: true,
      items: [
        { label: t('sidebar_rtp_calculator'), href: '/tools/rtp-calculator', icon: <Wrench size={16} /> },
        { label: t('sidebar_betting_calculator'), href: '/tools/betting-calculator', icon: <Wrench size={16} /> },
        { label: t('sidebar_odds_converter'), href: '/tools/odds-converter', icon: <Wrench size={16} /> },
        { label: t('sidebar_bankroll_simulator'), href: '/tools/bankroll-simulator', icon: <CreditCard size={16} /> },
      ],
    },
    {
      title: t('sidebar_resources'),
      icon: <BookOpen size={14} />,
      expandable: true,
      items: [
        { label: t('sidebar_blog_menu'), href: '/blog', icon: <BookOpen size={16} /> },
        { label: t('sidebar_guides_menu'), href: '/guides', icon: <BookOpen size={16} /> },
        { label: t('sidebar_reviews_menu'), href: '/reviews', icon: <Trophy size={16} /> },
        { label: t('sidebar_comparisons_menu'), href: '/comparisons', icon: <Wrench size={16} /> },
        { label: t('sidebar_strategies'), href: '/strategies', icon: <Wrench size={16} /> },
      ],
    },
    {
      title: t('sidebar_top_lists'),
      icon: <Trophy size={14} />,
      expandable: true,
      items: [
        { label: t('sidebar_best_casinos_overall'), href: '/top-lists/best-overall', icon: <Trophy size={16} /> },
        { label: t('sidebar_best_for_beginners'), href: '/top-lists/beginners', icon: <Trophy size={16} /> },
        { label: t('sidebar_best_high_roller'), href: '/top-lists/high-roller', icon: <Trophy size={16} /> },
        { label: t('sidebar_fastest_payout'), href: '/top-lists/fast-payout', icon: <CreditCard size={16} /> },
        { label: t('sidebar_trusted_casinos_menu'), href: '/top-lists/trusted', icon: <Shield size={16} /> },
      ],
    },
    {
      title: t('sidebar_trust_info'),
      icon: <Shield size={14} />,
      items: [
        { label: t('sidebar_about_us_menu'), href: '/about', icon: <Shield size={16} /> },
        { label: t('sidebar_how_we_review_menu'), href: '/how-we-review', icon: <Shield size={16} /> },
        { label: t('sidebar_responsible_gambling_menu'), href: '/responsible-gambling', icon: <Shield size={16} /> },
        { label: t('sidebar_faq_menu'), href: '/faq', icon: <Wrench size={16} /> },
        { label: t('sidebar_contact_menu'), href: '/contact', icon: <Wrench size={16} /> },
      ],
    },
  ];

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Load expanded sections from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarExpandedSections');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setExpandedSections(new Set(parsed));
        } catch (e) {
          // Ignore invalid data
        }
      }
    }
  }, []);

  // Save expanded sections to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarExpandedSections', JSON.stringify([...expandedSections]));
    }
  }, [expandedSections]);

  // Calculate which section should be expanded based on current pathname
  const shouldExpandSection = useCallback((section: MenuSection): boolean => {
    return (section.expandable ?? false) && section.items.some(item => item.href === pathname);
  }, [pathname]);

  // Update expanded sections when pathname changes
  useEffect(() => {
    const newExpanded = new Set<string>();
    MENU_SECTIONS.forEach(section => {
      if (shouldExpandSection(section)) {
        newExpanded.add(section.title);
      }
    });
    setExpandedSections(newExpanded);
  }, [pathname, shouldExpandSection]);

  // Memoize toggle function
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

  const closeSidebar = useCallback(() => {
    if (sidebarOpen) {
      dispatch(toggleSidebar());
    }
  }, [sidebarOpen, dispatch]);

  return (
    <>
      <aside
        className={`${styles.sidebar} ${!sidebarOpen ? styles.collapsed : ''}`}
        role="dialog"
        aria-label="Navigation Sidebar"
      >
        {MENU_SECTIONS.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            isExpanded={expandedSections.has(section.title)}
            onToggle={toggleSection}
            pathname={pathname}
          />
        ))}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
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

export default memo(HOMESleftsidebare);
