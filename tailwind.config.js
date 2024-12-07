import * as tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
      './index.html',
      './src/**/*.{js,jsx}',
    ],
    theme: {
    	fontFamily: {
    		sans: ['Nunito Variable', 'sans-serif']
    	},
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			cinnabar: '#EF4123',
    			beer: '#FA8B1F',
    			spaceCadet: '#1C2D5A',
    			indigo: '#1D2A5F',
    			raisinBlack: '#212121',
    			taupeGray: '#888888',
    			brightGray: '#EFEFEF',
    			ghostWhite: '#F9F9FD',
    			lotion: '#FCFCFC',
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		}
    	}
    },
  plugins: [tailwindcssAnimate],
}
