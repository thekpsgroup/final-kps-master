'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { useState } from 'react';

// Base loading spinner component
export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
} & HTMLMotionProps<'div'>) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-current',
    white: 'text-white',
    gray: 'text-gray-600',
  };

  return (
    <motion.div
      className={cn('inline-block', sizeClasses[size], colorClasses[color], className)}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
  );
}

// Pulsing dots loader
export function PulsingDots({
  size = 'md',
  color = 'primary',
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
} & HTMLMotionProps<'div'>) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const containerClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const colorClasses = {
    primary: 'bg-current',
    white: 'bg-white',
    gray: 'bg-gray-600',
  };

  return (
    <div className={cn('flex items-center', containerClasses[size], className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn('rounded-full', sizeClasses[size], colorClasses[color])}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Skeleton loader components
export function Skeleton({
  className,
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'rounded' | 'circular';
} & HTMLMotionProps<'div'>) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';

  const variantClasses = {
    default: 'rounded',
    rounded: 'rounded-lg',
    circular: 'rounded-full',
  };

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Card skeleton loader
export function CardSkeleton({ className }: { className?: string } & HTMLMotionProps<'div'>) {
  return (
    <div className={cn('p-6 border border-gray-200 rounded-xl', className)}>
      <div className="space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex space-x-3">
          <Skeleton variant="circular" className="w-8 h-8" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Text skeleton loader
export function TextSkeleton({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
} & HTMLMotionProps<'div'>) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className={cn('h-4', index === lines - 1 ? 'w-3/4' : 'w-full')} />
      ))}
    </div>
  );
}

// Avatar skeleton loader
export function AvatarSkeleton({
  size = 'md',
  showText = false,
  className,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
} & HTMLMotionProps<'div'>) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <Skeleton variant="circular" className={sizeClasses[size]} />
      {showText && (
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      )}
    </div>
  );
}

// Table skeleton loader
export function TableSkeleton({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
} & HTMLMotionProps<'div'>) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Header */}
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={`header-${index}`} className="h-4 flex-1" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              className={cn('h-4 flex-1', colIndex === columns - 1 ? 'w-20' : '')}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Progressive loading wrapper
export function ProgressiveLoader({
  isLoading,
  children,
  loader: Loader = CardSkeleton,
  className,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loader?: React.ComponentType<{ className?: string }>;
  className?: string;
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading ? <Loader /> : children}
    </motion.div>
  );
}

// Content reveal animation
export function ContentReveal({
  isLoaded,
  children,
  direction = 'up',
  delay = 0,
  className,
}: {
  isLoaded: boolean;
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  className?: string;
} & HTMLMotionProps<'div'>) {
  const directionVariants = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    fade: { opacity: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={directionVariants[direction]}
      animate={isLoaded ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{
        duration: 0.5,
        delay: isLoaded ? delay : 0,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Loading overlay for existing content
export function LoadingOverlay({
  isLoading,
  children,
  message = 'Loading...',
  className,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
} & HTMLMotionProps<'div'>) {
  return (
    <div className={cn('relative', className)}>
      {children}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10"
          >
            <div className="text-center">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-gray-600 font-medium">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Button loading state
export function ButtonWithLoader({
  isLoading,
  loadingText = 'Loading...',
  children,
  className,
  ...props
}: {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
} & HTMLMotionProps<'button'>) {
  return (
    <motion.button
      className={cn(
        'relative inline-flex items-center justify-center',
        isLoading && 'cursor-not-allowed',
        className,
      )}
      disabled={isLoading}
      whileTap={!isLoading ? { scale: 0.98 } : undefined}
      {...props}
    >
      <motion.div
        className="flex items-center gap-2"
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <LoadingSpinner size="sm" color="white" />
            <span className="ml-2 text-sm">{loadingText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Page loading state
export function PageLoader({
  isLoading,
  message = 'Loading page...',
  className,
  ...props
}: {
  isLoading: boolean;
  message?: string;
  className?: string;
} & HTMLMotionProps<'div'>) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn('fixed inset-0 bg-white z-50 flex items-center justify-center', className)}
      {...props}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <LoadingSpinner size="xl" className="mb-6" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 font-medium"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}

// Infinite scroll loader
export function InfiniteScrollLoader({
  isLoading,
  hasMore = true,
  className,
  ...props
}: {
  isLoading: boolean;
  hasMore?: boolean;
  className?: string;
} & HTMLMotionProps<'div'>) {
  if (!isLoading || !hasMore) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn('flex justify-center py-8', className)}
      {...props}
    >
      <div className="text-center">
        <PulsingDots className="mb-3" />
        <p className="text-sm text-gray-500">Loading more...</p>
      </div>
    </motion.div>
  );
}

// Image loading with placeholder
export function ImageWithLoader({
  src,
  alt,
  className,
  placeholderClassName,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
} & HTMLMotionProps<'img'>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn('relative', className)}>
      {!isLoaded && !hasError && (
        <Skeleton className={cn('absolute inset-0', placeholderClassName)} variant="rounded" />
      )}

      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn('w-full h-full object-cover', className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      />

      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
            <p className="text-sm">Image failed to load</p>
          </div>
        </div>
      )}
    </div>
  );
}
