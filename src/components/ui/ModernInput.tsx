'use client';
import { formAnimations } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface ModernInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  rows?: number;
  defaultValue?: string;
  options?: string[];
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  error?: string;
  touched?: boolean;
}

export default function ModernInput({
  label,
  name,
  type = 'text',
  required,
  rows = 4,
  defaultValue,
  options,
  className,
  placeholder,
  value,
  onChange,
  error,
  touched,
}: ModernInputProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!defaultValue || !!value);
  const hasError = touched && error;

  const baseClasses = cn(
    'w-full rounded-xl px-4 py-3 transition-all duration-300 bg-white/50 backdrop-blur-sm',
    'border-2 focus:outline-none',
    hasError
      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
      : 'border-black/10 focus:border-kpsNavy/60 focus:ring-4 focus:ring-kpsNavy/20',
    focused && 'shadow-lg shadow-kpsNavy/10',
  );

  const labelClasses = cn(
    'absolute left-4 transition-all duration-300 pointer-events-none font-medium',
    focused || hasValue
      ? hasError
        ? 'top-2 text-xs text-red-500 transform -translate-y-1'
        : 'top-2 text-xs text-kpsNavy transform -translate-y-1'
      : 'top-3.5 text-sm text-gray-500',
  );

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setHasValue(e.target.value.length > 0);
    onChange?.(e);
  };

  return (
    <motion.div variants={formAnimations.field} className={cn('relative', className)}>
      {/* Floating Label */}
      <motion.label
        className={labelClasses}
        animate={{
          y: focused || hasValue ? -2 : 0,
          scale: focused || hasValue ? 0.85 : 1,
          color: hasError ? '#ef4444' : focused ? '#00438c' : '#6b7280',
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

      {/* Input Field */}
      {type === 'textarea' ? (
        <motion.textarea
          name={name}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn(baseClasses, 'pt-6 resize-none')}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          whileFocus={{ scale: 1.01 }}
          animate={hasError ? formAnimations.input.error.shake : {}}
        />
      ) : type === 'select' && options ? (
        <motion.select
          name={name}
          value={value}
          defaultValue={defaultValue}
          className={cn(baseClasses, 'pt-6')}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          whileFocus={{ scale: 1.01 }}
          animate={hasError ? formAnimations.input.error.shake : {}}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </motion.select>
      ) : (
        <motion.input
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn(baseClasses, 'pt-6')}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          whileFocus={{ scale: 1.01 }}
          animate={hasError ? formAnimations.input.error.shake : {}}
        />
      )}

      {/* Focus Ring Animation */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: focused
            ? hasError
              ? '0 0 0 4px rgba(239, 68, 68, 0.1)'
              : '0 0 0 4px rgba(0, 67, 140, 0.1)'
            : '0 0 0 0px transparent',
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Error Message with Animation */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2"
          >
            <motion.p
              className="text-sm text-red-500 flex items-center gap-1"
              initial={{ x: -4 }}
              animate={{ x: 0 }}
            >
              <motion.span animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 0.3 }}>
                !
              </motion.span>
              {error}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
