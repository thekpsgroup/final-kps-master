"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animationConfig } from '@/lib/animations';
import GlassCard from '@/components/ui/GlassCard';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  deliverables?: string[];
  duration?: string;
  icon?: string;
  color?: string;
}

interface ServiceProcessProps {
  steps: ProcessStep[];
  brandColor?: string;
  title?: string;
  subtitle?: string;
  interactive?: boolean;
}

export default function ServiceProcess({
  steps,
  brandColor = '#3b82f6',
  title = 'Our Process',
  subtitle = 'A proven approach to delivering exceptional results',
  interactive = true
}: ServiceProcessProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleStepClick = (index: number) => {
    if (!interactive) return;
    setActiveStep(index);
    setCompletedSteps(prev => new Set([...prev, index]));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={animationConfig.viewport}
          transition={animationConfig.spring}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="relative mb-16">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200">
            <motion.div
              className="h-full bg-current"
              style={{ color: brandColor }}
              initial={{ width: 0 }}
              animate={{
                width: interactive ? `${((activeStep + 1) / steps.length) * 100}%` : '100%'
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = completedSteps.has(index);
              const stepColor = step.color || brandColor;

              return (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleStepClick(index)}
                  whileHover={interactive ? { scale: 1.05 } : undefined}
                  whileTap={interactive ? { scale: 0.95 } : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={animationConfig.viewport}
                  transition={{ delay: index * 0.1, ...animationConfig.spring }}
                >
                  {/* Step Circle */}
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 relative z-10 ${
                      interactive ? 'shadow-lg' : ''
                    }`}
                    style={{
                      backgroundColor: isActive || isCompleted ? stepColor : '#e5e7eb',
                      border: isActive ? `3px solid ${stepColor}40` : 'none'
                    }}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      boxShadow: isActive ? `0 0 20px ${stepColor}40` : undefined
                    }}
                    transition={animationConfig.spring}
                  >
                    {step.icon ? (
                      <span className="text-2xl">{step.icon}</span>
                    ) : (
                      <span>{index + 1}</span>
                    )}

                    {/* Completion checkmark */}
                    <AnimatePresence>
                      {isCompleted && !isActive && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={animationConfig.bounce}
                        >
                          <span className="text-white font-bold">✓</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Step Title */}
                  <motion.div
                    className="text-center max-w-32"
                    animate={{
                      color: isActive ? stepColor : '#6b7280'
                    }}
                    transition={animationConfig.smooth}
                  >
                    <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                    {step.duration && (
                      <p className="text-xs opacity-75">{step.duration}</p>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Active Step Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={animationConfig.smooth}
          >
            <GlassCard className="p-8 md:p-10">
              <div className="text-center mb-8">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ color: steps[activeStep]?.color || brandColor }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={animationConfig.bounce}
                >
                  {steps[activeStep]?.title}
                </motion.h3>
                <motion.p
                  className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {steps[activeStep]?.description}
                </motion.p>
              </div>

              {/* Deliverables */}
              {steps[activeStep]?.deliverables && (
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {steps[activeStep].deliverables.map((deliverable, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: steps[activeStep]?.color || brandColor }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {deliverable}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Step Navigation */}
              {interactive && (
                <motion.div
                  className="flex justify-center gap-4 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <button
                    onClick={() => handleStepClick(Math.min(steps.length - 1, activeStep + 1))}
                    disabled={activeStep === steps.length - 1}
                    className="px-6 py-3 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ backgroundColor: brandColor }}
                  >
                    Next Step
                  </button>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Progress Summary */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={animationConfig.viewport}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-white rounded-full shadow-lg border border-gray-200">
            <div className="flex -space-x-2">
              {steps.slice(0, Math.min(5, steps.length)).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: completedSteps.has(i) ? brandColor : '#e5e7eb',
                    color: completedSteps.has(i) ? 'white' : '#6b7280'
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {completedSteps.has(i) ? '✓' : i + 1}
                </motion.div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Step {activeStep + 1} of {steps.length}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Compact process component for smaller sections
export function CompactProcess({
  steps,
  brandColor = '#3b82f6'
}: {
  steps: Omit<ProcessStep, 'description' | 'deliverables'>[];
  brandColor?: string;
}) {
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex flex-col items-center text-center max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={animationConfig.viewport}
            transition={{ delay: index * 0.1, ...animationConfig.spring }}
          >
            {/* Step Number/Icon */}
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-4"
              style={{ backgroundColor: brandColor }}
              whileHover={{ scale: 1.1 }}
              transition={animationConfig.spring}
            >
              {step.icon ? (
                <span className="text-xl">{step.icon}</span>
              ) : (
                <span>{index + 1}</span>
              )}
            </motion.div>

            {/* Step Content */}
            <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
            {step.duration && (
              <p className="text-sm text-gray-600">{step.duration}</p>
            )}

            {/* Connection Line (for desktop) */}
            {index < steps.length - 1 && (
              <motion.div
                className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gray-300"
                style={{ width: 'calc(100vw / 4)' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={animationConfig.viewport}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
