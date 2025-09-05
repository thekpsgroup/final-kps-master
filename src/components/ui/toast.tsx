"use client";
import { Toaster, toast } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

// Toast component with custom styling
export function ToastContainer() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          duration: 3000,
          icon: <CheckCircle className="h-5 w-5 text-green-400" />,
          style: {
            background: '#1f2937',
            border: '1px solid #10b981',
          },
        },
        error: {
          duration: 5000,
          icon: <XCircle className="h-5 w-5 text-red-400" />,
          style: {
            background: '#1f2937',
            border: '1px solid #ef4444',
          },
        },
        loading: {
          style: {
            background: '#1f2937',
            border: '1px solid #3b82f6',
          },
        },
      }}
    />
  );
}

// Toast utility functions
export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warning: (message: string) => toast(message, {
    icon: <AlertCircle className="h-5 w-5 text-yellow-400" />,
    style: {
      background: '#1f2937',
      border: '1px solid #f59e0b',
      color: '#fff',
    },
  }),
  info: (message: string) => toast(message, {
    icon: <Info className="h-5 w-5 text-blue-400" />,
    style: {
      background: '#1f2937',
      border: '1px solid #3b82f6',
      color: '#fff',
    },
  }),
  loading: (message: string) => toast.loading(message),
  dismiss: (toastId?: string) => toast.dismiss(toastId),
  promise: (
    promise: Promise<unknown>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages);
  },
};

// Export default toast function for backward compatibility
export { toast };
export default showToast;
