'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieConsentProps {
  position?: 'bottom' | 'top' | 'bottom-left' | 'bottom-right';
  theme?: 'light' | 'dark' | 'auto';
  showSettings?: boolean;
  onAccept?: (preferences: CookiePreferences) => void;
  onDecline?: () => void;
  className?: string;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true and non-dismissible
  analytics: false,
  marketing: false,
  functional: false,
};

export default function CookieConsent({
  position = 'bottom',
  theme = 'auto',
  showSettings = true,
  onAccept,
  onDecline,
  className,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(false);

  // Check if consent has already been given
  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsent');
    const savedPreferences = localStorage.getItem('cookiePreferences');

    if (!consentGiven) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({ ...defaultPreferences, ...parsed });
      } catch (error) {
        console.warn('Failed to parse saved cookie preferences:', error);
      }
    }
  }, []);

  // Determine theme
  const currentTheme =
    theme === 'auto'
      ? document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light'
      : theme;

  const handleAcceptAll = async () => {
    setIsLoading(true);
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };

    try {
      await savePreferences(allPreferences);
      onAccept?.(allPreferences);
      setIsVisible(false);
    } catch (error) {
      console.error('Failed to save cookie preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptNecessary = async () => {
    setIsLoading(true);
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };

    try {
      await savePreferences(necessaryOnly);
      onDecline?.();
      setIsVisible(false);
    } catch (error) {
      console.error('Failed to save cookie preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomSettings = async () => {
    setIsLoading(true);
    try {
      await savePreferences(preferences);
      onAccept?.(preferences);
      setIsVisible(false);
    } catch (error) {
      console.error('Failed to save cookie preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async (prefs: CookiePreferences): Promise<void> => {
    return new Promise((resolve) => {
      localStorage.setItem('cookieConsent', 'true');
      localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
      localStorage.setItem('cookieConsentDate', new Date().toISOString());

      // Apply preferences to tracking/analytics
      if (prefs.analytics && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
      }

      if (prefs.marketing && window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
        });
      }

      // Small delay to simulate async operation
      setTimeout(resolve, 300);
    });
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Necessary cookies are always enabled
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const positionClasses = {
    bottom: 'fixed bottom-0 left-0 right-0 z-50',
    top: 'fixed top-0 left-0 right-0 z-50',
    'bottom-left': 'fixed bottom-6 left-6 max-w-sm z-50',
    'bottom-right': 'fixed bottom-6 right-6 max-w-sm z-50',
  };

  const themeClasses = {
    light: 'bg-white border-gray-200 text-gray-900',
    dark: 'bg-gray-900 border-gray-700 text-white',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position.includes('bottom') ? 100 : -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position.includes('bottom') ? 100 : -100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'border shadow-2xl',
            positionClasses[position],
            themeClasses[currentTheme],
            className,
          )}
        >
          {/* Main Banner */}
          <AnimatePresence mode="wait">
            {!showDetailed ? (
              <motion.div
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <div className="flex items-start gap-4">
                  {/* Cookie Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="flex-shrink-0"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-orange-600">C</span>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-semibold text-lg mb-2"
                    >
                      We value your privacy
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-sm opacity-80 mb-4 leading-relaxed"
                    >
                      We use cookies to enhance your browsing experience, serve personalized
                      content, and analyze our traffic. By clicking &quot;Accept All&quot;, you
                      consent to our use of cookies.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <motion.button
                        onClick={handleAcceptAll}
                        disabled={isLoading}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLoading ? 'Saving...' : 'Accept All'}
                      </motion.button>

                      {showSettings && (
                        <motion.button
                          onClick={() => setShowDetailed(true)}
                          disabled={isLoading}
                          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Customize
                        </motion.button>
                      )}

                      <motion.button
                        onClick={handleAcceptNecessary}
                        disabled={isLoading}
                        className="px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLoading ? '...' : 'Necessary Only'}
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Close Button */}
                  <motion.button
                    onClick={handleAcceptNecessary}
                    disabled={isLoading}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close cookie banner"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="detailed"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Cookie Preferences</h3>
                  <motion.button
                    onClick={() => setShowDetailed(false)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Back to main banner"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Cookie Categories */}
                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <CookieCategory
                    title="Necessary Cookies"
                    description="Essential for the website to function properly. Cannot be disabled."
                    required={true}
                    enabled={true}
                    onChange={() => {}}
                  />

                  {/* Analytics Cookies */}
                  <CookieCategory
                    title="Analytics Cookies"
                    description="Help us understand how visitors interact with our website."
                    enabled={preferences.analytics}
                    onChange={(enabled) => updatePreference('analytics', enabled)}
                  />

                  {/* Marketing Cookies */}
                  <CookieCategory
                    title="Marketing Cookies"
                    description="Used to deliver personalized advertisements and track campaign effectiveness."
                    enabled={preferences.marketing}
                    onChange={(enabled) => updatePreference('marketing', enabled)}
                  />

                  {/* Functional Cookies */}
                  <CookieCategory
                    title="Functional Cookies"
                    description="Enable enhanced functionality and personalization."
                    enabled={preferences.functional}
                    onChange={(enabled) => updatePreference('functional', enabled)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={handleCustomSettings}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? 'Saving...' : 'Save Preferences'}
                  </motion.button>

                  <motion.button
                    onClick={handleAcceptAll}
                    disabled={isLoading}
                    className="px-6 py-3 text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Accept All
                  </motion.button>
                </div>

                {/* Privacy Policy Link */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-gray-500 mt-4 text-center"
                >
                  For more information, see our{' '}
                  <a href="/privacy" className="underline hover:no-underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="/terms" className="underline hover:no-underline">
                    Terms of Service
                  </a>
                  .
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Cookie Category Component
function CookieCategory({
  title,
  description,
  enabled,
  required = false,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  required?: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-medium">{title}</h4>
          {required && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              Required
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {!required && (
        <motion.button
          onClick={() => onChange(!enabled)}
          className={cn(
            'relative w-12 h-6 rounded-full transition-colors',
            enabled ? 'bg-blue-600' : 'bg-gray-300',
          )}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-5 h-5 bg-white rounded-full shadow-sm"
            animate={{ x: enabled ? 6 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.button>
      )}
    </motion.div>
  );
}

// Cookie settings modal for advanced users
export function CookieSettingsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="text-sm text-gray-600 hover:text-gray-900 underline"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Cookie Settings
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Cookie Settings</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <CookieConsent
                  position="top"
                  showSettings={false}
                  onAccept={() => setIsOpen(false)}
                  onDecline={() => setIsOpen(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hook for managing cookie preferences
export function useCookiePreferences() {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    const savedPrefs = localStorage.getItem('cookiePreferences');

    setHasConsent(consent === 'true');

    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        setPreferences({ ...defaultPreferences, ...parsed });
      } catch (error) {
        console.warn('Failed to parse cookie preferences:', error);
      }
    }
  }, []);

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem('cookiePreferences', JSON.stringify(updated));

    // Update Google Analytics consent if available
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: updated.analytics ? 'granted' : 'denied',
        ad_storage: updated.marketing ? 'granted' : 'denied',
      });
    }
  };

  return {
    preferences,
    hasConsent,
    updatePreferences,
    canUseAnalytics: preferences.analytics,
    canUseMarketing: preferences.marketing,
    canUseFunctional: preferences.functional,
  };
}

// Utility function to check if a specific cookie category is allowed
export function canUseCookies(category: keyof CookiePreferences): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const consent = localStorage.getItem('cookieConsent');
    if (consent !== 'true') return category === 'necessary';

    const savedPrefs = localStorage.getItem('cookiePreferences');
    if (!savedPrefs) return category === 'necessary';

    const preferences = JSON.parse(savedPrefs);
    return preferences[category] || false;
  } catch {
    return category === 'necessary';
  }
}
