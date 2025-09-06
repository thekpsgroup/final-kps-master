"use client";
import { useState, useCallback } from "react";

interface ValidationRule {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface FormField {
  value: string;
  error: string | null;
  touched: boolean;
  loading: boolean;
  success: boolean;
}

interface UseAdvancedFormProps<T> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule>>;
  onSubmit?: (values: T) => Promise<void>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export function useAdvancedForm<T extends Record<string, unknown>>({
  initialValues,
  validationRules = {},
  onSubmit,
  validateOnChange = false,
  validateOnBlur = true
}: UseAdvancedFormProps<T>) {
  const [fields, setFields] = useState<Record<keyof T, FormField>>(() => {
    const initialFields = {} as Record<keyof T, FormField>;
    Object.keys(initialValues).forEach((key) => {
      initialFields[key as keyof T] = {
        value: String(initialValues[key as keyof T] || ''),
        error: null,
        touched: false,
        loading: false,
        success: false
      };
    });
    return initialFields;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateField = useCallback((name: keyof T, value: string): string | null => {
    const rules = validationRules[name];
    if (!rules) return null;

    if (rules.required && !value.trim()) {
      return `${String(name)} is required`;
    }

    if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum ${rules.minLength} characters required`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} characters allowed`;
    }

    if (rules.pattern && value && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, [validationRules]);

  const updateField = useCallback((name: keyof T, updates: Partial<FormField>) => {
    setFields(prev => ({
      ...prev,
      [name]: { ...prev[name], ...updates }
    }));
  }, []);

  const handleChange = useCallback((name: keyof T, value: string) => {
    const error = validateOnChange ? validateField(name, value) : null;
    const success = validateOnChange && !error && value.length > 0;

    updateField(name, { value, error, success });
  }, [validateField, validateOnChange, updateField]);

  const handleBlur = useCallback((name: keyof T) => {
    const field = fields[name];
    if (!validateOnBlur || field.touched) return;

    const error = validateField(name, field.value);
    const success = !error && field.value.length > 0;

    updateField(name, { touched: true, error, success });
  }, [fields, validateField, validateOnBlur, updateField]);

  const handleFocus = useCallback((name: keyof T) => {
    updateField(name, { touched: true });
  }, [updateField]);

  const validateAllFields = useCallback(() => {
    const errors: Record<string, string> = {};
    let hasErrors = false;

    Object.keys(fields).forEach((key) => {
      const field = fields[key as keyof T];
      const error = validateField(key as keyof T, field.value);
      if (error) {
        errors[key] = error;
        hasErrors = true;
      }

      updateField(key as keyof T, {
        touched: true,
        error,
        success: !error && field.value.length > 0
      });
    });

    return !hasErrors;
  }, [fields, validateField, updateField]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const values = {} as T;
      Object.keys(fields).forEach((key) => {
        values[key as keyof T] = fields[key as keyof T].value as T[keyof T];
      });

      await onSubmit?.(values);
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [fields, validateAllFields, onSubmit]);

  const reset = useCallback(() => {
    setFields(() => {
      const resetFields = {} as Record<keyof T, FormField>;
      Object.keys(initialValues).forEach((key) => {
        resetFields[key as keyof T] = {
          value: String(initialValues[key as keyof T] || ''),
          error: null,
          touched: false,
          loading: false,
          success: false
        };
      });
      return resetFields;
    });
    setIsSubmitting(false);
    setIsSubmitted(false);
    setSubmitError(null);
  }, [initialValues]);

  const getFieldProps = useCallback((name: keyof T) => ({
    name: String(name),
    value: fields[name].value,
    error: fields[name].error,
    touched: fields[name].touched,
    success: fields[name].success,
    loading: fields[name].loading,
    onChange: (value: string) => handleChange(name, value),
    onBlur: () => handleBlur(name),
    onFocus: () => handleFocus(name)
  }), [fields, handleChange, handleBlur, handleFocus]);

  return {
    fields,
    isSubmitting,
    isSubmitted,
    submitError,
    handleSubmit,
    reset,
    getFieldProps,
    updateField,
    validateField,
    validateAllFields
  };
}
