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
        brand: {
          dark: '#050510',
          darker: '#030308',
          card: '#0B1020',
          elevated: '#11182B',
          purple: '#8B5CF6',
          'purple-light': '#A78BFA',
          blue: '#2563EB',
          'blue-light': '#3B82F6',
          cyan: '#22D3EE',
          'cyan-light': '#67E8F9',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% -20%, rgba(139, 92, 246, 0.25), rgba(37, 99, 235, 0.15), transparent 70%)',
        'card-glow': 'radial-gradient(circle at top left, rgba(139, 92, 246, 0.12), transparent 40%)',
        'accent-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #2563EB 50%, #22D3EE 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      boxShadow: {
        'neon-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'neon-blue': '0 0 25px -5px rgba(37, 99, 235, 0.4)',
        'neon-cyan': '0 0 25px -5px rgba(34, 211, 238, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
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
