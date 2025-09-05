'use client';
import { trackFormSubmit } from '@/lib/gtm';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  company: string;
  urgency: string;
  challenge: string;
};

const URGENCY_OPTIONS = [
  { value: 'immediate', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'quarter', label: 'This quarter' },
  { value: 'exploring', label: 'Just exploring' },
];

const CHALLENGE_OPTIONS = [
  { value: 'payroll', label: 'Payroll errors' },
  { value: 'books', label: 'Messy books' },
  { value: 'website', label: 'Poor website' },
  { value: 'operations', label: 'Chaotic ops' },
  { value: 'it', label: 'IT problems' },
];

export default function MobileOptimizedForm() {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    phone: '',
    company: '',
    urgency: '',
    challenge: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of form on mobile
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    trackFormSubmit('mobile_optimized_form');

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    submitData.append('_captcha', 'false');
    submitData.append('_next', 'https://www.thekpsgroup.com/thank-you');
    submitData.append(
      '_subject',
      `Mobile Consultation Request - ${formData.company || formData.name}`,
    );

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = '/thank-you';
        }, 2000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      alert('Please try again or call (469) 458-6966');
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.urgency && formData.challenge;
      case 3:
        return true;
      default:
        return false;
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">✓</span>
          </div>
        </motion.div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Consultation Booked!</h3>

        <p className="text-gray-600 mb-6">
          We&apos;ll be in touch within 2 hours to schedule your free audit.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Check your email for confirmation</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      ref={formRef}
      className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
    >
      {/* Progress Bar */}
      <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
        </div>
        <motion.div
          className="bg-kpsNavy h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-6">
        {/* Step 1: Contact Info */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Let&apos;s get started</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-4 text-lg focus:ring-2 focus:ring-kpsNavy/40 focus:border-kpsNavy transition-colors"
                  placeholder="John Smith"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-4 text-lg focus:ring-2 focus:ring-kpsNavy/40 focus:border-kpsNavy transition-colors"
                  placeholder="john@company.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-4 text-lg focus:ring-2 focus:ring-kpsNavy/40 focus:border-kpsNavy transition-colors"
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company name
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-4 text-lg focus:ring-2 focus:ring-kpsNavy/40 focus:border-kpsNavy transition-colors"
                  placeholder="Your Company Inc."
                  autoComplete="organization"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Needs Assessment */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Tell us about your needs</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                When do you want to get started? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {URGENCY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: option.value })}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all touch-manipulation ${
                      formData.urgency === option.value
                        ? 'border-kpsNavy bg-kpsNavy/5 text-kpsNavy'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-3 h-3 bg-kpsNavy rounded-full flex-shrink-0" />
                    <span className="text-sm font-medium text-center">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What&apos;s your biggest challenge? *
              </label>
              <div className="grid grid-cols-1 gap-2">
                {CHALLENGE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, challenge: option.value })}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all touch-manipulation ${
                      formData.challenge === option.value
                        ? 'border-kpsNavy bg-kpsNavy/5 text-kpsNavy'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-3 h-3 bg-kpsNavy rounded-full flex-shrink-0" />
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to book your call?</h3>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Name:</strong> {formData.name}
                </div>
                <div>
                  <strong>Email:</strong> {formData.email}
                </div>
                {formData.company && (
                  <div>
                    <strong>Company:</strong> {formData.company}
                  </div>
                )}
                <div>
                  <strong>Timeline:</strong>{' '}
                  {URGENCY_OPTIONS.find((o) => o.value === formData.urgency)?.label}
                </div>
                <div>
                  <strong>Challenge:</strong>{' '}
                  {CHALLENGE_OPTIONS.find((o) => o.value === formData.challenge)?.label}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              We&apos;ll call you within 4 hours during business hours to schedule your
              consultation.
            </p>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 py-4 px-6 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors touch-manipulation"
            >
              Back
            </button>
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 py-4 px-6 bg-kpsNavy text-white rounded-xl font-medium hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity touch-manipulation"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-4 px-6 bg-kpsGold text-kpsNavy rounded-xl font-semibold hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity touch-manipulation"
            >
              {isSubmitting ? 'Booking...' : 'Book My Consultation'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
