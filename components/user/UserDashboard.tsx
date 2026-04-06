'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { preserveLocalePath } from '@/lib/locale';
import { RootState, setUser } from '@/store/store';
import styles from './UserDashboard.module.scss';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatShort(value: number) {
  return value.toLocaleString('en-US');
}

const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500];

function getLevelData(totalPoints: number) {
  let currentLevel = 0;
  let currentLevelThreshold = 0;

  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalPoints >= LEVEL_THRESHOLDS[i]!) {
      currentLevel = i;
      currentLevelThreshold = LEVEL_THRESHOLDS[i]!;
      break;
    }
  }

  const nextLevelThreshold =
    currentLevel < LEVEL_THRESHOLDS.length - 1
      ? LEVEL_THRESHOLDS[currentLevel + 1]!
      : currentLevelThreshold;
  const xpInLevel = totalPoints - currentLevelThreshold;
  const xpToNextLevel = nextLevelThreshold - currentLevelThreshold;
  const progressPercentage = xpToNextLevel > 0 ? Math.round((xpInLevel / xpToNextLevel) * 100) : 100;
  const xpRemaining = Math.max(0, xpToNextLevel - xpInLevel);

  return { currentLevel, xpInLevel, xpToNextLevel, progressPercentage, xpRemaining };
}

const getAuthUserId = (user: any) => user?.id || user?._id || user?.userId || '';

export default function UserDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname() || '/';
  const auth = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const [dashboardUser, setDashboardUser] = useState<any>(null);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (!auth.isAuthenticated || !auth.user) {
      router.push(preserveLocalePath(pathname, '/auth/login'));
      return;
    }

    const userId = getAuthUserId(auth.user);
    if (!userId) {
      router.push(preserveLocalePath(pathname, '/auth/login'));
      return;
    }

    if (loadedUserId === userId) {
      return;
    }

    async function loadFullProfile() {
      try {
        const response = await fetch(`/api/user/profile?userId=${encodeURIComponent(userId)}`);
        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Unable to load profile (${response.status}): ${errorBody}`);
        }
        const { user } = await response.json();
        if (user) {
          setDashboardUser(user);
          dispatch(setUser(user));
          setLoadedUserId(userId);
        }
      } catch (error) {
        console.error('Failed to load dashboard profile:', error);
      }
    }

    loadFullProfile();
  }, [isMounted, auth.isAuthenticated, auth.user, loadedUserId, dispatch, router, pathname]);

  const user = dashboardUser ?? auth.user;

  const userName = useMemo(() => {
    if (!user) return t('player_default');
    if (user.name) return user.name;
    if (user.firstName || user.lastName) return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
    return user.email?.split('@')[0] ?? t('player_default');
  }, [user, t]);

  const totalPoints = user?.totalPoints ?? 0;
  const coins = user?.coins ?? 0;
  const earnings = user?.totalEarnings ?? 0;
  const reviewsCount = user?.reviews?.length ?? user?.reviewsCount ?? 0;
  const helpfulVotes = user?.upvotesGiven ?? Math.min(999, Math.floor(coins / 10));
  const winRate = user?.engagementScore ? Math.min(99, Math.max(20, Math.round(user.engagementScore))) : 72;
  const streakDays = user?.dailyLoginStreak ?? 0;
  const achievements = user?.achievements?.length ?? 0;
  const biggestWin = user?.biggestWin ?? 'N/A';
  const followedCasinos = user?.followedCasinoIds?.length ?? 0;
  const suggestedCasinos = user?.suggestedCasinos?.slice(0, 3) ?? ['Emerald Casino', 'Lucky Spin', 'Royal Ace'];
  const preferredGameTypes = user?.preferredGameTypes?.slice(0, 3) ?? ['Slots', 'Live Casino', 'Jackpot'];

  const levelData = useMemo(() => getLevelData(totalPoints), [totalPoints]);
  const progressPercent = Math.min(100, Math.max(0, Math.round(levelData.progressPercentage / 10) * 10));
  const progressFillClass = styles['progressFill' + progressPercent] || '';
  const today = new Date().toISOString().split('T')[0];
  const lastClaimed = user?.lastDailyLoginAt?.split('T')[0];
  const claimedToday = lastClaimed === today;

  const recentActivity = useMemo(
    () => [
      { label: t('activity_daily_bonus_label'), detail: `+${Math.min(75, coins)} coins`, time: t('activity_time_2m_ago') },
      { label: t('activity_reviewed_casino_label'), detail: t('activity_reviewed_casino_detail'), time: t('activity_time_58m_ago') },
      { label: t('activity_earned_coins_label'), detail: t('activity_earned_coins_detail'), time: t('activity_time_3h_ago') },
      { label: t('activity_bonus_unlocked_label'), detail: t('activity_bonus_unlocked_detail'), time: t('activity_time_yesterday') },
    ],
    [coins, t]
  );

  if (!isMounted) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.loadingPanel}>
          <h1>{t('loading_dashboard_title')}</h1>
          <p>{t('loading_dashboard_description')}</p>
        </div>
      </div>
    );
  }

  if (!auth.isAuthenticated || !auth.user) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.loadingPanel}>
          <h1>{t('loading_dashboard_title')}</h1>
          <p>{t('loading_dashboard_description')}</p>
        </div>
      </div>
    );
  }

  const handleClaimDaily = async () => {
    if (!user || claimedToday) return;

    try {
      const res = await fetch('/api/daily-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!res.ok) {
        console.error('Failed to claim daily bonus');
        return;
      }

      const { user: updatedUser } = await res.json();
      dispatch(setUser(updatedUser));
      setDashboardUser(updatedUser);
    } catch (error) {
      console.error('Claim daily bonus error:', error);
    }
  };

  const missions = [
    { title: t('mission_write_review'), reward: '+50 coins', status: 'open' },
    { title: t('mission_visit_casinos'), reward: '+20 XP', status: 'in_progress' },
    { title: t('mission_daily_login'), reward: '+10 coins', status: claimedToday ? 'completed' : 'open' },
  ];

  const notifications = [
    { title: t('notification_new_casino_update'), subtitle: t('notification_new_casino_update_detail') },
    { title: t('notification_personalized_offer'), subtitle: t('notification_personalized_offer_detail') },
    { title: t('notification_reminder'), subtitle: t('notification_reminder_detail') },
  ];

  return (
    <div className={styles.dashboard}>
      <section className={styles.heroSection}>
        <div className={styles.heroHeader}>
          <div className={styles.avatarBlock}>
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={userName}
                width={80}
                height={80}
                loading="lazy"
              />
            ) : (
              <span>{userName.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <p className={styles.welcomeTag}>{t('welcome_back')}</p>
            <h1>Hey {userName},</h1>
            <p className={styles.heroSubtitle}>{t('dashboard_hero_subtitle')}</p>
          </div>
        </div>

        <div className={styles.heroStatsGrid}>
          <div className={styles.heroStatCard}>
            <span>{t('level_label')}</span>
            <strong>{levelData.currentLevel}</strong>
          </div>
          <div className={styles.heroStatCard}>
            <span>{t('xp_progress_label')}</span>
            <strong>{formatShort(totalPoints)} XP</strong>
          </div>
          <div className={styles.heroStatCard}>
            <span>{t('coins_label')}</span>
            <strong>{formatShort(coins)}</strong>
          </div>
          <div className={styles.heroStatCard}>
            <span>{t('earnings_label')}</span>
            <strong>{formatCurrency(earnings)}</strong>
          </div>
        </div>

        <div className={styles.heroActions}>
          <button className={styles.claimButton} onClick={handleClaimDaily} disabled={claimedToday}>
            {claimedToday ? t('daily_bonus_claimed') : t('claim_daily_bonus')}
          </button>
          <button className={styles.primaryButton} onClick={() => router.push(preserveLocalePath(pathname, '/user/profile'))}>
            {t('edit_profile')}
          </button>
          <div className={styles.heroCallout}>
            <strong>
              {t('xp_to_next_level', { count: levelData.xpRemaining, nextLevel: levelData.currentLevel + 1 })}
            </strong>
            <span>
              {levelData.xpRemaining === 0
                ? t('ready_for_next_tier')
                : t('keep_playing_next_tier')}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>{t('progress_gamification_title')}</h2>
            <p>{t('track_level_streak')}</p>
          </div>
          <span className={styles.statusBadge}>{t('level_up_fast')}</span>
        </div>

        <div className={styles.progressZone}>
          <div className={styles.progressText}>
            <span>{t('level_text', { level: levelData.currentLevel })}</span>
            <strong>{t('percent_complete', { percent: Math.round(levelData.progressPercentage) })}</strong>
          </div>
          <div className={styles.progressBar}>
            <div className={`${styles.progressFill} ${progressFillClass}`} />
          </div>
          <div className={styles.progressMeta}>
            <span>{levelData.xpInLevel} / 1000 XP</span>
            <span>{t('day_streak', { days: streakDays })}</span>
            <span>{t('achievements_unlocked', { count: achievements })}</span>
          </div>
        </div>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>{t('quick_actions_title')}</h2>
            <p>{t('quick_actions_description')}</p>
          </div>
        </div>

        <div className={styles.actionGrid}>
          <button onClick={() => router.push(preserveLocalePath(pathname, '/games'))}>
            <span>🎰</span>
            <strong>{t('play_games')}</strong>
          </button>
          <button onClick={() => router.push(preserveLocalePath(pathname, '/user/bonuses'))}>
            <span>💰</span>
            <strong>{t('claim_bonus')}</strong>
          </button>
          <button onClick={() => router.push(preserveLocalePath(pathname, '/user/reviews'))}>
            <span>📝</span>
            <strong>{t('write_review')}</strong>
          </button>
          <button onClick={() => router.push(preserveLocalePath(pathname, '/user/support'))}>
            <span>🎟</span>
            <strong>{t('support_label')}</strong>
          </button>
        </div>
      </section>

      <section className={styles.splitGrid}>
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>{t('user_stats_title')}</h2>
              <p>{t('user_stats_description')}</p>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statBlock}>
              <span>{t('coins_label')}</span>
              <strong>{formatShort(coins)}</strong>
            </div>
            <div className={styles.statBlock}>
              <span>{t('earnings_label')}</span>
              <strong>{formatCurrency(earnings)}</strong>
            </div>
            <div className={styles.statBlock}>
              <span>{t('reviews_label')}</span>
              <strong>{formatShort(reviewsCount)}</strong>
            </div>
            <div className={styles.statBlock}>
              <span>{t('helpful_votes_label')}</span>
              <strong>{formatShort(helpfulVotes)}</strong>
            </div>
            <div className={styles.statBlock}>
              <span>{t('win_rate_label')}</span>
              <strong>{winRate}%</strong>
            </div>
            <div className={styles.statBlock}>
              <span>{t('biggest_win_label')}</span>
              <strong>{biggestWin}</strong>
            </div>
          </div>
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>{t('leaderboard_title')}</h2>
              <p>{t('leaderboard_description')}</p>
            </div>
          </div>

          <div className={styles.leaderboardCard}>
            <div>
              <span>{t('current_rank_label')}</span>
              <strong>#1,245</strong>
            </div>
            <div>
              <span>{t('monthly_performance_label')}</span>
              <strong>+18.5%</strong>
            </div>
            <div>
              <span>{t('rewards_history_label')}</span>
              <strong>{t('rewards_claimed', { count: 24 })}</strong>
            </div>
          </div>

          <div className={styles.leaderboardFooter}>
            <strong>{t('close_to_top_1000')}</strong>
            <span>{t('only_xp_away', { count: 9800 })}</span>
          </div>
        </div>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>{t('activity_feed_title')}</h2>
            <p>{t('activity_feed_description')}</p>
          </div>
        </div>

        <div className={styles.activityFeed}>
          {recentActivity.map((item) => (
            <div key={item.label} className={styles.activityItem}>
              <div>
                <strong>{item.label}</strong>
                <p>{item.detail}</p>
              </div>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>{t('mission_title')}</h2>
            <p>{t('mission_description')}</p>
          </div>
        </div>

        <div className={styles.missionGrid}>
          {missions.map((mission) => (
            <div key={mission.title} className={styles.missionCard}>
              <div>
                <strong>{mission.title}</strong>
                <p>{mission.reward}</p>
              </div>
              <span className={mission.status === 'completed' ? styles.missionDone : styles.missionOpen}>
                {t(`status_${mission.status}`)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.splitGrid}>
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>{t('bonuses_offers_title')}</h2>
              <p>{t('bonuses_offers_description')}</p>
            </div>
          </div>

          <ul className={styles.offerList}>
            {suggestedCasinos.map((casino: string) => (
              <li key={casino}>
                <strong>{casino}</strong>
                <span>{t('recommended_for_play_style')}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>{t('favorites_title')}</h2>
              <p>{t('favorites_description')}</p>
            </div>
          </div>

          <div className={styles.favoritesGrid}>
            <div className={styles.favoriteBlock}>
              <span>{t('followed_casinos_label')}</span>
              <strong>{followedCasinos}</strong>
            </div>
            <div className={styles.favoriteBlock}>
              <span>{t('preferred_games_label')}</span>
              <strong>{preferredGameTypes.join(', ')}</strong>
            </div>
            <div className={styles.favoriteBlock}>
              <span>{t('recent_visits_label')}</span>
              <strong>{t('recent_visits_count', { count: 3 })}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.splitGrid}>
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>{t('shop_rewards_title')}</h2>
              <p>{t('shop_rewards_description')}</p>
            </div>
          </div>

          <div className={styles.shopGrid}>
            <div className={styles.shopCard}>
              <span>{t('wallet_balance_label')}</span>
              <strong>{formatShort(coins)} coins</strong>
            </div>
            <div className={styles.shopCard}>
              <span>{t('available_tickets_label')}</span>
              <strong>4</strong>
            </div>
            <button className={styles.primaryButton}>{t('convert_coins')}</button>
          </div>
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>{t('raffles_tickets_title')}</h2>
              <p>{t('raffles_tickets_description')}</p>
            </div>
          </div>

          <div className={styles.ticketList}>
            <div className={styles.ticketItem}>
              <strong>{t('monthly_raffle')}</strong>
              <span>{t('tickets_active', { count: 3 })}</span>
            </div>
            <div className={styles.ticketItem}>
              <strong>{t('vip_draw')}</strong>
              <span>{t('ticket_winning', { count: 1 })}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>{t('notifications_community_title')}</h2>
            <p>{t('notifications_community_description')}</p>
          </div>
        </div>

        <div className={styles.notificationGrid}>
          {notifications.map((notification) => (
            <div key={notification.title} className={styles.notificationCard}>
              <strong>{notification.title}</strong>
              <p>{notification.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
