/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sanskrit': ['Noto Sans Devanagari', 'Arial Unicode MS', 'sans-serif'],
        'zen': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Japanese minimalist sumi-e palette with Indian warmth
        'sumi': {
          // Core sumi-e blacks and grays
          'ink': '#1a1a1a',      // Deep ink black
          'charcoal': '#2d2d2d',  // Charcoal gray
          'stone': '#4a4a4a',     // Stone gray
          'mist': '#8a8a8a',      // Light mist
          'paper': '#fafaf9',     // Warm off-white paper
          'cloud': '#f5f5f4',     // Cloud white
        },
        'vedic': {
          // Warm Indian accents
          'saffron': '#ff6b35',   // Saffron orange
          'turmeric': '#ffa726',  // Turmeric yellow
          'sindoor': '#e53e3e',   // Vermillion red
          'copper': '#b7791f',    // Copper
          'gold': '#d69e2e',      // Gold
          'earth': '#8b4513',     // Earth brown
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'ink-brush': 'inkBrush 1.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        inkBrush: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'sumi': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'paper': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'ink': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}