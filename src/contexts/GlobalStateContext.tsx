"use client";
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { designTokens, applyDesignTokens } from '@/lib/designTokens';

// Global State Types
interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  colorScheme: 'default' | 'high-contrast' | 'color-blind';
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  language: string;
}

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  duration: number;
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

interface AppState {
  // User preferences
  preferences: UserPreferences;

  // Cookie consent
  cookies: CookiePreferences;
  hasCookieConsent: boolean;

  // UI state
  sidebarOpen: boolean;
  modalOpen: boolean;
  loading: boolean;

  // Notifications
  notifications: NotificationSettings;

  // Performance
  performanceMode: boolean;
  networkQuality: 'slow' | 'fast' | 'unknown';

  // User context
  userId?: string;
  sessionId: string;
  lastActivity: Date;

  // Feature flags
  features: Record<string, boolean>;
}

type AppAction =
  | { type: 'SET_PREFERENCE'; key: keyof UserPreferences; value: unknown }
  | { type: 'SET_COOKIE_PREFERENCE'; key: keyof CookiePreferences; value: boolean }
  | { type: 'SET_COOKIE_CONSENT'; consent: boolean }
  | { type: 'SET_UI_STATE'; key: 'sidebarOpen' | 'modalOpen' | 'loading'; value: boolean }
  | { type: 'SET_NOTIFICATION_SETTING'; key: keyof NotificationSettings; value: unknown }
  | { type: 'SET_PERFORMANCE_MODE'; enabled: boolean }
  | { type: 'SET_NETWORK_QUALITY'; quality: 'slow' | 'fast' | 'unknown' }
  | { type: 'UPDATE_ACTIVITY' }
  | { type: 'SET_FEATURE_FLAG'; feature: string; enabled: boolean }
  | { type: 'LOAD_STATE'; state: Partial<AppState> }
  | { type: 'RESET_TO_DEFAULTS' };

// Default state
const defaultState: AppState = {
  preferences: {
    theme: 'auto',
    colorScheme: 'default',
    reducedMotion: false,
    fontSize: 'medium',
    language: 'en'
  },
  cookies: {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  },
  hasCookieConsent: false,
  sidebarOpen: false,
  modalOpen: false,
  loading: false,
  notifications: {
    enabled: true,
    sound: false,
    duration: 5000,
    position: 'top-right'
  },
  performanceMode: false,
  networkQuality: 'unknown',
  sessionId: '',
  lastActivity: new Date(),
  features: {
    'advanced-animations': true,
    'dark-mode': true,
    'notifications': true,
    'analytics': false
  }
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PREFERENCE':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          [action.key]: action.value
        }
      };

    case 'SET_COOKIE_PREFERENCE':
      return {
        ...state,
        cookies: {
          ...state.cookies,
          [action.key]: action.value
        }
      };

    case 'SET_COOKIE_CONSENT':
      return {
        ...state,
        hasCookieConsent: action.consent
      };

    case 'SET_UI_STATE':
      return {
        ...state,
        [action.key]: action.value
      };

    case 'SET_NOTIFICATION_SETTING':
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.key]: action.value
        }
      };

    case 'SET_PERFORMANCE_MODE':
      return {
        ...state,
        performanceMode: action.enabled
      };

    case 'SET_NETWORK_QUALITY':
      return {
        ...state,
        networkQuality: action.quality
      };

    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        lastActivity: new Date()
      };

    case 'SET_FEATURE_FLAG':
      return {
        ...state,
        features: {
          ...state.features,
          [action.feature]: action.enabled
        }
      };

    case 'LOAD_STATE':
      return {
        ...state,
        ...action.state
      };

    case 'RESET_TO_DEFAULTS':
      return defaultState;

    default:
      return state;
  }
}

// Context
interface GlobalStateContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;

  // Helper functions
  setPreference: (key: keyof UserPreferences, value: unknown) => void;
  setCookiePreference: (key: keyof CookiePreferences, value: boolean) => void;
  setCookieConsent: (consent: boolean) => void;
  setUIState: (key: 'sidebarOpen' | 'modalOpen' | 'loading', value: boolean) => void;
  setNotificationSetting: (key: keyof NotificationSettings, value: unknown) => void;
  setPerformanceMode: (enabled: boolean) => void;
  setNetworkQuality: (quality: 'slow' | 'fast' | 'unknown') => void;
  updateActivity: () => void;
  setFeatureFlag: (feature: string, enabled: boolean) => void;
  resetToDefaults: () => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | null>(null);

// Provider component
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  // Helper functions
  const helpers = {
    setPreference: (key: keyof UserPreferences, value: unknown) =>
      dispatch({ type: 'SET_PREFERENCE', key, value }),

    setCookiePreference: (key: keyof CookiePreferences, value: boolean) =>
      dispatch({ type: 'SET_COOKIE_PREFERENCE', key, value }),

    setCookieConsent: (consent: boolean) =>
      dispatch({ type: 'SET_COOKIE_CONSENT', consent }),

    setUIState: (key: 'sidebarOpen' | 'modalOpen' | 'loading', value: boolean) =>
      dispatch({ type: 'SET_UI_STATE', key, value }),

    setNotificationSetting: (key: keyof NotificationSettings, value: unknown) =>
      dispatch({ type: 'SET_NOTIFICATION_SETTING', key, value }),

    setPerformanceMode: (enabled: boolean) =>
      dispatch({ type: 'SET_PERFORMANCE_MODE', enabled }),

    setNetworkQuality: (quality: 'slow' | 'fast' | 'unknown') =>
      dispatch({ type: 'SET_NETWORK_QUALITY', quality }),

    updateActivity: () =>
      dispatch({ type: 'UPDATE_ACTIVITY' }),

    setFeatureFlag: (feature: string, enabled: boolean) =>
      dispatch({ type: 'SET_FEATURE_FLAG', feature, enabled }),

    resetToDefaults: () =>
      dispatch({ type: 'RESET_TO_DEFAULTS' })
  };

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('globalState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', state: parsedState });
      }

      // Generate session ID
      const sessionId = localStorage.getItem('sessionId') ||
        Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem('sessionId', sessionId);

      dispatch({
        type: 'LOAD_STATE',
        state: { sessionId }
      });
    } catch (error) {
      console.warn('Failed to load state from localStorage:', error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const stateToSave = {
        preferences: state.preferences,
        cookies: state.cookies,
        hasCookieConsent: state.hasCookieConsent,
        notifications: state.notifications,
        features: state.features
      };
      localStorage.setItem('globalState', JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save state to localStorage:', error);
    }
  }, [state.preferences, state.cookies, state.hasCookieConsent, state.notifications, state.features]);

  // Apply design tokens when preferences change
  useEffect(() => {
    applyDesignTokens();

    // Apply theme to document
    const theme = state.preferences.theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Auto theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [state.preferences.theme]);

  // Apply performance mode
  useEffect(() => {
    if (state.performanceMode) {
      document.documentElement.classList.add('performance-mode');
    } else {
      document.documentElement.classList.remove('performance-mode');
    }
  }, [state.performanceMode]);

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      dispatch({ type: 'UPDATE_ACTIVITY' });
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  // Detect network quality
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        const updateNetworkQuality = () => {
          const quality = connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'
            ? 'slow' : 'fast';
          dispatch({ type: 'SET_NETWORK_QUALITY', quality });
        };

        updateNetworkQuality();
        connection.addEventListener('change', updateNetworkQuality);

        return () => connection.removeEventListener('change', updateNetworkQuality);
      }
    }
  }, []);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch, ...helpers }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// Hook to use global state
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within GlobalStateProvider');
  }
  return context;
}

// Specialized hooks for specific state slices
export function usePreferences() {
  const { state, setPreference } = useGlobalState();
  return { preferences: state.preferences, setPreference };
}

export function useCookies() {
  const { state, setCookiePreference, setCookieConsent } = useGlobalState();
  return {
    cookies: state.cookies,
    hasCookieConsent: state.hasCookieConsent,
    setCookiePreference,
    setCookieConsent
  };
}

export function useUIState() {
  const { state, setUIState } = useGlobalState();
  return {
    sidebarOpen: state.sidebarOpen,
    modalOpen: state.modalOpen,
    loading: state.loading,
    setUIState
  };
}

export function useNotifications() {
  const { state, setNotificationSetting } = useGlobalState();
  return { notifications: state.notifications, setNotificationSetting };
}

export function usePerformance() {
  const { state, setPerformanceMode, setNetworkQuality } = useGlobalState();
  return {
    performanceMode: state.performanceMode,
    networkQuality: state.networkQuality,
    setPerformanceMode,
    setNetworkQuality
  };
}

export function useFeatures() {
  const { state, setFeatureFlag } = useGlobalState();
  return { features: state.features, setFeatureFlag };
}

// Middleware for side effects
export function createStateMiddleware() {
  return (action: AppAction, state: AppState) => {
    // Analytics tracking
    if (action.type === 'SET_PREFERENCE') {
      // Track preference changes
      if (window.gtag && state.cookies.analytics) {
        window.gtag('event', 'preference_changed', {
          preference: action.key,
          value: action.value
        });
      }
    }

    // Cookie consent handling
    if (action.type === 'SET_COOKIE_CONSENT') {
      if (window.gtag) {
        if (action.consent) {
          window.gtag('consent', 'update', {
            analytics_storage: state.cookies.analytics ? 'granted' : 'denied',
            ad_storage: state.cookies.marketing ? 'granted' : 'denied'
          });
        }
      }
    }

    // Performance monitoring
    if (action.type === 'SET_PERFORMANCE_MODE') {
      if (window.gtag && state.cookies.analytics) {
        window.gtag('event', 'performance_mode', {
          enabled: action.enabled
        });
      }
    }

    return action;
  };
}

// Persistence utilities
export const persistence = {
  save: (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
  },

  load: function<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove ${key} from localStorage:`, error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
};

// Export types for external use
export type { AppState, UserPreferences, CookiePreferences, NotificationSettings };
