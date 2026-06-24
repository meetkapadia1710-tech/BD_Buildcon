import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#16A8B8',
          hover: '#0E8C9B',
          deep: '#0C7A88',
          light: '#e0f7fa',
        },
        brand: {
          blue: '#2F5DA0',
          red: '#E23A2E',
          orange: '#F2A33A',
        },
        ink: '#2E353B',
        body: '#6B7177',
        surface: '#F6F8F8',
        hairline: '#E5E7E8',
        footer: '#1F2124',
        'dark-bg': '#2a3137',
      },
      fontFamily: {
        display: ['var(--font-hanken)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['clamp(40px,6vw,64px)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['clamp(28px,4vw,48px)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-md': ['clamp(22px,3vw,32px)', { lineHeight: '1.3', fontWeight: '700' }],
        'headline-sm': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'label-md': ['14px', { lineHeight: '1.2', letterSpacing: '0.06em', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        section: '96px',
        'section-lg': '128px',
        gutter: '24px',
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 25px -5px rgba(0,0,0,0.12), 0 4px 6px -4px rgba(0,0,0,0.08)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'ken-burns': 'ken-burns 14s ease-out forwards',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [forms],
}

export default config
