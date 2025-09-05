'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';

interface EnhancedLeadFormProps {
  brand: {
    brandName: string;
    accentHex: string;
  };
  onSubmit?: (data: FormData) => Promise<void>;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  company?: string;
  message?: string;
}

interface FormState {
  values: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  touched: Partial<Record<keyof FormData, boolean>>;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
}

export default function EnhancedLeadForm({ brand, onSubmit, className }: EnhancedLeadFormProps) {
  const [formState, setFormState] = useState<FormState>({
    values: { name: '', email: '', company: '', message: '' },
    errors: {},
    touched: {},
    isSubmitting: false,
    submitSuccess: false,
    submitError: null,
  });

  // Enhanced field validation with real-time feedback
  const validateField = useCallback((name: keyof FormData, value: string): string | null => {
    const validators = {
      name: (v: string) => {
        if (!v.trim()) return 'Name is required';
        if (v.trim().length < 2) return 'Name must be at least 2 characters';
        if (v.trim().length > 50) return 'Name must be less than 50 characters';
        return null;
      },
      email: (v: string) => {
        if (!v.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(v.trim())) return 'Please enter a valid email address';
        return null;
      },
      company: (v: string) => {
        if (v && v.length > 100) return 'Company name must be less than 100 characters';
        return null;
      },
      message: (v: string) => {
        if (v && v.length > 500) return 'Message must be under 500 characters';
        return null;
      },
    };

    return validators[name]?.(value) || null;
  }, []);

  const handleFieldChange = useCallback(
    (name: keyof FormData, value: string) => {
      setFormState((prev) => {
        const newValues = { ...prev.values, [name]: value };
        const error = validateField(name, value);

        return {
          ...prev,
          values: newValues,
          errors: { ...prev.errors, [name]: error || undefined },
          submitError: null, // Clear submit error on field change
        };
      });
    },
    [validateField],
  );

  const handleFieldFocus = useCallback((name: keyof FormData) => {
    setFormState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  }, []);

  const handleFieldBlur = useCallback(
    (name: keyof FormData) => {
      setFormState((prev) => {
        const error = validateField(name, prev.values[name] || '');
        return {
          ...prev,
          errors: { ...prev.errors, [name]: error || undefined },
        };
      });
    },
    [validateField],
  );

  const isFormValid =
    Object.values(formState.errors).every((error) => !error) &&
    formState.values.name.trim() &&
    formState.values.email.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || formState.isSubmitting) return;

    setFormState((prev) => ({ ...prev, isSubmitting: true, submitError: null }));

    try {
      // If custom onSubmit is provided, use it
      if (onSubmit) {
        await onSubmit(formState.values);
      } else {
        // Default: submit to FormSubmit
        const formData = new FormData();
        Object.entries(formState.values).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });
        formData.append('_captcha', 'false');
        formData.append('_next', 'https://www.thekpsgroup.com/thank-you');
        formData.append('_subject', `Branded Lead Form - ${brand.brandName}`);
        formData.append('_honeypot', '');

        const response = await fetch('https://formsubmit.co/sales@thekpsgroup.com', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }
      }

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        submitSuccess: true,
      }));

      // Reset form after success
      setTimeout(() => {
        setFormState({
          values: { name: '', email: '', company: '', message: '' },
          errors: {},
          touched: {},
          isSubmitting: false,
          submitSuccess: false,
          submitError: null,
        });
      }, 3000);
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        submitError:
          error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      }));
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Name Field */}
      <FloatingLabelInput
        name="name"
        label="Full Name"
        type="text"
        value={formState.values.name}
        error={formState.errors.name}
        touched={formState.touched.name}
        brand={brand}
        required
        onChange={(value) => handleFieldChange('name', value)}
        onFocus={() => handleFieldFocus('name')}
        onBlur={() => handleFieldBlur('name')}
      />

      {/* Email Field */}
      <FloatingLabelInput
        name="email"
        label="Email Address"
        type="email"
        value={formState.values.email}
        error={formState.errors.email}
        touched={formState.touched.email}
        brand={brand}
        required
        onChange={(value) => handleFieldChange('email', value)}
        onFocus={() => handleFieldFocus('email')}
        onBlur={() => handleFieldBlur('email')}
      />

      {/* Company Field */}
      <FloatingLabelInput
        name="company"
        label="Company (Optional)"
        type="text"
        value={formState.values.company || ''}
        error={formState.errors.company}
        touched={formState.touched.company}
        brand={brand}
        onChange={(value) => handleFieldChange('company', value)}
        onFocus={() => handleFieldFocus('company')}
        onBlur={() => handleFieldBlur('company')}
      />

      {/* Message Field */}
      <FloatingLabelTextarea
        name="message"
        label="Message (Optional)"
        value={formState.values.message || ''}
        error={formState.errors.message}
        touched={formState.touched.message}
        brand={brand}
        maxLength={500}
        onChange={(value) => handleFieldChange('message', value)}
        onFocus={() => handleFieldFocus('message')}
        onBlur={() => handleFieldBlur('message')}
      />

      {/* Submit Error */}
      <AnimatePresence>
        {formState.submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <div className="flex items-center gap-3 text-red-700">
              <div className="w-5 h-5 bg-red-500 rounded-full flex-shrink-0" />
              <span className="font-medium">{formState.submitError}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!isFormValid || formState.isSubmitting}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
          !isFormValid
            ? 'bg-gray-400 cursor-not-allowed'
            : `bg-[${brand.accentHex}] hover:bg-opacity-90 active:scale-95`
        }`}
        whileHover={isFormValid ? { scale: 1.02 } : {}}
        whileTap={isFormValid ? { scale: 0.98 } : {}}
        style={!isFormValid ? {} : { backgroundColor: brand.accentHex }}
      >
        {formState.isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Submitting...
          </span>
        ) : (
          'Send Message'
        )}
      </motion.button>

      {/* Success Message */}
      <AnimatePresence>
        {formState.submitSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-6 bg-green-50 border border-green-200 rounded-xl text-center"
          >
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3">
              ✓
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-green-700">
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

// Floating Label Input Component
interface FloatingLabelInputProps {
  name: string;
  label: string;
  type: string;
  value: string;
  error?: string;
  touched?: boolean;
  brand: { accentHex: string };
  required?: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

function FloatingLabelInput({
  name,
  label,
  type,
  value,
  error,
  touched,
  brand,
  required,
  onChange,
  onFocus,
  onBlur,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const shouldFloat = isFocused || hasValue;
  const hasError = error && touched;

  return (
    <div className="relative">
      <motion.input
        id={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          onFocus();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
        }}
        className={cn(
          'peer w-full px-4 py-3 rounded-xl border-2 transition-all duration-300',
          'bg-white/50 backdrop-blur-sm',
          'focus:outline-none focus:ring-0 placeholder-transparent',
          hasError
            ? 'border-red-300 focus:border-red-500'
            : `border-gray-200 focus:border-[${brand.accentHex}]`,
          hasError ? 'text-red-900' : 'text-gray-900',
        )}
        style={
          {
            '--brand-color': brand.accentHex,
          } as React.CSSProperties
        }
        placeholder={label}
        aria-describedby={hasError ? `${name}-error` : undefined}
        aria-invalid={!!hasError}
      />

      <motion.label
        htmlFor={name}
        className={cn(
          'absolute left-4 transition-all duration-300 pointer-events-none',
          'px-2 bg-white rounded',
          shouldFloat ? 'top-0 -translate-y-1/2 text-xs' : 'top-1/2 -translate-y-1/2 text-base',
          hasError ? 'text-red-500' : isFocused ? 'text-current' : 'text-gray-500',
        )}
        animate={{
          y: shouldFloat ? '-50%' : '-50%',
          scale: shouldFloat ? 0.85 : 1,
          color: hasError ? '#ef4444' : isFocused ? brand.accentHex : '#6b7280',
        }}
        style={{ color: isFocused && !hasError ? brand.accentHex : undefined }}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </motion.label>

      {/* Focus ring animation */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: isFocused ? 0.1 : 0,
          scale: isFocused ? 1.02 : 1,
        }}
        style={{ backgroundColor: hasError ? '#ef4444' : brand.accentHex }}
        transition={{ duration: 0.2 }}
      />

      {/* Success indicator */}
      <AnimatePresence>
        {!hasError && touched && hasValue && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
          >
            ✓
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            id={`${name}-error`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute -bottom-6 left-0 flex items-center gap-2 text-red-500 text-sm"
          >
            <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Floating Label Textarea Component
interface FloatingLabelTextareaProps {
  name: string;
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  brand: { accentHex: string };
  maxLength?: number;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

function FloatingLabelTextarea({
  name,
  label,
  value,
  error,
  touched,
  brand,
  maxLength = 500,
  onChange,
  onFocus,
  onBlur,
}: FloatingLabelTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const shouldFloat = isFocused || hasValue;
  const hasError = error && touched;

  return (
    <div className="relative">
      <motion.textarea
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          onFocus();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
        }}
        maxLength={maxLength}
        rows={4}
        className={cn(
          'peer w-full px-4 py-3 rounded-xl border-2 transition-all duration-300',
          'bg-white/50 backdrop-blur-sm resize-none',
          'focus:outline-none focus:ring-0 placeholder-transparent',
          hasError
            ? 'border-red-300 focus:border-red-500'
            : `border-gray-200 focus:border-[${brand.accentHex}]`,
          hasError ? 'text-red-900' : 'text-gray-900',
        )}
        style={
          {
            '--brand-color': brand.accentHex,
          } as React.CSSProperties
        }
        placeholder={label}
        aria-describedby={hasError ? `${name}-error` : `${name}-count`}
        aria-invalid={!!hasError}
      />

      <motion.label
        htmlFor={name}
        className={cn(
          'absolute left-4 transition-all duration-300 pointer-events-none',
          'px-2 bg-white rounded',
          shouldFloat ? 'top-3 -translate-y-1/2 text-xs' : 'top-1/2 -translate-y-1/2 text-base',
          hasError ? 'text-red-500' : isFocused ? 'text-current' : 'text-gray-500',
        )}
        animate={{
          y: shouldFloat ? '-50%' : '-50%',
          scale: shouldFloat ? 0.85 : 1,
          color: hasError ? '#ef4444' : isFocused ? brand.accentHex : '#6b7280',
        }}
        style={{ color: isFocused && !hasError ? brand.accentHex : undefined }}
      >
        {label}
      </motion.label>

      {/* Character count */}
      <div
        id={`${name}-count`}
        className={cn(
          'absolute bottom-3 right-3 text-xs transition-colors',
          value.length > maxLength * 0.9
            ? 'text-red-500'
            : isFocused
            ? 'text-current'
            : 'text-gray-600',
        )}
        style={{
          color: isFocused && value.length <= maxLength * 0.9 ? brand.accentHex : undefined,
        }}
      >
        {value.length}/{maxLength}
      </div>

      {/* Focus ring animation */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: isFocused ? 0.1 : 0,
          scale: isFocused ? 1.02 : 1,
        }}
        style={{ backgroundColor: hasError ? '#ef4444' : brand.accentHex }}
        transition={{ duration: 0.2 }}
      />

      {/* Error message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            id={`${name}-error`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute -bottom-6 left-0 flex items-center gap-2 text-red-500 text-sm"
          >
            <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
