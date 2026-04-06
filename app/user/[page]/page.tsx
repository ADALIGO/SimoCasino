'use client';

import React, { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { preserveLocalePath } from '@/lib/locale';
import LoadingSpinner from '@/components/LoadingSpinner';
import CloudinaryUploadWidget from '@/components/CloudinaryUploadWidget';
import HOMELayouts from '@/app/layouts/HOMELayouts';
import { RootState, setUser } from '@/store/store';
import { submitRewardAction } from '@/lib/rewardActions';
import {
  Bell,
  Gift,
  Shield,
  Info,
  Settings,
  Mail,
  Star,
  Heart,
  MessageCircle,
  ClipboardList,
} from 'lucide-react';
import styles from './UserSectionPage.module.scss';

const PAGE_DEFINITIONS: Record<string, { title: string; subtitle: string; icon: ReactNode }> = {
  profile: {
    title: 'Edit Profile',
    subtitle: 'Review and update your account information, avatar, and personal details.',
    icon: <UserSectionIcon />,
  },
  settings: {
    title: 'Account Settings',
    subtitle: 'Manage your preferences and notification foundation in one place.',
    icon: <Settings size={20} />,
  },
  security: {
    title: 'Security Settings',
    subtitle: 'Protect your account with two-factor authentication and recovery options.',
    icon: <Shield size={20} />,
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'Control which alerts and updates you receive across the platform.',
    icon: <Bell size={20} />,
  },
  rewards: {
    title: 'Reward Center',
    subtitle: 'Track your points, coins, and reward progress across the site.',
    icon: <Gift size={20} />,
  },
  instructions: {
    title: 'User Instructions',
    subtitle: 'Learn how to use the dashboard, reward system and account settings.',
    icon: <Info size={20} />,
  },
  bonuses: {
    title: 'Bonus History',
    subtitle: 'Track your claimed bonuses and available offers.',
    icon: <Star size={20} />,
  },
  history: {
    title: 'Play History',
    subtitle: 'Review your casino visits, activity, and interaction history.',
    icon: <ClipboardList size={20} />,
  },
  reviews: {
    title: 'My Reviews',
    subtitle: 'Manage your casino reviews, ratings, and feedback.',
    icon: <Heart size={20} />,
  },
  favorites: {
    title: 'Favorites',
    subtitle: 'Quickly access the casinos and bonuses you saved.',
    icon: <Heart size={20} />,
  },
  messages: {
    title: 'Messages',
    subtitle: 'Read your inbox, responses, and support messages.',
    icon: <MessageCircle size={20} />,
  },
  support: {
    title: 'Support Tickets',
    subtitle: 'Open a ticket, check status, and communicate with support.',
    icon: <ClipboardList size={20} />,
  },
  activity: {
    title: 'Account Activity',
    subtitle: 'View recent sign-ins, actions, and session data.',
    icon: <ActivityIcon />,
  },
};

function UserSectionIcon() {
  return <Mail size={20} />;
}

function ActivityIcon() {
  return <Shield size={20} />;
}

interface UserSectionProps {
  params: Promise<{ page: string }>;
}

const defaultUserData = {
  id: '',
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  profileImage: '',
  bannerImage: '',
  imageGallery: [] as string[],
  bio: '',
  personalQuote: '',
  signature: '',
  showFlagNextToUsername: false,
  hideGender: false,
  preferredCasinoType: '',
  favoriteGameType: '',
  firstGambleYear: '',
  biggestWin: '',
  favoriteMeal: '',
  favoriteMovie: '',
  favoriteMusicGenre: '',
  favoriteSeason: '',
  facebookProfile: '',
  twitterProfile: '',
  instagramProfile: '',
  newsletterSubscribed: false,
  dateOfBirth: '',
  gender: '',
  location: '',
  userTier: 'FREE',
  verificationStatus: 'UNVERIFIED',
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  notificationsEnabled: true,
  twoFactorEnabled: false,
  recoveryEmail: '',
  recoveryPhone: '',
  totalPoints: 0,
  coins: 0,
  vipPoints: 0,
  currentLevel: 1,
  rewardActionsCompleted: [] as string[],
  dailyRewardsClaimed: 0,
  lastRewardAt: '',
  dailyLoginStreak: 0,
  referralCode: '',
  referralsCount: 0,
  referralEarnings: 0,
  totalEarnings: 0,
  pendingEarnings: 0,
  withdrawnEarnings: 0,
  affiliateClicks: 0,
  conversionCount: 0,
  pageViews: 0,
  engagementScore: 0,
  retentionScore: 0,
  likedCasinoIds: [] as string[],
  followedCasinoIds: [] as string[],
  favoriteCasinoId: '',
  createdAt: '',
  updatedAt: '',
  lastLoginAt: '',
  lastDailyLoginAt: '',
};

const PROFILE_COMPLETION_FIELDS = [
  'email',
  'username',
  'firstName',
  'lastName',
  'profileImage',
  'bannerImage',
  'imageGallery',
  'bio',
  'personalQuote',
  'signature',
  'preferredCasinoType',
  'favoriteGameType',
  'newsletterSubscribed',
  'location',
  'gender',
  'dateOfBirth',
  'referralCode',
] as const;

function calculateProfileCompletionPercent(userData: Record<string, any>) {
  const totalFields = PROFILE_COMPLETION_FIELDS.length;
  const filledFields = PROFILE_COMPLETION_FIELDS.reduce((count, field) => {
    const value = userData[field];
    return count + (value !== undefined && value !== null && String(value).trim() !== '' ? 1 : 0);
  }, 0);
  return Math.round((filledFields / totalFields) * 100);
}

function getProfileCompletionMilestones(percent: number, completedActions: string[] = []) {
  const milestones: string[] = [];

  if (percent >= 50 && !completedActions.includes('profile_50_complete')) {
    milestones.push('profile_50_complete');
  }

  if (percent >= 80 && !completedActions.includes('profile_80_complete')) {
    milestones.push('profile_80_complete');
  }

  if (percent >= 100 && !completedActions.includes('complete_profile')) {
    milestones.push('complete_profile');
  }

  return milestones;
}

export default function UserSectionPage({ params }: UserSectionProps) {
  const { page } = React.use(params as Promise<{ page: string }>);
  const currentPage = page.toLowerCase();
  const definition = PAGE_DEFINITIONS[currentPage] || {
    title: `${currentPage.replace(/[-_]/g, ' ')} Page`,
    subtitle: 'This page is available soon. Use the user sidebar to navigate your account tools.',
    icon: <Info size={20} />,
  };

  const router = useRouter();
  const pathname = usePathname() || '/';
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<typeof defaultUserData & { currentLevel: number }>(defaultUserData);
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const selectedName = useMemo(() => {
    if (auth.user?.name) return auth.user.name;
    if (auth.user?.firstName || auth.user?.lastName) {
      return `${auth.user?.firstName ?? ''} ${auth.user?.lastName ?? ''}`.trim();
    }
    return auth.user?.email?.split('@')[0] ?? 'Player';
  }, [auth.user]);

  const profileCompletionPercent = useMemo(
    () => calculateProfileCompletionPercent(userData),
    [userData]
  );

  const profileCompletionActions = useMemo(
    () => (userData.rewardActionsCompleted as string[]) || [],
    [userData.rewardActionsCompleted]
  );

  const profileCompletionMissingRewards = useMemo(
    () => getProfileCompletionMilestones(profileCompletionPercent, profileCompletionActions),
    [profileCompletionPercent, profileCompletionActions]
  );

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.user?.id || profileCompletionMissingRewards.length === 0) {
      return;
    }

    let isActive = true;

    async function claimMissingProfileRewards() {
      for (const action of profileCompletionMissingRewards) {
        try {
          const result = await submitRewardAction(auth.user!.id, action);
          if (!isActive) return;
          if (result?.user) {
            setUserData((prev) => ({ ...prev, ...result.user }));
            dispatch(setUser({ ...auth.user!, ...result.user }));
          }
        } catch (error) {
          console.warn('Profile completion reward claim failed:', action, error);
        }
      }
    }

    claimMissingProfileRewards();

    return () => {
      isActive = false;
    };
  }, [auth.isAuthenticated, auth.user, profileCompletionMissingRewards, dispatch]);

  const displayedName = isMounted ? selectedName : 'Player';
  const avatarInitial = isMounted ? selectedName.charAt(0).toUpperCase() : 'P';
  const displayProfileImage = isMounted ? userData.profileImage : '';

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (!auth.isAuthenticated || !auth.user) {
      router.push(preserveLocalePath(pathname, '/auth/login'));
      return;
    }

    const userId = auth.user?.id;
    if (!userId) {
      router.push(preserveLocalePath(pathname, '/auth/login'));
      return;
    }

    async function loadUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/user/profile?userId=${encodeURIComponent(userId)}`, {
          cache: 'default',
        });
        if (!response.ok) throw new Error('Failed to load profile');
        const { user } = await response.json();
        if (!user) {
          throw new Error('Profile response missing user');
        }

        setUserData({
          ...defaultUserData,
          ...user,
          bannerImage: user.bannerImage ?? '',
          imageGallery: user.imageGallery ?? [],
          personalQuote: user.personalQuote ?? '',
          signature: user.signature ?? '',
          showFlagNextToUsername: user.showFlagNextToUsername ?? false,
          hideGender: user.hideGender ?? false,
          preferredCasinoType: user.preferredCasinoType ?? '',
          favoriteGameType: user.favoriteGameType ?? '',
          firstGambleYear: user.firstGambleYear ?? '',
          biggestWin: user.biggestWin ?? '',
          favoriteMeal: user.favoriteMeal ?? '',
          favoriteMovie: user.favoriteMovie ?? '',
          favoriteMusicGenre: user.favoriteMusicGenre ?? '',
          favoriteSeason: user.favoriteSeason ?? '',
          facebookProfile: user.facebookProfile ?? '',
          twitterProfile: user.twitterProfile ?? '',
          instagramProfile: user.instagramProfile ?? '',
          newsletterSubscribed: user.newsletterSubscribed ?? false,
          currentLevel: user.currentLevel ?? 1,
          rewardActionsCompleted: user.rewardActionsCompleted ?? [],
          likedCasinoIds: user.likedCasinoIds ?? [],
          followedCasinoIds: user.followedCasinoIds ?? [],
        });
        dispatch(setUser(user));
        setLoadedUserId(userId);
      } catch (error) {
        console.error('User profile load failed', error);
        const authUser = auth.user;
        if (authUser) {
          setUserData((prev) => ({
            ...prev,
            ...authUser,
            bannerImage: authUser.bannerImage ?? prev.bannerImage,
            imageGallery: authUser.imageGallery ?? prev.imageGallery ?? prev.imageGallery,
            personalQuote: authUser.personalQuote ?? prev.personalQuote,
            signature: authUser.signature ?? prev.signature,
            showFlagNextToUsername: authUser.showFlagNextToUsername ?? prev.showFlagNextToUsername,
            hideGender: authUser.hideGender ?? prev.hideGender,
            preferredCasinoType: authUser.preferredCasinoType ?? prev.preferredCasinoType,
            favoriteGameType: authUser.favoriteGameType ?? prev.favoriteGameType,
            firstGambleYear: authUser.firstGambleYear ?? prev.firstGambleYear,
            biggestWin: authUser.biggestWin ?? prev.biggestWin,
            favoriteMeal: authUser.favoriteMeal ?? prev.favoriteMeal,
            favoriteMovie: authUser.favoriteMovie ?? prev.favoriteMovie,
            favoriteMusicGenre: authUser.favoriteMusicGenre ?? prev.favoriteMusicGenre,
            favoriteSeason: authUser.favoriteSeason ?? prev.favoriteSeason,
            facebookProfile: authUser.facebookProfile ?? prev.facebookProfile,
            twitterProfile: authUser.twitterProfile ?? prev.twitterProfile,
            instagramProfile: authUser.instagramProfile ?? prev.instagramProfile,
            newsletterSubscribed: authUser.newsletterSubscribed ?? prev.newsletterSubscribed,
            location: authUser.location ?? prev.location,
            gender: authUser.gender ?? prev.gender,
            dateOfBirth: authUser.dateOfBirth ?? prev.dateOfBirth,
            referralCode: authUser.referralCode ?? prev.referralCode,
            currentLevel: authUser.currentLevel ?? prev.currentLevel,
            rewardActionsCompleted: authUser.rewardActionsCompleted ?? prev.rewardActionsCompleted,
            likedCasinoIds: authUser.likedCasinoIds ?? prev.likedCasinoIds,
            followedCasinoIds: authUser.followedCasinoIds ?? prev.followedCasinoIds,
          }));
        }
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [auth.isAuthenticated, auth.user?.id, dispatch, router, loadedUserId, isMounted]);

  const handleUpdateProfile = async () => {
    setStatusMessage('Saving profile...');
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: auth.user?.id,
          email: userData.email,
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImage: userData.profileImage,
          bannerImage: userData.bannerImage,
          imageGallery: userData.imageGallery,
          bio: userData.bio,
          personalQuote: userData.personalQuote,
          signature: userData.signature,
          showFlagNextToUsername: userData.showFlagNextToUsername,
          hideGender: userData.hideGender,
          preferredCasinoType: userData.preferredCasinoType,
          favoriteGameType: userData.favoriteGameType,
          firstGambleYear: userData.firstGambleYear,
          biggestWin: userData.biggestWin,
          favoriteMeal: userData.favoriteMeal,
          favoriteMovie: userData.favoriteMovie,
          favoriteMusicGenre: userData.favoriteMusicGenre,
          favoriteSeason: userData.favoriteSeason,
          facebookProfile: userData.facebookProfile,
          twitterProfile: userData.twitterProfile,
          instagramProfile: userData.instagramProfile,
          newsletterSubscribed: userData.newsletterSubscribed,
          location: userData.location,
          gender: userData.gender,
          dateOfBirth: userData.dateOfBirth,
          referralCode: userData.referralCode,
        }),
      });

      const { user } = await response.json();
      setUserData((prev) => ({ ...prev, ...user }));
      dispatch(setUser(user));
      setStatusMessage('Profile saved successfully.');
    } catch (error) {
      console.error(error);
      setStatusMessage('Unable to save profile right now.');
    }
  };

  const handleUpdateNotifications = async () => {
    setStatusMessage('Updating notifications...');
    try {
      const response = await fetch('/api/user/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: auth.user?.id,
          emailNotifications: userData.emailNotifications,
          pushNotifications: userData.pushNotifications,
          smsNotifications: userData.smsNotifications,
          notificationsEnabled: userData.notificationsEnabled,
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json();
        throw new Error(errorPayload.error || 'Unable to save notification settings');
      }

      const { user } = await response.json();
      setUserData((prev) => ({ ...prev, ...user }));
      dispatch(setUser(user));
      setStatusMessage('Notification settings updated.');
    } catch (error) {
      console.error(error);
      setStatusMessage('Unable to update notifications right now.');
    }
  };

  const handleUpdateSecurity = async () => {
    setStatusMessage('Updating security preferences...');
    try {
      const response = await fetch('/api/user/security', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: auth.user?.id,
          twoFactorEnabled: userData.twoFactorEnabled,
          recoveryEmail: userData.recoveryEmail,
          recoveryPhone: userData.recoveryPhone,
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json();
        throw new Error(errorPayload.error || 'Unable to save security settings');
      }

      const { user } = await response.json();
      setUserData((prev) => ({ ...prev, ...user }));
      dispatch(setUser(user));
      setStatusMessage('Security configuration saved.');
    } catch (error) {
      console.error(error);
      setStatusMessage('Unable to update security settings.');
    }
  };

  const handleClaimDailyReward = async () => {
    setStatusMessage('Claiming daily bonus...');
    try {
      const response = await fetch('/api/daily-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: auth.user?.id }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to claim daily bonus');
      }

      const { user } = payload;
      setUserData((prev) => ({ ...prev, ...user }));
      dispatch(setUser({ ...auth.user, ...user }));
      setStatusMessage('Daily reward claimed successfully.');
    } catch (error) {
      console.error(error);
      setStatusMessage('Unable to claim daily reward at the moment.');
    }
  };

  const cloudinaryFolderBase = useMemo(
    () => `users/${userData.id || auth.user?.id || 'guest'}`,
    [userData.id, auth.user?.id]
  );

  const handleProfileImageUpload = useCallback((url: string) => {
    setUserData((prev) => ({ ...prev, profileImage: url }));
  }, []);

  const handleBannerImageUpload = useCallback((url: string) => {
    setUserData((prev) => ({ ...prev, bannerImage: url }));
  }, []);

  const handleGalleryImageUpload = useCallback((url: string) => {
    setUserData((prev) => ({
      ...prev,
      imageGallery: [...(prev.imageGallery ?? []), url],
    }));
  }, []);

  const handleGalleryImageRemove = useCallback((index: number) => {
    setUserData((prev) => ({
      ...prev,
      imageGallery: prev.imageGallery.filter((_, i) => i !== index),
    }));
  }, []);

  const pageContent = useMemo(() => {
    if (loading) {
      return (
        <div className={styles.loadingBox}>
          <LoadingSpinner size="large" text="Loading your account details..." />
        </div>
      );
    }

    switch (currentPage) {
      case 'profile':
        return (
          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Profile overview</h2>
                <p>Keep your account profile current to receive better recommendations.</p>
              </div>
              <div className={styles.badge}>{userData.userTier}</div>
            </div>

            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span>Name</span>
                <input
                  value={userData.firstName ?? userData.username ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, firstName: event.target.value }))
                  }
                  placeholder="First name"
                />
              </label>
              <label className={styles.field}>
                <span>Last name</span>
                <input
                  value={userData.lastName ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, lastName: event.target.value }))
                  }
                  placeholder="Last name"
                />
              </label>
              <label className={styles.field}>
                <span>Username</span>
                <input
                  value={userData.username ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, username: event.target.value }))
                  }
                  placeholder="Enter a display name"
                />
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input
                  type="email"
                  value={userData.email ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, email: event.target.value }))
                  }
                  placeholder="name@example.com"
                />
              </label>
              <label className={styles.field}>
                <span>Location</span>
                <input
                  value={userData.location ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, location: event.target.value }))
                  }
                  placeholder="City, country"
                />
              </label>
              <label className={styles.field}>
                <span>Gender</span>
                <select
                  value={userData.gender ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, gender: event.target.value }))
                  }
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </label>
              <label className={styles.field}>
                <span>Date of birth</span>
                <input
                  type="date"
                  value={userData.dateOfBirth?.split('T')[0] ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, dateOfBirth: event.target.value }))
                  }
                />
              </label>
              <label className={styles.fieldWide}>
                <span>Profile bio</span>
                <textarea
                  value={userData.bio ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, bio: event.target.value }))
                  }
                  rows={4}
                  placeholder="Tell us about yourself"
                />
              </label>
              <div className={styles.fieldWide}>
                <span>Profile image</span>
                {userData.profileImage ? (
                  <div className={styles.imagePreviewRow}>
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className={styles.previewImage}
                    />
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => setUserData((prev) => ({ ...prev, profileImage: '' }))}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <p className={styles.uploadHintText}>No profile image selected yet.</p>
                )}
                <CloudinaryUploadWidget
                  uwConfig={{
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
                    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '',
                    multiple: false,
                    maxFileSize: 5 * 1024 * 1024,
                    folder: `${cloudinaryFolderBase}/profile`,
                    buttonLabel: 'Upload profile image',
                    resourceType: 'image',
                    clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
                  }}
                  setState={handleProfileImageUpload}
                />
              </div>
              <div className={styles.fieldWide}>
                <span>Cover image</span>
                {userData.bannerImage ? (
                  <div className={styles.imagePreviewRow}>
                    <img
                      src={userData.bannerImage}
                      alt="Cover"
                      className={styles.previewImage}
                    />
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => setUserData((prev) => ({ ...prev, bannerImage: '' }))}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <p className={styles.uploadHintText}>No banner image selected yet.</p>
                )}
                <CloudinaryUploadWidget
                  uwConfig={{
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
                    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '',
                    multiple: false,
                    maxFileSize: 5 * 1024 * 1024,
                    folder: `${cloudinaryFolderBase}/banner`,
                    buttonLabel: 'Upload banner image',
                    resourceType: 'image',
                    clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
                  }}
                  setState={handleBannerImageUpload}
                />
              </div>
              <div className={styles.fieldWide}>
                <span>Profile gallery</span>
                <div className={styles.galleryPreviewRow}>
                  {(userData.imageGallery ?? []).map((image, index) => (
                    <div key={`${image}-${index}`} className={styles.galleryPreviewItem}>
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className={styles.previewImage}
                      />
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => handleGalleryImageRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <CloudinaryUploadWidget
                  uwConfig={{
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
                    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '',
                    multiple: false,
                    maxFileSize: 5 * 1024 * 1024,
                    folder: `${cloudinaryFolderBase}/gallery`,
                    buttonLabel: 'Add gallery image',
                    resourceType: 'image',
                    clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
                  }}
                  setState={handleGalleryImageUpload}
                />
                <p className={styles.uploadHintText}>Add up to 10 gallery images.</p>
              </div>
              <label className={styles.fieldWide}>
                <span>Personal quote</span>
                <textarea
                  value={userData.personalQuote ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, personalQuote: event.target.value }))
                  }
                  rows={2}
                  placeholder="Write a short personal quote"
                />
              </label>
              <label className={styles.fieldWide}>
                <span>Signature</span>
                <textarea
                  value={userData.signature ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, signature: event.target.value }))
                  }
                  rows={2}
                  placeholder="Add a signature that appears on your profile"
                />
              </label>
              <label className={styles.field}> 
                <span>Favorite game type</span>
                <select
                  value={userData.favoriteGameType ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, favoriteGameType: event.target.value }))
                  }
                >
                  <option value="">Choose a game type</option>
                  <option value="Baccarat">Baccarat</option>
                  <option value="Bingo">Bingo</option>
                  <option value="Blackjack">Blackjack</option>
                  <option value="Slots">Slots</option>
                  <option value="Roulette">Roulette</option>
                  <option value="Poker">Poker</option>
                  <option value="Craps">Craps</option>
                  <option value="Keno">Keno</option>
                  <option value="Scratch Cards">Scratch Cards</option>
                </select>
              </label>
              <label className={styles.field}>
                <span>Preferred casino type</span>
                <select
                  value={userData.preferredCasinoType ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, preferredCasinoType: event.target.value }))
                  }
                >
                  <option value="">Choose a type</option>
                  <option value="Online">Online casinos</option>
                  <option value="Land Based">Land-based casinos</option>
                </select>
              </label>
              <label className={styles.field}>
                <span>First gamble year</span>
                <input
                  value={userData.firstGambleYear ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, firstGambleYear: event.target.value }))
                  }
                  placeholder="e.g. 2018"
                />
              </label>
              <label className={styles.field}>
                <span>Biggest win</span>
                <input
                  value={userData.biggestWin ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, biggestWin: event.target.value }))
                  }
                  placeholder="e.g. $1,200"
                />
              </label>
              <label className={styles.field}>
                <span>Favorite meal</span>
                <input
                  value={userData.favoriteMeal ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, favoriteMeal: event.target.value }))
                  }
                  placeholder="Your favorite meal"
                />
              </label>
              <label className={styles.field}>
                <span>Favorite movie</span>
                <input
                  value={userData.favoriteMovie ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, favoriteMovie: event.target.value }))
                  }
                  placeholder="Your favorite movie"
                />
              </label>
              <label className={styles.field}>
                <span>Favorite music genre</span>
                <input
                  value={userData.favoriteMusicGenre ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, favoriteMusicGenre: event.target.value }))
                  }
                  placeholder="Your favorite music genre"
                />
              </label>
              <label className={styles.field}>
                <span>Favorite season</span>
                <input
                  value={userData.favoriteSeason ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, favoriteSeason: event.target.value }))
                  }
                  placeholder="e.g. Summer"
                />
              </label>
              <label className={styles.switchField}>
                <span>Show flag next to username</span>
                <input
                  type="checkbox"
                  checked={userData.showFlagNextToUsername}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, showFlagNextToUsername: event.target.checked }))
                  }
                />
              </label>
              <label className={styles.switchField}>
                <span>Hide my gender</span>
                <input
                  type="checkbox"
                  checked={userData.hideGender}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, hideGender: event.target.checked }))
                  }
                />
              </label>
              <label className={styles.switchField}>
                <span>Subscribe to newsletter</span>
                <input
                  type="checkbox"
                  checked={userData.newsletterSubscribed}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, newsletterSubscribed: event.target.checked }))
                  }
                />
              </label>
              <label className={styles.fieldWide}>
                <span>Facebook profile</span>
                <input
                  value={userData.facebookProfile ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, facebookProfile: event.target.value }))
                  }
                  placeholder="https://facebook.com/username"
                />
              </label>
              <label className={styles.fieldWide}>
                <span>Twitter profile</span>
                <input
                  value={userData.twitterProfile ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, twitterProfile: event.target.value }))
                  }
                  placeholder="https://twitter.com/username"
                />
              </label>
              <label className={styles.fieldWide}>
                <span>Instagram profile</span>
                <input
                  value={userData.instagramProfile ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, instagramProfile: event.target.value }))
                  }
                  placeholder="https://instagram.com/username"
                />
              </label>
              <label className={styles.fieldWide}>
                <span>Referral code</span>
                <input
                  value={userData.referralCode ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, referralCode: event.target.value }))
                  }
                  placeholder="Your referral code"
                />
              </label>
            </div>

            <div className={styles.actionRow}>
              <button type="button" onClick={handleUpdateProfile} className={styles.primaryButton}>
                Save profile
              </button>
              {statusMessage && <span className={styles.statusText}>{statusMessage}</span>}
            </div>
          </section>
        );
      case 'settings':
        return (
          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>General account settings</h2>
                <p>Choose your notification consent and privacy summary.</p>
              </div>
              <div className={styles.badge}>{userData.verificationStatus}</div>
            </div>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <h3>Referral program</h3>
                <p>Your current referral code is <strong>{userData.referralCode || 'Not set'}</strong>.</p>
              </div>
              <div className={styles.featureItem}>
                <h3>Account tier</h3>
                <p>Your membership is <strong>{userData.userTier}</strong>.</p>
              </div>
              <div className={styles.featureItem}>
                <h3>Reward balance</h3>
                <p>
                  {userData.totalPoints} points · {userData.coins} coins · {userData.vipPoints} VIP points
                </p>
              </div>
            </div>

            <div className={styles.actionRow}>
              <button type="button" onClick={handleUpdateNotifications} className={styles.primaryButton}>
                Save general settings
              </button>
              {statusMessage && <span className={styles.statusText}>{statusMessage}</span>}
            </div>
          </section>
        );
      case 'notifications':
        return (
          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Notification controls</h2>
                <p>Choose how you receive alerts from Simocasino.</p>
              </div>
              <div className={styles.badge}>{userData.notificationsEnabled ? 'Enabled' : 'Paused'}</div>
            </div>

            <div className={styles.formGrid}>
              <label className={styles.switchField}>
                <span>Enable notifications</span>
                <input
                  type="checkbox"
                  checked={userData.notificationsEnabled}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, notificationsEnabled: event.target.checked }))
                  }
                />
              </label>
              <label className={styles.switchField}>
                <span>Email notifications</span>
                <input
                  type="checkbox"
                  checked={userData.emailNotifications}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, emailNotifications: event.target.checked }))
                  }
                />
              </label>
              <label className={styles.switchField}>
                <span>Push notifications</span>
                <input
                  type="checkbox"
                  checked={userData.pushNotifications}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, pushNotifications: event.target.checked }))
                  }
                />
              </label>
              <label className={styles.switchField}>
                <span>SMS notifications</span>
                <input
                  type="checkbox"
                  checked={userData.smsNotifications}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, smsNotifications: event.target.checked }))
                  }
                />
              </label>
            </div>

            <div className={styles.actionRow}>
              <button type="button" onClick={handleUpdateNotifications} className={styles.primaryButton}>
                Save notification settings
              </button>
              {statusMessage && <span className={styles.statusText}>{statusMessage}</span>}
            </div>
          </section>
        );
      case 'rewards': {
        const claimedToday = userData.lastDailyLoginAt?.split('T')[0] === new Date().toISOString().split('T')[0];
        return (
          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Reward center</h2>
                <p>Track your loyalty status, bonus actions, and daily reward progress.</p>
              </div>
              <div className={styles.badge}>Level {userData.currentLevel ?? 1}</div>
            </div>

            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <h3>Total points</h3>
                <p>{userData.totalPoints}</p>
              </div>
              <div className={styles.featureCard}>
                <h3>Coins</h3>
                <p>{userData.coins}</p>
              </div>
              <div className={styles.featureCard}>
                <h3>VIP points</h3>
                <p>{userData.vipPoints}</p>
              </div>
              <div className={styles.featureCard}>
                <h3>Streak</h3>
                <p>{userData.dailyLoginStreak} days</p>
              </div>
            </div>

            <div className={styles.profileCompletionPanel}>
              <div>
                <h3>Full profile completion bonus</h3>
                <p>
                  Your profile is <strong>{profileCompletionPercent}% complete</strong>. Complete the remaining fields to unlock milestone rewards.
                </p>
              </div>
              <table className={styles.profileCompletionTable}>
                <thead>
                  <tr>
                    <th>Milestone</th>
                    <th>XP</th>
                    <th>Coins</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>50% Profile Completed</td>
                    <td>20</td>
                    <td>5</td>
                    <td>{profileCompletionActions.includes('profile_50_complete') ? 'Claimed' : profileCompletionPercent >= 50 ? 'Ready' : 'Pending'}</td>
                  </tr>
                  <tr>
                    <td>80% Profile Completed</td>
                    <td>40</td>
                    <td>10</td>
                    <td>{profileCompletionActions.includes('profile_80_complete') ? 'Claimed' : profileCompletionPercent >= 80 ? 'Ready' : 'Pending'}</td>
                  </tr>
                  <tr>
                    <td>100% Profile Completed</td>
                    <td>80</td>
                    <td>20</td>
                    <td>{profileCompletionActions.includes('complete_profile') ? 'Claimed' : profileCompletionPercent >= 100 ? 'Ready' : 'Pending'}</td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.profileCompletionNotes}>
                <p><strong>🔥 Why this is powerful:</strong> Rewarding full profile completion increases personalization, trust, and retention.</p>
                <p><strong>🛡️ Safe for ads + affiliate:</strong> These milestones are real actions and avoid risky or misleading incentives.</p>
              </div>
            </div>

            <div className={styles.rewardInfo}>
              <button
                type="button"
                onClick={handleClaimDailyReward}
                className={styles.primaryButton}
                disabled={claimedToday}
              >
                {claimedToday ? 'Already claimed today' : 'Claim daily bonus'}
              </button>
              {statusMessage && <span className={styles.statusText}>{statusMessage}</span>}
            </div>
          </section>
        );
      }
      case 'security':
        return (
          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Security settings</h2>
                <p>Control account protection and recovery options here.</p>
              </div>
              <div className={styles.badge}>{userData.twoFactorEnabled ? '2FA Enabled' : '2FA Disabled'}</div>
            </div>

            <div className={styles.formGrid}>
              <label className={styles.switchField}>
                <span>Two-factor authentication</span>
                <input
                  type="checkbox"
                  checked={userData.twoFactorEnabled}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, twoFactorEnabled: event.target.checked }))
                  }
                />
              </label>
              <label className={styles.fieldWide}>
                <span>Recovery email</span>
                <input
                  type="email"
                  value={userData.recoveryEmail ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, recoveryEmail: event.target.value }))
                  }
                  placeholder="Recovery email address"
                />
              </label>
              <label className={styles.fieldWide}>
                <span>Recovery phone</span>
                <input
                  type="tel"
                  value={userData.recoveryPhone ?? ''}
                  onChange={(event) =>
                    setUserData((prev) => ({ ...prev, recoveryPhone: event.target.value }))
                  }
                  placeholder="Recovery phone number"
                />
              </label>
            </div>

            <div className={styles.actionRow}>
              <button type="button" onClick={handleUpdateSecurity} className={styles.primaryButton}>
                Save security settings
              </button>
              {statusMessage && <span className={styles.statusText}>{statusMessage}</span>}
            </div>
          </section>
        );
      case 'instructions':
        return (
          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Instructions & guides</h2>
                <p>Step-by-step help for every account feature, reward flow, and notification setting.</p>
              </div>
              <div className={styles.badge}>Guide</div>
            </div>

            <div className={styles.instructionsList}>
              <article>
                <h3>Profile</h3>
                <p>Update your display name, bio, avatar, and personal details to keep your account complete.</p>
              </article>
              <article>
                <h3>Settings</h3>
                <p>Enable or disable notifications and review your referral bonus summary from the account settings page.</p>
              </article>
              <article>
                <h3>Rewards</h3>
                <p>Claim your daily bonus in the reward center, monitor your points, and keep your streak active.</p>
              </article>
              <article>
                <h3>Security</h3>
                <p>Turn on two-factor authentication and add recovery contacts to protect your account.</p>
              </article>
            </div>
          </section>
        );
      default:
        return (
          <section className={styles.card}>
            <h2>{definition.title}</h2>
            <p>{definition.subtitle}</p>
            <div className={styles.placeholderBox}>
              <p>This section is under construction. Please use the sidebar to navigate to your profile, rewards, notifications, security, or instructions.</p>
            </div>
          </section>
        );
    }
  }, [auth.user?.id, handleClaimDailyReward, handleUpdateNotifications, handleUpdateProfile, handleUpdateSecurity, loading, currentPage, statusMessage, userData]);

  return (
    <HOMELayouts isUserPage>
      <div className={styles.userSectionPage}>
        <div className={styles.pageHeading}>
          <div>
            <h1>{definition.title}</h1>
            <p>{definition.subtitle}</p>
          </div>
          <div className={styles.userCard}>
            <div className={styles.avatar}>
              {displayProfileImage ? (
                <img
                  src={displayProfileImage}
                  alt={displayedName}
                  width={64}
                  height={64}
                  loading="lazy"
                />
              ) : (
                <span>{avatarInitial}</span>
              )}
            </div>
            <div>
              <p>{displayedName}</p>
              <small>{userData.email}</small>
            </div>
          </div>
        </div>
        {pageContent}
      </div>
    </HOMELayouts>
  );
}
