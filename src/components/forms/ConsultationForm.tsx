'use client';
import GlassCard from '@/components/ui/GlassCard';
import { gtmEvent, trackFormSubmit } from '@/lib/gtm';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  company: string;
  revenue: string;
  employees: string;
  challenges: string[];
  priority: string;
  timeline: string;
};

const CHALLENGES = [
  'Payroll errors and compliance issues',
  'Messy books and financial reporting',
  'Inconsistent branding and poor website',
  'Chaotic operations and scheduling',
  'IT problems and security concerns',
];

export default function ConsultationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    revenue: '',
    employees: '',
    challenges: [],
    priority: '',
    timeline: '',
  });

  const handleChallengeToggle = (challenge: string) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((c) => c !== challenge)
        : [...prev.challenges, challenge],
    }));
  };

  const handleSubmit = async () => {
    trackFormSubmit('multi_step_consultation');

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, Array.isArray(value) ? value.join(', ') : value);
    });
    submitData.append('_captcha', 'false');
    submitData.append('_next', 'https://www.thekpsgroup.com/thank-you');
    submitData.append('_subject', `High-Intent Consultation Request - ${formData.company}`);
    submitData.append('_honeypot', '');

    try {
      await fetch('https://formsubmit.co/sales@thekpsgroup.com', {
        method: 'POST',
        body: submitData,
      });
      window.location.href = '/thank-you';
    } catch {
      alert('Please try again or email sales@thekpsgroup.com directly');
    }
  };

  return (
    <GlassCard className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Book Your Consultation</h2>
          <span className="text-sm text-gray-500">Step {step} of 4</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-kpsNavy h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
          >
            <h3 className="text-lg font-medium mb-4">Let&apos;s start with the basics</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-black/10 px-4 py-3 focus:ring-2 focus:ring-kpsNavy/40"
                required
              />
              <input
                type="email"
                placeholder="Email address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-black/10 px-4 py-3 focus:ring-2 focus:ring-kpsNavy/40"
                required
              />
              <input
                type="text"
                placeholder="Company name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full rounded-xl border border-black/10 px-4 py-3 focus:ring-2 focus:ring-kpsNavy/40"
              />
            </div>
            <button
              onClick={() => {
                if (formData.name && formData.email) {
                  gtmEvent('form_step_complete', { step: 1 });
                  setStep(2);
                }
              }}
              disabled={!formData.name || !formData.email}
              className="w-full mt-6 rounded-full bg-kpsNavy text-white px-6 py-3 font-medium hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
          >
            <h3 className="text-lg font-medium mb-4">Tell us about your business</h3>
            <div className="space-y-4">
              <select
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                className="w-full rounded-xl border border-black/10 px-4 py-3 focus:ring-2 focus:ring-kpsNavy/40"
              >
                <option value="">Annual revenue</option>
                <option value="Under $500K">Under $500K</option>
                <option value="$500K - $1M">$500K - $1M</option>
                <option value="$1M - $5M">$1M - $5M</option>
                <option value="$5M - $10M">$5M - $10M</option>
                <option value="Over $10M">Over $10M</option>
              </select>
              <select
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                className="w-full rounded-xl border border-black/10 px-4 py-3 focus:ring-2 focus:ring-kpsNavy/40"
              >
                <option value="">Number of employees</option>
                <option value="1-5">1-5</option>
                <option value="6-15">6-15</option>
                <option value="16-50">16-50</option>
                <option value="51-100">51-100</option>
                <option value="100+">100+</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => {
                  gtmEvent('form_step_complete', { step: 2 });
                  setStep(3);
                }}
                className="flex-1 rounded-full bg-kpsNavy text-white px-6 py-3 font-medium hover:opacity-95"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
          >
            <h3 className="text-lg font-medium mb-4">What challenges are you facing?</h3>
            <div className="space-y-3">
              {CHALLENGES.map((challenge) => (
                <label
                  key={challenge}
                  className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.challenges.includes(challenge)}
                    onChange={() => handleChallengeToggle(challenge)}
                    className="mt-1 rounded border-gray-300 text-kpsNavy focus:ring-kpsNavy/40"
                  />
                  <span className="text-sm">{challenge}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => {
                  gtmEvent('form_step_complete', { step: 3 });
                  setStep(4);
                }}
                className="flex-1 rounded-full bg-kpsNavy text-white px-6 py-3 font-medium hover:opacity-95"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
          >
            <h3 className="text-lg font-medium mb-4">When do you want to get started?</h3>
            <div className="space-y-3">
              {['Immediately', 'Within 30 days', 'Within 90 days', 'Just exploring'].map(
                (option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="timeline"
                      value={option}
                      checked={formData.timeline === option}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="text-kpsNavy focus:ring-kpsNavy/40"
                    />
                    <span>{option}</span>
                  </label>
                ),
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-full bg-kpsGold text-kpsNavy px-6 py-3 font-medium hover:opacity-95"
              >
                Book My Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
