/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F5',
        foreground: '#2B2723',
        primary: {
          DEFAULT: '#2D5A27',
          foreground: '#FAF9F5',
          deep: '#1E3D1A',
        },
        secondary: {
          DEFAULT: '#EBEFE7',
          foreground: '#1E3D1A',
        },
        accent: {
          DEFAULT: '#D9531E',
          foreground: '#FFFFFF',
        },
        orange: {
          DEFAULT: '#E06D28',
          foreground: '#FFFFFF',
        },
        gold: {
          DEFAULT: '#E5A93C',
          foreground: '#1E3D1A',
        },
        muted: {
          DEFAULT: '#EFF2EC',
          foreground: '#6A6860',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#2B2723',
        },
        border: '#E2E5DC',
        input: '#E2E5DC',
        destructive: {
          DEFAULT: '#D32F2F',
          foreground: '#FFFFFF',
        },
        sidebar: {
          DEFAULT: '#1E3D1A',
          foreground: '#F5F7F2',
          primary: '#E5A93C',
          'primary-foreground': '#1E3D1A',
          accent: '#2D5A27',
          border: '#2E5429',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Nunito Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(43, 39, 35, 0.15)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
