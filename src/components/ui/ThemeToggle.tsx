'use client';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme, colorScheme, setColorScheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' },
  ];

  const colorSchemes = [
    { value: 'default', label: 'Default', colors: ['#00438c', '#cab068'] },
    { value: 'minimal', label: 'Minimal', colors: ['#374151', '#9ca3af'] },
    { value: 'vibrant', label: 'Vibrant', colors: ['#7c3aed', '#f59e0b'] },
    { value: 'professional', label: 'Professional', colors: ['#1f2937', '#059669'] },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-black/10 dark:border-white/10"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Theme Toggle */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Theme</p>
          <div className="flex gap-2">
            {themes.map((t) => (
              <motion.button
                key={t.value}
                onClick={() => setTheme(t.value as 'light' | 'dark' | 'auto')}
                className={`p-2 rounded-lg text-sm transition-colors ${
                  theme === t.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="block mb-1 text-lg font-semibold">{t.label.charAt(0)}</span>
                <span className="text-xs">{t.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Color Scheme */}
        <div>
          <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Style</p>
          <div className="grid grid-cols-2 gap-2">
            {colorSchemes.map((scheme) => (
              <motion.button
                key={scheme.value}
                onClick={() =>
                  setColorScheme(scheme.value as 'default' | 'minimal' | 'vibrant' | 'professional')
                }
                className={`p-2 rounded-lg text-xs transition-colors ${
                  colorScheme === scheme.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-1 mb-1 justify-center">
                  {scheme.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                {scheme.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
