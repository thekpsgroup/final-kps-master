import typography from '@tailwindcss/typography';
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
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        kpsNavy: '#00438c',
        kpsGold: '#cab068',
        // Enhanced color palette with WCAG AA compliance
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
        error: '#dc2626', // Updated for better contrast
        // WCAG AA compliant text colors
        text: {
          primary: '#1f2937', // High contrast on white
          secondary: '#4b5563', // WCAG AA compliant
          muted: '#6b7280', // WCAG AA compliant
          inverse: '#ffffff', // White on dark backgrounds
        },
        // Brand-specific colors from brandsConfig.ts
        modernPay: '#2BAA9C',
        modernLedger: '#1E6B4E',
        modernBrands: '#6A5ACD',
        modernConsulting: '#C7A252',
        modernStack: '#0881C2',
      },
      fontSize: {
        // Captions and small text
        xs: ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        sm: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],

        // Body text - standardized
        base: ['1rem', { lineHeight: '1.6rem', fontWeight: '400' }],
        lg: ['1.125rem', { lineHeight: '1.7rem', fontWeight: '400' }],

        // Large body text - standardized
        xl: ['1.25rem', { lineHeight: '1.8rem', fontWeight: '400' }],
        '2xl': ['1.5rem', { lineHeight: '1.9rem', fontWeight: '400' }],

        // Headings - H4 (subheadings)
        '3xl': ['1.875rem', { lineHeight: '1.2', fontWeight: '600' }],

        // Headings - H3 (section headers)
        '4xl': ['2.25rem', { lineHeight: '1.15', fontWeight: '600' }],

        // Headings - H2 (major sections)
        '5xl': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],

        // Headings - H1 (page titles)
        '6xl': ['3.75rem', { lineHeight: '1.05', fontWeight: '800' }],
        '7xl': ['4.5rem', { lineHeight: '1.02', fontWeight: '800' }],
        '8xl': ['6rem', { lineHeight: '1', fontWeight: '900' }],

        // Mobile-optimized sizes - standardized
        'mobile-h1': ['2.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'mobile-h2': ['2rem', { lineHeight: '1.15', fontWeight: '700' }],
        'mobile-h3': ['1.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'mobile-h4': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
        glass: '0 8px 24px rgba(0,0,0,0.12)',
        glassHover: '0 12px 32px rgba(0,0,0,0.16)',
        // Enhanced modern shadows
        subtle: '0 2px 8px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.08)',
        elegant: '0 4px 16px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
        refined: '0 1px 4px rgba(0,0,0,0.06), 0 0 2px rgba(0,0,0,0.04)',
        premium: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        minimal: '0 1px 2px rgba(0,0,0,0.05)',
      },
      borderRadius: { '2_5xl': '1.25rem' },
    },
  },
  plugins: [typography],
};
export default config;
