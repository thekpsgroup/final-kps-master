'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  persistent?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const newNotification: Notification = {
        ...notification,
        id,
        duration: notification.duration ?? 5000,
      };

      setNotifications((prev) => [...prev, newNotification]);

      // Auto-remove non-persistent notifications
      if (!newNotification.persistent) {
        setTimeout(() => {
          removeNotification(id);
        }, newNotification.duration);
      }
    },
    [removeNotification],
  );

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAll,
      }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onRemove={() => removeNotification(notification.id)}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function NotificationToast({
  notification,
  onRemove,
  index,
}: {
  notification: Notification;
  onRemove: () => void;
  index: number;
}) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '!';
      case 'info':
        return 'i';
      default:
        return 'i';
    }
  };

  const getStyles = () => {
    const baseStyles =
      'flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md max-w-sm';

    switch (notification.type) {
      case 'success':
        return cn(baseStyles, 'bg-green-50/95 border-green-200 text-green-800');
      case 'error':
        return cn(baseStyles, 'bg-red-50/95 border-red-200 text-red-800');
      case 'warning':
        return cn(baseStyles, 'bg-yellow-50/95 border-yellow-200 text-yellow-800');
      case 'info':
        return cn(baseStyles, 'bg-blue-50/95 border-blue-200 text-blue-800');
      default:
        return cn(baseStyles, 'bg-gray-50/95 border-gray-200 text-gray-800');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 40,
        delay: index * 0.1,
      }}
      className={getStyles()}
      role="alert"
      aria-live="assertive"
    >
      {/* Icon */}
      <div className="flex-shrink-0 text-xl mt-0.5">{getIcon()}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm leading-tight">{notification.title}</h4>
        {notification.message && (
          <p className="text-sm opacity-90 mt-1 leading-relaxed">{notification.message}</p>
        )}

        {/* Action Button */}
        {notification.action && (
          <button
            onClick={() => {
              notification.action?.onClick();
              onRemove();
            }}
            className="mt-2 text-xs font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1 rounded"
          >
            {notification.action.label}
          </button>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={onRemove}
        className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-current opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1 rounded"
        aria-label="Close notification"
      >
        <span className="text-sm">×</span>
      </button>

      {/* Progress Bar for Auto-dismiss */}
      {!notification.persistent && notification.duration && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-current opacity-20 rounded-b-xl"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{
            duration: notification.duration / 1000,
            ease: 'linear',
          }}
        />
      )}
    </motion.div>
  );
}

// Pre-built notification helpers
export const notificationHelpers = {
  success: (title: string, message?: string, options?: Partial<Notification>) => ({
    type: 'success' as const,
    title,
    message,
    ...options,
  }),

  error: (title: string, message?: string, options?: Partial<Notification>) => ({
    type: 'error' as const,
    title,
    message,
    ...options,
  }),

  warning: (title: string, message?: string, options?: Partial<Notification>) => ({
    type: 'warning' as const,
    title,
    message,
    ...options,
  }),

  info: (title: string, message?: string, options?: Partial<Notification>) => ({
    type: 'info' as const,
    title,
    message,
    ...options,
  }),
};

// Hook for easy notification creation
export function useNotificationActions() {
  const { addNotification } = useNotifications();

  return {
    success: (title: string, message?: string) =>
      addNotification(notificationHelpers.success(title, message)),
    error: (title: string, message?: string) =>
      addNotification(notificationHelpers.error(title, message)),
    warning: (title: string, message?: string) =>
      addNotification(notificationHelpers.warning(title, message)),
    info: (title: string, message?: string) =>
      addNotification(notificationHelpers.info(title, message)),
    custom: addNotification,
  };
}

// Inline notification component for forms/pages
export function InlineNotification({
  type,
  title,
  message,
  className,
  onDismissAction,
}: {
  type: Notification['type'];
  title: string;
  message?: string;
  className?: string;
  onDismissAction?: () => void;
}) {
  const getStyles = () => {
    const baseStyles = 'flex items-start gap-3 p-4 rounded-lg border';

    switch (type) {
      case 'success':
        return cn(baseStyles, 'bg-green-50 border-green-200 text-green-800');
      case 'error':
        return cn(baseStyles, 'bg-red-50 border-red-200 text-red-800');
      case 'warning':
        return cn(baseStyles, 'bg-yellow-50 border-yellow-200 text-yellow-800');
      case 'info':
        return cn(baseStyles, 'bg-blue-50 border-blue-200 text-blue-800');
      default:
        return cn(baseStyles, 'bg-gray-50 border-gray-200 text-gray-800');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(getStyles(), className)}
    >
      <div className="flex-shrink-0 text-lg">
        {type === 'success' && '✓'}
        {type === 'error' && '✕'}
        {type === 'warning' && '!'}
        {type === 'info' && 'i'}
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-sm">{title}</h4>
        {message && <p className="text-sm opacity-90 mt-1">{message}</p>}
      </div>

      {onDismissAction && (
        <button
          onClick={onDismissAction}
          className="flex-shrink-0 text-current opacity-60 hover:opacity-100"
        >
          <span className="text-sm">×</span>
        </button>
      )}
    </motion.div>
  );
}
