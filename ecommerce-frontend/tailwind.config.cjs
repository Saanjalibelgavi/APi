module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Loom & Key - Sophisticated earthy palette
        primary: {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#ebe7e1',
          300: '#dbd5cb',
          400: '#c9bfb0',
          500: '#a89b8c', // Main earth tone
          600: '#8d7f6f',
          700: '#726656',
          800: '#5a5045',
          900: '#433c33',
        },
        secondary: {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f4f0e9',
          300: '#ebe4d7',
          400: '#ddd1bc',
          500: '#c4b5a0', // Warm beige
          600: '#a9977f',
          700: '#8b7a63',
          800: '#6e614f',
          900: '#544b3d',
        },
        accent: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280', // Sophisticated gray
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e8ebe9',
          200: '#d4dad5',
          300: '#b3bdb6',
          400: '#8d9a93',
          500: '#6b7871', // Sage green accent
          600: '#566158',
          700: '#454e47',
          800: '#3a403a',
          900: '#2f3530',
        },
        cream: '#faf9f7',
        sand: '#ebe7e1',
        stone: '#a89b8c',
        charcoal: '#2f3530',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.08)',
        'strong': '0 10px 40px -5px rgba(0, 0, 0, 0.15), 0 20px 50px -10px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(14, 165, 233, 0.3)',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out",
        fadeInUp: "fadeInUp 0.8s ease-in-out",
        slideInRight: "slideInRight 0.5s ease-out",
        bounce: "bounce 1s infinite",
        shimmer: "shimmer 2s infinite linear",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
