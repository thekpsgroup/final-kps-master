import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1340px' },
    },
    extend: {
      colors: {
        kpsNavy: '#00438c',
        kpsGold: '#cab068',
        // Enhanced color palette
        primary: {
          50: '#eff8ff',
          100: '#dbeafe',
          500: '#00438c',
          600: '#003875',
          700: '#002b5c',
          900: '#001a3d',
        },
        accent: {
          50: '#fefdf4',
          100: '#fef9e7',
          500: '#cab068',
          600: '#b8965c',
          700: '#9d7d4b',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        // Brand-specific colors from brandsConfig.ts
        modernPay: '#2BAA9C',
        modernLedger: '#1E6B4E',
        modernBrands: '#6A5ACD',
        modernConsulting: '#C7A252',
        modernStack: '#0881C2',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
        glass: '0 8px 24px rgba(0,0,0,0.12)',
        glassHover: '0 12px 32px rgba(0,0,0,0.16)',
      },
      borderRadius: { '2_5xl': '1.25rem' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
