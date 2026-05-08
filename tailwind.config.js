/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cosmic surfaces - deep, layered, refined
        'space-void': '#05060a',
        'space-deep': '#0a0c14',
        'space-light': '#11141d',
        'space-accent': '#1a1e2c',
        'space-elevated': '#242938',

        // Aurora accents - primary system
        'aurora-cyan': '#22d3ee',
        'aurora-violet': '#a78bfa',
        'aurora-pink': '#f472b6',
        'aurora-gold': '#fbbf24',
        'aurora-mint': '#5eead4',

        // Backwards compat aliases used throughout codebase
        'neon-blue': '#22d3ee',
        'neon-purple': '#a78bfa',
        'neon-pink': '#f472b6',
        'neon-cyan': '#5eead4',
        'accent-gold': '#fbbf24',

        // Semantic text
        'text-primary': '#f5f7fb',
        'text-secondary': '#a8b2c0',
        'text-muted': '#6b7280',
        'text-faded': '#4b5563',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-1': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'display-2': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-3': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'aurora': 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 50%, #f472b6 100%)',
        'aurora-soft': 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(167,139,250,0.15) 50%, rgba(244,114,182,0.15) 100%)',
        'cosmic-radial': 'radial-gradient(ellipse at top, rgba(167,139,250,0.15), transparent 50%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(34, 211, 238, 0.35)',
        'glow-violet': '0 0 24px rgba(167, 139, 250, 0.35)',
        'glow-soft': '0 8px 40px -12px rgba(167, 139, 250, 0.25)',
        'card': '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -12px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' },
          '50%': { opacity: '0.85', boxShadow: '0 0 40px rgba(34, 211, 238, 0.7)' },
        },
        'aurora-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'aurora-shift': 'aurora-shift 12s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
