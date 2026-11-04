/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aurora: {
          bg: '#07070D',
          surface: '#0E0F1C',
          elevated: '#151629',
          violet: '#7C5CFF',
          magenta: '#E14BFF',
          amber: '#FFB547',
          text: '#F5F3FF',
          muted: '#A9A7C2',
        },
        brand: {
          bg: '#07070D',
          dark: '#07070D',
          darker: '#040408',
          card: '#0E0F1C',
          surface: '#0E0F1C',
          elevated: '#151629',
          violet: '#7C5CFF',
          purple: '#7C5CFF',
          'purple-light': '#9B82FF',
          magenta: '#E14BFF',
          blue: '#7C5CFF',
          'blue-light': '#9B82FF',
          amber: '#FFB547',
          cyan: '#FFB547',
          'cyan-light': '#FFC97A',
          text: '#F5F3FF',
          muted: '#A9A7C2',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, #7C5CFF 0%, #E14BFF 50%, #FFB547 100%)',
        'aurora-glow': 'radial-gradient(circle at 50% -20%, rgba(124, 92, 255, 0.25), rgba(225, 75, 255, 0.15), transparent 70%)',
        'card-glow': 'radial-gradient(circle at top left, rgba(124, 92, 255, 0.15), transparent 45%)',
        'accent-gradient': 'linear-gradient(135deg, #7C5CFF 0%, #E14BFF 50%, #FFB547 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 100%)',
      },
      boxShadow: {
        'aurora-amber': '0 0 25px rgba(255, 181, 71, 0.35)',
        'aurora-violet': '0 0 25px rgba(124, 92, 255, 0.35)',
        'aurora-magenta': '0 0 25px rgba(225, 75, 255, 0.35)',
        'neon-purple': '0 0 25px -5px rgba(124, 92, 255, 0.4)',
        'neon-blue': '0 0 25px -5px rgba(225, 75, 255, 0.4)',
        'neon-cyan': '0 0 25px -5px rgba(255, 181, 71, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
