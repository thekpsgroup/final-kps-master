import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-kpsNavy/20 border-t-kpsGold rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        aria-label="Loading"
      />
    </div>
  );
}

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

export function PageLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-kpsNavy/5 to-kpsGold/5">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-600 font-medium">Loading your experience...</p>
      </div>
    </div>
  );
}
