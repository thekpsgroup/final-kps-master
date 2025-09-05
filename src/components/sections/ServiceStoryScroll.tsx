'use client';
import { useOptimizedInView } from '@/hooks/useOptimizedInView';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StoryChapter {
  id: string;
  title: string;
  content: string;
  visual?: {
    type: 'image' | 'icon' | 'chart';
    src?: string;
    icon?: string;
    data?: unknown;
  };
  color?: string;
  stats?: Array<{
    value: string;
    label: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
}

interface ServiceStoryScrollProps {
  service: {
    slug: string;
    brandName: string;
    accentHex: string;
    pains?: string[];
    outcomes?: string[];
    services?: string[];
    results?: unknown;
  };
  chapters?: StoryChapter[];
  className?: string;
}

export default function ServiceStoryScroll({
  service,
  chapters,
  className,
}: ServiceStoryScrollProps) {
  const { scrollYProgress } = useScroll();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Default chapters based on service data
  const defaultChapters: StoryChapter[] = [
    {
      id: 'problem',
      title: 'The Challenge',
      content:
        service.pains?.[0] ||
        'Every business faces unique challenges that prevent growth and efficiency.',
      visual: { type: 'icon', icon: '!' },
      color: '#ef4444',
    },
    {
      id: 'discovery',
      title: 'The Discovery',
      content:
        'Through careful analysis and strategic thinking, we identify the root causes and opportunities.',
      visual: { type: 'icon', icon: '•' },
      color: service.accentHex,
    },
    {
      id: 'solution',
      title: 'The Solution',
      content:
        service.services?.[0] ||
        'We implement proven strategies and cutting-edge solutions tailored to your needs.',
      visual: { type: 'icon', icon: '→' },
      color: '#10b981',
    },
    {
      id: 'results',
      title: 'The Results',
      content:
        service.outcomes?.[0] ||
        'Measurable improvements in efficiency, growth, and profitability.',
      visual: { type: 'icon', icon: '↑' },
      color: '#8b5cf6',
      stats: [
        { value: '300%', label: 'Efficiency Increase', trend: 'up' },
        { value: '50%', label: 'Cost Reduction', trend: 'down' },
        { value: '95%', label: 'Client Satisfaction', trend: 'up' },
      ],
    },
  ];

  const storyChapters = chapters || defaultChapters;

  // Transform scroll progress to chapter index
  const chapterProgress = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);

  // Background color transformation
  const backgroundColor = useTransform(
    chapterProgress,
    [0, 1, 2, 3],
    ['#ffffff', `${service.accentHex}05`, `${service.accentHex}10`, `${service.accentHex}15`],
  );

  // Update current chapter based on scroll
  useEffect(() => {
    const unsubscribe = chapterProgress.on('change', (value) => {
      const newChapter = Math.floor(value);
      if (newChapter !== currentChapter) {
        setCurrentChapter(newChapter);
        if (!hasStarted && newChapter > 0) {
          setHasStarted(true);
        }
      }
    });

    return unsubscribe;
  }, [chapterProgress, currentChapter, hasStarted]);

  return (
    <section className={`relative min-h-[400vh] ${className}`}>
      {/* Fixed background that changes with scroll */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{ backgroundColor }}
        transition={{ duration: 1 }}
      />

      {/* Progress indicator */}
      <div className="fixed top-8 left-8 z-50">
        <div className="flex space-x-2">
          {storyChapters.map((_, index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: index <= currentChapter ? service.accentHex : '#e5e7eb',
              }}
              animate={{
                scale: index === currentChapter ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Chapter {currentChapter + 1} of {storyChapters.length}
        </div>
      </div>

      {/* Story chapters */}
      <div className="relative">
        {storyChapters.map((chapter, index) => (
          <StoryChapter
            key={chapter.id}
            chapter={chapter}
            index={index}
            service={service}
            isActive={index === currentChapter}
          />
        ))}
      </div>

      {/* Floating navigation */}
      <AnimatePresence>
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="flex space-x-2">
              {storyChapters.map((chapter, index) => (
                <motion.button
                  key={chapter.id}
                  onClick={() => {
                    setCurrentChapter(index);
                    // Scroll to chapter
                    const chapterElement = document.getElementById(`chapter-${index}`);
                    chapterElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    index === currentChapter
                      ? 'text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm'
                  }`}
                  style={{
                    backgroundColor: index === currentChapter ? service.accentHex : undefined,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index + 1}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function StoryChapter({
  chapter,
  index,
  service,
  isActive,
}: {
  chapter: StoryChapter;
  index: number;
  service: ServiceStoryScrollProps['service'];
  isActive: boolean;
}) {
  const { ref, isInView } = useOptimizedInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const chapterHeight = '100vh';

  return (
    <motion.div
      id={`chapter-${index}`}
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex items-center justify-center"
      style={{ height: chapterHeight }}
    >
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Chapter indicator */}
            <motion.div
              className="inline-flex items-center space-x-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: chapter.color || service.accentHex }}
              >
                {index + 1}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                Chapter {index + 1}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              {chapter.title}
            </motion.h2>

            {/* Content */}
            <motion.p
              className="text-xl text-gray-600 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
            >
              {chapter.content}
            </motion.p>

            {/* Stats */}
            {chapter.stats && (
              <motion.div
                className="grid grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
              >
                {chapter.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="text-center">
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: chapter.color || service.accentHex }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                    {stat.trend && (
                      <div
                        className={`text-xs mt-1 ${
                          stat.trend === 'up'
                            ? 'text-green-600'
                            : stat.trend === 'down'
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ChapterVisual chapter={chapter} service={service} isActive={isActive} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ChapterVisual({
  chapter,
  service,
  isActive,
}: {
  chapter: StoryChapter;
  service: ServiceStoryScrollProps['service'];
  isActive: boolean;
}) {
  if (!chapter.visual) {
    // Default visual - geometric pattern
    return (
      <div className="relative h-96 flex items-center justify-center">
        <motion.div
          className="w-64 h-64 rounded-full flex items-center justify-center text-8xl"
          style={{
            background: `linear-gradient(135deg, ${service.accentHex}20, ${service.accentHex}40)`,
            border: `2px solid ${service.accentHex}30`,
          }}
          animate={
            isActive
              ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }
              : {}
          }
          transition={{ duration: 4, repeat: Infinity }}
        >
          {chapter.title.includes('Problem') && '!'}
          {chapter.title.includes('Discovery') && '•'}
          {chapter.title.includes('Solution') && '→'}
          {chapter.title.includes('Results') && '↑'}
        </motion.div>
      </div>
    );
  }

  switch (chapter.visual.type) {
    case 'icon':
      return (
        <div className="relative h-96 flex items-center justify-center">
          <motion.div
            className="text-9xl"
            animate={
              isActive
                ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity }}
          >
            {chapter.visual.icon}
          </motion.div>
        </div>
      );

    case 'image':
      return (
        <div className="relative h-96 rounded-2xl overflow-hidden">
          <motion.div
            className="w-full h-full bg-gray-200 flex items-center justify-center"
            animate={isActive ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gray-500">Chapter Visual</span>
          </motion.div>
        </div>
      );

    case 'chart':
      return (
        <div className="relative h-96 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center text-gray-500">Interactive Chart</div>
        </div>
      );

    default:
      return null;
  }
}

/**
 * Compact version for service cards
 */
export function CompactServiceStory({
  service,
  onChapterClickAction,
}: {
  service: ServiceStoryScrollProps['service'];
  onChapterClickAction?: (chapterIndex: number) => void;
}) {
  const chapters = [
    { title: 'Problem', icon: '!', color: '#ef4444' },
    { title: 'Solution', icon: '→', color: service.accentHex },
    { title: 'Results', icon: '↑', color: '#10b981' },
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <h3 className="text-2xl font-bold text-center mb-8">Service Journey</h3>
        <div className="flex justify-center space-x-8">
          {chapters.map((chapter, index) => (
            <motion.button
              key={index}
              onClick={() => onChapterClickAction?.(index)}
              className="flex flex-col items-center space-y-3 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg"
                style={{ backgroundColor: chapter.color }}
              >
                {chapter.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{chapter.title}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
