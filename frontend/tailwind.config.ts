import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0d0d0f',
        'void-2': '#131317',
        'void-3': '#1a1a20',
        wire: {
          100: '#f5f5f7',
          200: '#e0e0e5',
          300: '#b0b0bb',
          400: '#70707a',
          500: '#4a4a55',
          600: '#2e2e38',
          700: '#1e1e28',
        },
        node: '#00e5ff',
        'node-dim': '#00b8cc',
        synapse: '#b8ff57',
        'synapse-dim': '#8ccc30',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'radial-void': 'radial-gradient(ellipse at center, #1a1a20 0%, #0d0d0f 70%)',
      },
    },
  },
  plugins: [],
}

export default config
