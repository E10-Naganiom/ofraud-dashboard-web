import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary oFraud green (buttons, CTAs, active states)
          primary: '#4ADE80',
          'primary-hover': '#22C55E',
          'primary-dark': '#10B981',
          'primary-light': '#86EFAC',

          // Blue accent (links, secondary actions, icons)
          accent: '#2563EB',
          'accent-hover': '#1D4ED8',
          'accent-light': '#3B82F6',

          // Background colors
          background: {
            light: '#E8F5E9',      // Light green card background
            subtle: '#F1F8F4',     // Very subtle green
            card: '#DCFCE7',       // Incident card background
            white: '#FFFFFF',
            gray: '#F9FAFB',       // Subtle gray background
          },

          // Status colors
          success: '#10B981',      // Approved, success states
          warning: '#F59E0B',      // Pending, warning states
          danger: '#EF4444',       // Rejected, errors, destructive actions
          info: '#3B82F6',         // Info states

          // Text colors
          text: {
            primary: '#000000',    // Headers, important text
            secondary: '#374151',  // Body text
            muted: '#6B7280',      // Secondary text, labels
            light: '#9CA3AF',      // Placeholder text
          },
        },
      },
      borderRadius: {
        'card': '1rem',            // 16px for cards (rounded-xl)
        'button': '0.75rem',       // 12px for buttons (rounded-lg)
        'badge': '9999px',         // Full round for badges
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
