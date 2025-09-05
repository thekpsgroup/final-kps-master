"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service (e.g., Sentry)
    console.error('Error caught by boundary:', error, errorInfo);

    // In production, you would send this to your error monitoring service
    // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  resetError: () => void;
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left bg-gray-100 p-4 rounded-lg">
            <summary className="cursor-pointer font-medium text-gray-900 mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words">
              {error.stack}
            </pre>
          </details>
        )}

        <div className="space-y-3">
          <Button
            onClick={resetError}
            className="w-full bg-kpsGold text-kpsNavy hover:bg-kpsGold/90 font-medium"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

// Hook for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: { componentStack?: string }) => {
    console.error('Error handled by hook:', error, errorInfo);

    // In production, send to error monitoring
    // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo?.componentStack } } });
  };
}
