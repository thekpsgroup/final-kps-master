'use client';
import { designTokens, motionVariants } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, useState } from 'react';

interface UniversalInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  rows?: number;
  value?: string;
  defaultValue?: string;
  options?: string[] | { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  error?: string | null;
  touched?: boolean;
  success?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  helpText?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  // Theme variants
  variant?: 'default' | 'minimal' | 'glass' | 'solid';
  size?: 'sm' | 'md' | 'lg';
}

const UniversalInput = forwardRef<HTMLInputElement, UniversalInputProps>(
  (
    {
      label,
      name,
      type = 'text',
      required,
      rows = 4,
      value,
      defaultValue,
      options,
      placeholder,
      className,
      error,
      touched,
      success,
      loading,
      icon,
      helpText,
      onChange,
      onBlur,
      onFocus,
      variant = 'default',
      size = 'md',
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!(value || defaultValue));

    const hasError = touched && error;
    const hasSuccess = touched && success && !error;

    // Size variants
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    // Variant styles
    const variantClasses = {
      default: cn(
        'bg-white/50 backdrop-blur-sm border-2',
        hasError
          ? 'border-red-300 focus:border-red-500'
          : hasSuccess
          ? 'border-green-300 focus:border-green-500'
          : 'border-black/10 focus:border-primary-500',
      ),
      minimal: cn(
        'bg-transparent border-b-2 rounded-none',
        hasError
          ? 'border-red-400'
          : hasSuccess
          ? 'border-green-400'
          : 'border-gray-300 focus:border-primary-500',
      ),
      glass: cn(
        'bg-white/20 backdrop-blur-md border border-white/30',
        'focus:bg-white/30 focus:border-white/50',
      ),
      solid: cn(
        'bg-white border-2 border-gray-200',
        hasError ? 'border-red-300' : hasSuccess ? 'border-green-300' : 'focus:border-primary-500',
      ),
    };

    const baseClasses = cn(
      'w-full rounded-xl transition-all duration-300 focus:outline-none',
      'focus:ring-4 focus:ring-primary-500/20',
      sizeClasses[size],
      variantClasses[variant],
      focused && 'shadow-lg shadow-primary-500/10',
      loading && 'opacity-50 cursor-not-allowed',
      className,
    );

    const labelClasses = cn(
      'absolute left-4 transition-all duration-300 pointer-events-none font-medium',
      focused || hasValue
        ? hasError
          ? 'top-2 text-xs text-red-500 transform -translate-y-1'
          : hasSuccess
          ? 'top-2 text-xs text-green-600 transform -translate-y-1'
          : 'top-2 text-xs text-primary-600 transform -translate-y-1'
        : 'top-3.5 text-sm text-gray-500',
    );

    const handleFocus = () => {
      setFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setFocused(false);
      onBlur?.();
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const newValue = e.target.value;
      setHasValue(newValue.length > 0);
      onChange?.(newValue);
    };

    return (
      <motion.div variants={motionVariants.formField} className="relative">
        {/* Floating Label */}
        <motion.label
          className={labelClasses}
          animate={{
            y: focused || hasValue ? -2 : 0,
            scale: focused || hasValue ? 0.85 : 1,
            color: hasError
              ? designTokens.colors.semantic.error
              : hasSuccess
              ? designTokens.colors.semantic.success
              : focused
              ? designTokens.colors.primary[500]
              : designTokens.colors.primary[500],
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label}
          {required && (
            <motion.span className="text-red-500 ml-1" animate={{ opacity: focused ? 1 : 0.7 }}>
              *
            </motion.span>
          )}
        </motion.label>

        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <div className="relative">
          {type === 'textarea' ? (
            <motion.textarea
              ref={ref as unknown as React.RefObject<HTMLTextAreaElement>}
              name={name}
              rows={rows}
              className={cn(baseClasses, 'pt-6 resize-none', icon && 'pl-10')}
              required={required}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={loading}
              whileFocus={{ scale: 1.01 }}
              animate={hasError ? motionVariants.shake.animate : {}}
            />
          ) : type === 'select' && options ? (
            <motion.select
              ref={ref as unknown as React.RefObject<HTMLSelectElement>}
              name={name}
              className={cn(baseClasses, 'pt-6', icon && 'pl-10')}
              required={required}
              value={value}
              defaultValue={defaultValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={loading}
              whileFocus={{ scale: 1.01 }}
              animate={hasError ? motionVariants.shake.animate : {}}
            >
              {options.map((option) => {
                const optionValue = typeof option === 'string' ? option : option.value;
                const optionLabel = typeof option === 'string' ? option : option.label;
                return (
                  <option key={optionValue} value={optionValue}>
                    {optionLabel}
                  </option>
                );
              })}
            </motion.select>
          ) : (
            <motion.input
              ref={ref}
              type={type}
              name={name}
              className={cn(baseClasses, 'pt-6', icon && 'pl-10')}
              required={required}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={loading}
              whileFocus={{ scale: 1.01 }}
              animate={hasError ? motionVariants.shake.animate : {}}
            />
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <motion.div
                className="w-5 h-5 border-2 border-gray-300 border-t-primary-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          )}

          {/* Success/Error Icons */}
          {(hasSuccess || hasError) && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {hasSuccess ? (
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </motion.div>
          )}
        </div>

        {/* Focus Ring Animation */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: focused
              ? hasError
                ? `0 0 0 4px ${designTokens.colors.semantic.error}20`
                : hasSuccess
                ? `0 0 0 4px ${designTokens.colors.semantic.success}20`
                : designTokens.shadows.focus
              : '0 0 0 0px transparent',
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Error/Success/Help Messages */}
        <AnimatePresence>
          {(hasError || hasSuccess || helpText) && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2"
            >
              {hasError && (
                <motion.p
                  className="text-sm text-red-500 flex items-center gap-1"
                  initial={{ x: -4 }}
                  animate={{ x: 0 }}
                >
                  <span>!</span>
                  {error}
                </motion.p>
              )}

              {hasSuccess && (
                <motion.p
                  className="text-sm text-green-600 flex items-center gap-1"
                  initial={{ x: -4 }}
                  animate={{ x: 0 }}
                >
                  <span>✓</span>
                  Looks good!
                </motion.p>
              )}

              {helpText && !hasError && !hasSuccess && (
                <p className="text-sm text-gray-500">{helpText}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  },
);

UniversalInput.displayName = 'UniversalInput';
export default UniversalInput;
