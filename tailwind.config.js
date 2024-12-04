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
                lotion: '#FCFCFC'
            }
        }
    },
  plugins: [require("tailwindcss-animate")],
}
