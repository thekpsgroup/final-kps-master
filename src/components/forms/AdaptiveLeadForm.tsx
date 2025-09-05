'use client';
import GlassCard from '@/components/ui/GlassCard';
import UniversalButton from '@/components/ui/UniversalButton';
import UniversalInput from '@/components/ui/UniversalInput';
import { useAdvancedForm } from '@/hooks/useAdvancedForm';
import { useBehavioralAnalytics } from '@/lib/behavioral-analytics';
import { usePersonalization } from '@/lib/personalization-engine';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

interface AdaptiveLeadFormProps {
  interestDefault?: string;
  onSuccess?: (data: unknown) => void;
}

export default function AdaptiveLeadForm({ interestDefault, onSuccess }: AdaptiveLeadFormProps) {
  const { personalizedContent, userSegment } = usePersonalization();
  const { conversionProbability, engagementScore } = useBehavioralAnalytics();
  const [showIncentive, setShowIncentive] = useState(false);
  const [fieldOrder, setFieldOrder] = useState<string[]>([]);

  // Smart field ordering based on user behavior
  const optimizeFieldOrder = useCallback(() => {
    if (!personalizedContent) return;

    const fields = personalizedContent.formFields;
    let optimizedOrder: string[] = [];

    // High-intent users: start with contact info
    if (conversionProbability > 0.7) {
      optimizedOrder = [
        'name',
        'email',
        'phone',
        ...fields.filter((f) => !['name', 'email', 'phone'].includes(f.name)).map((f) => f.name),
      ];
    }
    // Low-intent users: start with easy, engaging questions
    else if (conversionProbability < 0.3) {
      const easyFields = fields.filter((f) => !f.required && f.name !== 'email').map((f) => f.name);
      optimizedOrder = [easyFields[0], 'name', 'email', ...easyFields.slice(1)].filter(Boolean);
    }
    // Default: standard order
    else {
      optimizedOrder = fields.map((f) => f.name);
    }

    setFieldOrder(optimizedOrder);
  }, [personalizedContent, conversionProbability]);

  useEffect(() => {
    optimizeFieldOrder();
  }, [optimizeFieldOrder]);

  // Show incentive for hesitating users
  useEffect(() => {
    if (conversionProbability < 0.4 && engagementScore > 50) {
      const timer = setTimeout(() => setShowIncentive(true), 15000); // After 15 seconds
      return () => clearTimeout(timer);
    }
  }, [conversionProbability, engagementScore]);

  const form = useAdvancedForm({
    initialValues: fieldOrder.reduce((acc, fieldName) => {
      acc[fieldName] = fieldName === 'interest' ? interestDefault || '' : '';
      return acc;
    }, {} as Record<string, string>),
    validationRules: {
      name: { required: true, minLength: 2 },
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
      // Track successful conversion
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess?.(values);
    },
  });

  // Progressive form revelation
  const getVisibleFields = () => {
    if (!personalizedContent) return [];

    const fields = personalizedContent.formFields;

    // Show all fields for high-intent users
    if (conversionProbability > 0.6) {
      return fields;
    }

    // Progressive revelation for others
    const fieldsPerStep = conversionProbability < 0.3 ? 1 : 2;
    const endIndex = 1 * fieldsPerStep; // Show first step only
    return fields.slice(0, endIndex);
  };

  if (!personalizedContent) {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="text-gray-500 mt-4">Personalizing your experience...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Personalized headline */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{personalizedContent.headline}</h2>
        <p className="text-xl text-gray-600 mb-4">{personalizedContent.subheadline}</p>

        {/* User segment indicator (for testing) */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
          <span>Segment: {userSegment}</span>
          <span>•</span>
          <span>Conversion: {Math.round(conversionProbability * 100)}%</span>
        </div>
      </motion.div>

      {/* Incentive banner */}
      <AnimatePresence>
        {showIncentive && personalizedContent.incentive && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="mb-6"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{personalizedContent.incentive.icon}</span>
                <div>
                  <p className="font-medium text-green-800">
                    {personalizedContent.incentive.message}
                  </p>
                  <p className="text-sm text-green-600">{personalizedContent.incentive.urgency}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Adaptive form */}
      <GlassCard className="p-8">
        <form onSubmit={form.handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key="form-fields"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {getVisibleFields().map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <UniversalInput
                    label={field.label}
                    type={
                      field.name === 'email'
                        ? 'email'
                        : field.name === 'phone'
                        ? 'tel'
                        : field.name === 'notes'
                        ? 'textarea'
                        : field.name === 'interest'
                        ? 'select'
                        : 'text'
                    }
                    required={field.required}
                    placeholder={field.placeholder}
                    helpText={field.helpText}
                    options={
                      field.name === 'interest'
                        ? [
                            'Modern Pay',
                            'Modern Ledger',
                            'Modern Brands',
                            'Modern Consulting',
                            'Modern Stack',
                          ]
                        : undefined
                    }
                    variant="glass"
                    size="lg"
                    {...form.getFieldProps(field.name)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Progress indicator */}
          {personalizedContent.formFields.length > 3 && (
            <div className="mt-6 mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Progress</span>
                <span>
                  {Math.round(
                    (getVisibleFields().length / personalizedContent.formFields.length) * 100,
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-primary-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      (getVisibleFields().length / personalizedContent.formFields.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Smart submit button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <UniversalButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={form.isSubmitting}
              gradient
              glow
              className="mt-8"
            >
              {personalizedContent.buttonText}
            </UniversalButton>
          </motion.div>

          {/* Error display */}
          <AnimatePresence>
            {form.submitError && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mt-4"
              >
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      {form.submitError}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust signals */}
          {personalizedContent.trustSignals.length > 0 && (
            <motion.div
              className="mt-8 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-wrap justify-center gap-4">
                {personalizedContent.trustSignals.map((signal, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    {signal.icon && <span>{signal.icon}</span>}
                    <span>{signal.content}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Social proof */}
          {personalizedContent.socialProof.length > 0 && (
            <motion.div
              className="mt-6 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                {personalizedContent.socialProof.map((proof, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    {proof.icon && <span className="text-lg">{proof.icon}</span>}
                    <div>
                      <p className="font-medium text-gray-900">{proof.content}</p>
                      {proof.author && <p className="text-gray-500">— {proof.author}</p>}
                      {proof.metric && (
                        <p className="text-primary-600 font-semibold">{proof.metric}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </form>
      </GlassCard>

      {/* Smart assistance */}
      <SmartAssistance
        conversionProbability={conversionProbability}
        formProgress={getVisibleFields().length / personalizedContent.formFields.length}
      />
    </div>
  );
}

// Smart assistance component
function SmartAssistance({
  conversionProbability,
  formProgress,
}: {
  conversionProbability: number;
  formProgress: number;
}) {
  const [showAssistance, setShowAssistance] = useState(false);
  const [assistanceType, setAssistanceType] = useState<'help' | 'incentive' | 'social'>('help');

  useEffect(() => {
    // Show assistance for struggling users
    if (conversionProbability < 0.3 && formProgress > 0.3) {
      setShowAssistance(true);
      setAssistanceType('help');
    }
    // Show incentive for hesitating users
    else if (conversionProbability < 0.5 && formProgress > 0.6) {
      setShowAssistance(true);
      setAssistanceType('incentive');
    }
  }, [conversionProbability, formProgress]);

  if (!showAssistance) return null;

  const assistanceMessages = {
    help: {
      title: 'Need help?',
      message: "We're here to help! This form takes most people less than 2 minutes to complete.",
      action: 'Get Live Help',
      icon: '?',
    },
    incentive: {
      title: 'Special offer!',
      message: 'Complete your submission in the next 5 minutes and get a free business assessment.',
      action: 'Claim Offer',
      icon: '!',
    },
    social: {
      title: 'Join 20+ companies',
      message: "You're in good company - over 20 companies have transformed with our help.",
      action: 'See Success Stories',
      icon: '✓',
    },
  };

  const assistance = assistanceMessages[assistanceType];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed bottom-6 right-6 max-w-sm z-50"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{assistance.icon}</span>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{assistance.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{assistance.message}</p>
              <div className="flex gap-2">
                <button className="text-xs bg-primary-500 text-white px-3 py-1 rounded-full hover:bg-primary-600 transition-colors">
                  {assistance.action}
                </button>
                <button
                  onClick={() => setShowAssistance(false)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
