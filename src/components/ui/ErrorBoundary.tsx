'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showRetry?: boolean;
  className?: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2),
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error for monitoring
    console.error('Error Boundary caught an error:', error, errorInfo);

    // Call optional error handler
    this.props.onError?.(error, errorInfo);

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          errorId={this.state.errorId}
          onRetry={this.props.showRetry !== false ? this.handleRetry : undefined}
          className={this.props.className}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  errorId: string;
  onRetry?: () => void;
  className?: string;
}

function ErrorFallback({ error, errorId, onRetry, className }: ErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn('min-h-[400px] flex items-center justify-center p-8', className)}
    >
      <div className="max-w-lg mx-auto text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </motion.div>

        {/* Error Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-4"
        >
          Oops! Something went wrong
        </motion.h2>

        {/* Error Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          We encountered an unexpected error. Our team has been notified and is working to fix it.
        </motion.p>

        {/* Error Details (Development Only) */}
        {isDevelopment && error && (
          <motion.details
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 text-left bg-gray-50 rounded-lg p-4 border"
          >
            <summary className="cursor-pointer font-medium text-gray-900 mb-2">
              Error Details (Development)
            </summary>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <strong>Error:</strong> {error.message}
              </div>
              <div>
                <strong>Component Stack:</strong>
                <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {error.stack}
                </pre>
              </div>
              <div>
                <strong>Error ID:</strong> {errorId}
              </div>
            </div>
          </motion.details>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          {onRetry && (
            <motion.button
              onClick={onRetry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </motion.button>
          )}

          <motion.button
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Reload Page
          </motion.button>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-2">Still having issues?</p>
          <a
            href="mailto:sales@thekpsgroup.com"
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Specialized error boundaries for different contexts

export function PageErrorBoundary({ children, ...props }: ErrorBoundaryProps) {
  return (
    <ErrorBoundary
      {...props}
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <ErrorFallback
            error={null}
            errorId="page-error"
            onRetry={() => window.location.reload()}
          />
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function ComponentErrorBoundary({
  children,
  fallback: Fallback,
  ...props
}: ErrorBoundaryProps & {
  fallback?: React.ComponentType<{ error: Error | null; retry: () => void }>;
}) {
  return (
    <ErrorBoundary
      {...props}
      fallback={
        Fallback ? (
          <Fallback error={null} retry={() => window.location.reload()} />
        ) : (
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-red-600">!</div>
              <div className="text-red-800">
                <div className="font-medium">Component Error</div>
                <div className="text-sm">This component failed to load properly.</div>
              </div>
            </div>
          </div>
        )
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function AsyncErrorBoundary({
  children,
  loadingFallback,
  ...props
}: ErrorBoundaryProps & { loadingFallback?: ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading && loadingFallback) {
    return <>{loadingFallback}</>;
  }

  return (
    <ErrorBoundary
      {...props}
      fallback={
        <div className="p-8 text-center">
          <div className="text-6xl mb-4 text-gray-600">!</div>
          <h3 className="text-xl font-semibold mb-2">Loading Failed</h3>
          <p className="text-gray-600 mb-4">
            We couldn&apos;t load this content. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// Error recovery hook
export function useErrorRecovery() {
  const [error, setError] = React.useState<Error | null>(null);
  const [recoveryAttempts, setRecoveryAttempts] = React.useState(0);

  const recover = React.useCallback(() => {
    setError(null);
    setRecoveryAttempts((prev) => prev + 1);
  }, []);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
    // Log to error reporting service
    console.error('Error caught by recovery hook:', error);
  }, []);

  return {
    error,
    recoveryAttempts,
    recover,
    handleError,
    isRecovering: recoveryAttempts > 0,
  };
}

// Network error boundary
export function NetworkErrorBoundary({ children, ...props }: ErrorBoundaryProps) {
  return (
    <ErrorBoundary
      {...props}
      onError={(error) => {
        // Check if it's a network error
        if (error.message.includes('fetch') || error.message.includes('network')) {
          console.warn('Network error detected:', error);
        }
      }}
      fallback={
        <div className="min-h-[300px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                className="w-8 h-8 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connection Issue</h3>
            <p className="text-gray-600 mb-6">
              We&apos;re having trouble connecting. Please check your internet connection and try
              again.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Retry
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// Form error boundary
export function FormErrorBoundary({ children, ...props }: ErrorBoundaryProps) {
  return (
    <ErrorBoundary
      {...props}
      fallback={
        <div className="p-6 border border-red-200 bg-red-50 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-red-600 text-xl">!</div>
            <div>
              <h3 className="font-semibold text-red-800">Form Error</h3>
              <p className="text-red-700 text-sm">Something went wrong with the form</p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reload Form
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// Global error handler for unhandled errors
export function setupGlobalErrorHandler() {
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      // Send to error reporting service
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Send to error reporting service
    });
  }
}

// Error reporting utility
export class ErrorReporter {
  static report(error: Error, context?: Record<string, unknown>) {
    console.error('Error reported:', error, context);

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example implementation:
      // fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     message: error.message,
      //     stack: error.stack,
      //     context,
      //     timestamp: new Date().toISOString(),
      //     userAgent: navigator.userAgent,
      //     url: window.location.href
      //   })
      // });
    }
  }
}

// Error recovery strategies
export const RecoveryStrategies = {
  retry: (fn: () => Promise<unknown>, maxAttempts = 3, delay = 1000) => {
    return new Promise(async (resolve, reject) => {
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          const result = await fn();
          resolve(result);
          return;
        } catch (error) {
          if (attempt === maxAttempts) {
            reject(error);
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, delay * attempt));
        }
      }
    });
  },

  fallback: function <T>(fn: () => T, fallbackValue: T): T {
    try {
      return fn();
    } catch {
      return fallbackValue;
    }
  },

  graceful: (fn: () => unknown, fallbackFn?: () => unknown) => {
    try {
      return fn();
    } catch (error) {
      console.warn('Graceful degradation:', error);
      return fallbackFn ? fallbackFn() : null;
    }
  },
};
