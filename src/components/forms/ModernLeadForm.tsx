'use client';
import FormSuccess from '@/components/ui/FormSuccess';
import GlassCard from '@/components/ui/GlassCard';
import UniversalButton from '@/components/ui/UniversalButton';
import UniversalInput from '@/components/ui/UniversalInput';
import { useAdvancedForm } from '@/hooks/useAdvancedForm';
import { motionVariants } from '@/lib/design-system';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  notes: string;
  [key: string]: unknown;
}

interface ModernLeadFormProps {
  interestDefault?: string;
  variant?: 'default' | 'minimal' | 'glass';
  onSuccess?: () => void;
}

export default function ModernLeadForm({
  interestDefault = '',
  variant = 'default',
  onSuccess,
}: ModernLeadFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useAdvancedForm<LeadFormData>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      interest: interestDefault,
      notes: '',
    },
    validationRules: {
      name: {
        required: true,
        minLength: 2,
        custom: (value) => {
          if (value.length > 0 && !/^[a-zA-Z\s]+$/.test(value)) {
            return 'Name can only contain letters and spaces';
          }
          return null;
        },
      },
      email: { required: true, email: true },
      phone: {
        pattern: /^[+]?[1-9][\d]{0,15}$/,
        custom: (value) => {
          if (value.length > 0 && value.length < 10) {
            return 'Phone number must be at least 10 digits';
          }
          return null;
        },
      },
    },
    onSubmit: async (values) => {
      // Submit to FormSubmit
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      try {
        const response = await fetch('https://formsubmit.co/sales@thekpsgroup.com', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }

        setShowSuccess(true);
        onSuccess?.();
      } catch {
        throw new Error('Failed to submit form. Please try again.');
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <FormSuccess
          title="Thank you for your interest!"
          message="We'll review your information and get back to you within 2-4 hours during business hours."
          onReset={() => {
            setShowSuccess(false);
            form.reset();
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div variants={motionVariants.staggerContainer} initial="hidden" animate="visible">
        <GlassCard className="p-8 border border-black/5 shadow-glass">
          <form onSubmit={form.handleSubmit}>
            {/* Hidden FormSubmit fields */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New lead — The KPS Group" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://www.thekpsgroup.com/thank-you" />

            <div className="grid gap-6 md:grid-cols-2">
              <UniversalInput
                label="Full Name"
                {...form.getFieldProps('name')}
                required
                variant={variant}
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                helpText="Enter your first and last name"
              />

              <UniversalInput
                label="Email Address"
                {...form.getFieldProps('email')}
                type="email"
                required
                variant={variant}
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
                helpText="We'll never share your email"
              />

              <UniversalInput
                label="Phone Number"
                {...form.getFieldProps('phone')}
                type="tel"
                variant={variant}
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                }
              />

              <UniversalInput
                label="Interested In"
                {...form.getFieldProps('interest')}
                type="select"
                variant={variant}
                options={[
                  { value: 'Modern Pay', label: 'Modern Pay' },
                  { value: 'Modern Ledger', label: 'Modern Ledger' },
                  { value: 'Modern Brands', label: 'Modern Brands' },
                  { value: 'Modern Consulting', label: 'Modern Consulting' },
                  { value: 'Modern Stack', label: 'Modern Stack' },
                ]}
              />
            </div>

            <UniversalInput
              label="Tell us about your needs"
              {...form.getFieldProps('notes')}
              type="textarea"
              className="mt-6"
              variant={variant}
              helpText="Optional: Share any specific questions or requirements"
            />

            <div className="hidden">
              <input name="_honey" tabIndex={-1} autoComplete="off" />
            </div>

            <motion.div className="mt-8" variants={motionVariants.formField}>
              <UniversalButton
                type="submit"
                loading={form.isSubmitting}
                disabled={form.isSubmitting}
                fullWidth
                gradient
                glow
              >
                {form.isSubmitting ? 'Submitting...' : 'Get Started Today'}
              </UniversalButton>
            </motion.div>

            {form.submitError && (
              <motion.div
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-red-800 text-sm">{form.submitError}</p>
              </motion.div>
            )}
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
