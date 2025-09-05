'use client';
import { animationConfig } from '@/lib/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Metric {
  label: string;
  value: number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  color?: string;
  progress?: number;
  description?: string;
}

interface MetricsDashboardProps {
  metrics: Metric[];
  brandColor?: string;
  layout?: 'grid' | 'row' | 'compact';
  animated?: boolean;
}

// Animated counter component
function AnimatedCounter({
  from = 0,
  to,
  duration = 1000,
  unit = '',
  decimals = 0,
}: {
  from?: number;
  to: number;
  duration?: number;
  unit?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = from + (to - from) * easeOutCubic;

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [from, to, duration]);

  return (
    <span>
      {count.toFixed(decimals)}
      {unit}
    </span>
  );
}

// Animated progress ring
function AnimatedProgressRing({
  progress,
  size = 80,
  strokeWidth = 6,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{
          duration: 1.5,
          ease: 'easeOut',
          delay: 0.2,
        }}
      />
    </svg>
  );
}

// Individual metric card
function MetricCard({
  metric,
  brandColor,
  layout,
  index,
}: {
  metric: Metric;
  brandColor?: string;
  layout: 'grid' | 'row' | 'compact';
  index: number;
}) {
  const color = metric.color || brandColor || '#3b82f6';

  if (layout === 'compact') {
    return (
      <motion.div
        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={animationConfig.viewport}
        transition={{ delay: index * 0.1, ...animationConfig.spring }}
      >
        <div>
          <div className="text-sm text-gray-600">{metric.label}</div>
          <div className="text-lg font-semibold" style={{ color }}>
            <AnimatedCounter to={metric.value} unit={metric.unit || ''} />
          </div>
        </div>
        {metric.change !== undefined && (
          <div
            className={`text-sm font-medium ${
              metric.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {metric.change >= 0 ? '+' : ''}
            {metric.change.toFixed(1)}%
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 ${
        layout === 'row' ? 'flex items-center justify-between' : ''
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={animationConfig.viewport}
      transition={{ delay: index * 0.1, ...animationConfig.spring }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 8px 25px ${color}20`,
      }}
    >
      {/* Progress ring background */}
      {metric.progress !== undefined && layout === 'grid' && (
        <div className="absolute top-4 right-4">
          <AnimatedProgressRing progress={metric.progress} size={60} color={color} />
        </div>
      )}

      <div className={layout === 'row' ? 'flex-1' : ''}>
        <div className="text-sm font-medium text-gray-600 mb-1">{metric.label}</div>

        <div
          className={`font-bold mb-2 ${layout === 'row' ? 'text-2xl' : 'text-3xl'}`}
          style={{ color }}
        >
          <AnimatedCounter
            to={metric.value}
            unit={metric.unit || ''}
            decimals={metric.unit === '%' ? 1 : 0}
          />
        </div>

        {metric.change !== undefined && (
          <motion.div
            className={`text-sm font-medium flex items-center gap-1 ${
              metric.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <motion.span
              animate={{
                rotate: metric.change >= 0 ? 0 : 180,
              }}
              transition={{ duration: 0.3 }}
            >
              ▲
            </motion.span>
            <span>
              {metric.change >= 0 ? '+' : ''}
              {metric.change.toFixed(1)}%{metric.changeLabel && ` ${metric.changeLabel}`}
            </span>
          </motion.div>
        )}

        {metric.description && <p className="text-xs text-gray-500 mt-2">{metric.description}</p>}
      </div>

      {/* Progress bar for row layout */}
      {metric.progress !== undefined && layout === 'row' && (
        <div className="ml-6 flex-1 max-w-xs">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{metric.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${metric.progress}%` }}
              viewport={animationConfig.viewport}
              transition={{
                delay: index * 0.1 + 0.3,
                duration: 1,
                ease: 'easeOut',
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Main metrics dashboard component
export default function MetricsDashboard({
  metrics,
  brandColor = '#3b82f6',
  layout = 'grid',
  animated = true,
}: MetricsDashboardProps) {
  const gridClasses = {
    grid: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    row: 'space-y-4',
    compact: 'space-y-3',
  };

  return (
    <div className={gridClasses[layout]}>
      <AnimatePresence>
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            layout={animated}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05, ...animationConfig.spring }}
          >
            <MetricCard metric={metric} brandColor={brandColor} layout={layout} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Summary stats */}
      {layout === 'grid' && metrics.length > 3 && (
        <motion.div
          className="md:col-span-2 lg:col-span-3 xl:col-span-4 mt-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={animationConfig.viewport}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: brandColor }}>
                {metrics.reduce((sum, m) => sum + m.value, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: brandColor }}>
                {metrics.filter((m) => m.change && m.change > 0).length}
              </div>
              <div className="text-sm text-gray-600">Growing Metrics</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: brandColor }}>
                {Math.round(
                  metrics.reduce((sum, m) => sum + (m.progress || 0), 0) / metrics.length,
                )}
                %
              </div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Specialized components for different use cases
export function KPICard({
  title,
  value,
  change,
  trend,
  brandColor,
  icon,
}: {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  brandColor?: string;
  icon?: React.ReactNode;
}) {
  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  }[trend || 'neutral'];

  return (
    <motion.div
      className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={animationConfig.viewport}
      transition={animationConfig.spring}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-600">{title}</div>
        {icon && <div className="text-gray-600">{icon}</div>}
      </div>

      <div className="text-3xl font-bold mb-2" style={{ color: brandColor }}>
        {typeof value === 'number' ? <AnimatedCounter to={value} /> : value}
      </div>

      {change !== undefined && (
        <div className={`text-sm font-medium flex items-center gap-1 ${trendColor}`}>
          <motion.span
            animate={{ rotate: trend === 'down' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▲
          </motion.span>
          <span>
            {change > 0 ? '+' : ''}
            {change}%
          </span>
        </div>
      )}
    </motion.div>
  );
}
