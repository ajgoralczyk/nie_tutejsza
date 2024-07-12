import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--yellow)',
        background: 'var(--light-yellow)',
        background2: 'var(--white)', // rename
        primary: 'var(--black)',
        secondary: 'var(--blue)',
        yellow: 'var(--yellow)',
        // destructive: {
        //   DEFAULT: 'hsl(var(--destructive))',
        //   foreground: 'hsl(var(--destructive-foreground))'
        // },
        // muted: {
        //   DEFAULT: 'hsl(var(--muted))',
        //   foreground: 'hsl(var(--muted-foreground))'
        // },
        // accent: {
        //   DEFAULT: 'hsl(var(--accent))',
        //   foreground: 'hsl(var(--accent-foreground))'
        // },
        // popover: {
        //   DEFAULT: 'hsl(var(--popover))',
        //   foreground: 'hsl(var(--popover-foreground))'
        // },
        // card: {
        //   DEFAULT: 'hsl(var(--card))',
        //   foreground: 'hsl(var(--card-foreground))'
        // },
      },
    },
  },
  plugins: [],
};
export default config;
