import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Casino Slice
interface Casino {
  id: string;
  name: string;
  country: string;
  slug?: string;
  description?: string;
  bonus: string;
  rating: number;
  revenueRank?: number;
  spins?: number;
  providers?: string[];
  likes?: number;
  comments?: number;
  operatingCountries?: string[];
  languages?: string[];
  license?: string;
  appAvailable?: boolean;
  minDeposit?: number;
  minWithdrawal?: number;
  withdrawalLimit?: number;
  withdrawalTime?: string;
  currencies?: string[];
  vipLevels?: number;
  vipRewards?: string[];
  liveCasinoAvailable?: boolean;
  supportEmail?: string;
  supportPhone?: string;
  avatarUrl?: string;
  imageUrl?: string;
  imageGallery?: string[];
  jackpotAmount?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  totalPlayers?: number;
  monthlyActivePlayers?: number;
  cryptoSupport?: boolean;
  popularGames?: string[];
  tournamentsActive?: boolean;
  leaderboardEnabled?: boolean;
  analyticsTracking?: boolean;
}


interface CasinoState {
  casinos: Casino[];
  selectedCountry: string;
  loading: boolean;
  error: string | null;
}

const initialCasinoState: CasinoState = {
  casinos: [],
  selectedCountry: 'United States',
  loading: false,
  error: null,
};

const casinoSlice = createSlice({
  name: 'casino',
  initialState: initialCasinoState,
  reducers: {
    setCasinos: (state, action: PayloadAction<Casino[]>) => {
      state.casinos = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Auth Slice
interface AuthUser {
  id: string;
  _id?: string;
  email: string;
  name: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  profileImage?: string;
  bannerImage?: string;
  imageGallery?: string[];
  bio?: string;
  personalQuote?: string;
  signature?: string;
  showFlagNextToUsername?: boolean;
  hideGender?: boolean;
  preferredCasinoType?: string;
  favoriteGameType?: string;
  firstGambleYear?: string;
  biggestWin?: string;
  favoriteMeal?: string;
  favoriteMovie?: string;
  favoriteMusicGenre?: string;
  favoriteSeason?: string;
  facebookProfile?: string;
  twitterProfile?: string;
  instagramProfile?: string;
  newsletterSubscribed?: boolean;
  location?: string;
  gender?: string;
  dateOfBirth?: string;
  userCountry?: string;
  userTier?: string;
  verificationStatus?: string;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  smsNotifications?: boolean;
  notificationsEnabled?: boolean;
  twoFactorEnabled?: boolean;
  recoveryEmail?: string;
  recoveryPhone?: string;
  totalPoints?: number;
  coins?: number;
  vipPoints?: number;
  currentLevel?: number;
  rewardActionsCompleted?: string[];
  dailyRewardsClaimed?: number;
  lastRewardAt?: string;
  dailyLoginStreak?: number;
  referralCode?: string;
  referredBy?: string;
  referralsCount?: number;
  referralEarnings?: number;
  totalEarnings?: number;
  pendingEarnings?: number;
  withdrawnEarnings?: number;
  affiliateClicks?: number;
  conversionCount?: number;
  pageViews?: number;
  engagementScore?: number;
  retentionScore?: number;
  likedCasinoIds?: string[];
  followedCasinoIds?: string[];
  favoriteCasinoId?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  lastDailyLoginAt?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const normalizeAuthUser = (user: AuthUser): AuthUser => {
  const normalized = { ...user };
  if (!normalized.id && normalized._id) {
    normalized.id = normalized._id;
  }
  if (normalized.profileImage && !normalized.avatarUrl) {
    normalized.avatarUrl = normalized.profileImage;
  }
  if (normalized.avatarUrl && !normalized.profileImage) {
    normalized.profileImage = normalized.avatarUrl;
  }
  return normalized;
};

const initialAuthState: AuthState = (() => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user) as AuthUser;
      const normalizedUser = normalizeAuthUser(parsed.id ? parsed : { ...parsed, id: parsed._id ?? '' });
      if (normalizedUser.id) {
        return { isAuthenticated: true, user: normalizedUser, loading: false, error: null };
      }
    }
  }
  return {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };
})();

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<AuthUser | null>
    ) => {
      let normalizedUser: AuthUser | null = action.payload;
      if (action.payload && !action.payload.id && action.payload._id) {
        normalizedUser = { ...action.payload, id: action.payload._id };
      }
      if (normalizedUser) {
        normalizedUser = normalizeAuthUser(normalizedUser);
      }
      if (normalizedUser && !normalizedUser.id) {
        normalizedUser = null;
      }
      state.user = normalizedUser;
      state.isAuthenticated = !!normalizedUser?.id;
      state.loading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        if (normalizedUser) {
          localStorage.setItem('user', JSON.stringify(normalizedUser));
        } else {
          localStorage.removeItem('user');
        }
      }
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
  },
});

// UI Slice
interface UIState {
  sidebarOpen: boolean;
  rightSidebarOpen: boolean;
  theme: 'light' | 'dark';
  showTopLoadingBar: boolean;
}

const initialUIState: UIState = {
  sidebarOpen: false,
  rightSidebarOpen: false,
  theme: 'light',
  showTopLoadingBar: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleRightSidebar: (state) => {
      state.rightSidebarOpen = !state.rightSidebarOpen;
    },
    setRightSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.rightSidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setShowTopLoadingBar: (state, action: PayloadAction<boolean>) => {
      state.showTopLoadingBar = action.payload;
    },
  },
});

export const { setCasinos, setSelectedCountry, setLoading, setError } =
  casinoSlice.actions;
export const { setUser, setAuthLoading, setAuthError, logout } =
  authSlice.actions;
export const { toggleSidebar, setSidebarOpen, toggleRightSidebar, setRightSidebarOpen, setTheme, setShowTopLoadingBar } =
  uiSlice.actions;

export const store = configureStore({
  reducer: {
    casino: casinoSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
