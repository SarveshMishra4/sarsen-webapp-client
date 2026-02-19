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
        primary: {
          50: '#c9ea52',
          100: '#7ed83e',
          200: '#bae6fd',
          300: '#3c1076',
          400: '#f838ab',
          500: '#0ea5e9',
          600: '#6a6f71',
          700: '#2db5ff',
          800: '#ffab1a',
          900: '#b1ff7d',
        },
      },
    },
  },
  plugins: [],
}
export default config