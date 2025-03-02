/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import { defineConfig } from 'vite'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {},
  },
  plugins: [],
}

