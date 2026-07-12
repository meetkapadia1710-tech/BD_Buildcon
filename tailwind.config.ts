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
          light: '#5BD6E2',
          tint: 'rgba(22, 168, 184, 0.12)',
        },
        ink: '#2E353B',
        body: '#6B7177',
        nav: '#4d545a',
        surface: '#F6F8F8',
        hairline: '#EFF1F2',
        border: '#E5E7E8',
        footer: '#1F2124',
        'dark-bg': '#2a3137',
        logo: {
          blue: '#009FDF',
          yellow: '#FDB913',
          red: '#E32322',
          wordmark: '#005579',
        },
        error: '#E23A2E',
        success: '#0C7A88',
      },
      fontFamily: {
        display: ['var(--font-hanken)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['clamp(40px,6vw,60px)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['clamp(32px,5vw,48px)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '800' }],
        'headline-md': ['clamp(28px,4vw,42px)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-sm': ['clamp(24px,3vw,38px)', { lineHeight: '1.2', fontWeight: '700' }],
        'title-lg': ['22px', { lineHeight: '1.4', fontWeight: '700' }],
        'title-md': ['19px', { lineHeight: '1.4', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        'body-md': ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-md': ['13px', { lineHeight: '1.2', letterSpacing: '0.14em', fontWeight: '600' }],
        'label-sm': ['11px', { lineHeight: '1.2', letterSpacing: '0.14em', fontWeight: '600' }],
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        section: '96px',
        band: '72px',
        gutter: '24px',
      },
      borderRadius: {
        card: '12px',
        input: '8px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 28px rgba(0,0,0,0.08)',
        form: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
        'teal-glow': '0 4px 16px rgba(22, 168, 184, 0.4)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
      },
    },
  },
  plugins: [forms],
}

export default config
