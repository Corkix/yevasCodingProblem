import type { Config } from "tailwindcss/";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb", 
          light: "#60a5fa",
          dark: "#1e40af",
        },
        neutral: {
          DEFAULT: "#f9fafb", 
          dark: "#111827",    
        },
        accent: {
          gradientFrom: "#a78bfa", 
          gradientTo: "#ec4899",   
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],   
        display: ["var(--font-playfair)", "serif"],  
      },
      borderRadius: {
        xl: "1rem",        
        "2xl": "1.25rem",  
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.08)", 
      },
    },
  },
  plugins: [],
};
export default config;
