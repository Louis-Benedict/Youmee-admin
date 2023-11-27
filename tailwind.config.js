const { colors } = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                ...colors,
                'primary-dark': '#0C0C0C',
                'secondary-dark': '#111111',
                'window-dark': '#1b1b1b',
                'subwindow-dark': '#363636',
                'accent-dark': '#eb1f88',
                'primary-font-dark': '#c7c7c7',
                'secondary-font-dark': '#747474',
                'light-primary': '#f2f2f2',
                'light-secondary': '#E8A0BF',
                'light-tertiary': '#BA90C6',
                'light-accent': '#C0DBEA',
                ym_gradient_start: '#CE0B0B',
                ym_gradient_end: '#6865FD',
            },
            transitionProperty: {
                height: 'height',
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-hide': {
                    /* IE and Edge */
                    '-ms-overflow-style': 'none',

                    /* Firefox */
                    'scrollbar-width': 'none',

                    /* Safari and Chrome */
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
                '.hide-autofill': {
                    input: '-webkit-autofill',
                    input: '-webkit-autofill:hover',
                    input: '-webkit-autofill:focus',
                    textarea: '-webkit-autofill',
                    textarea: '-webkit-autofill:hover',
                    textarea: '-webkit-autofill:focus',
                    select: '-webkit-autofill',
                    select: '-webkit-autofill:hover',
                    select: '-webkit-autofill:focus ',
                    '-webkit-text-fill-color': 'border-neutral-500',
                    '-webkit-box-shadow': '0 0 0px 1000px #000 inset',
                },
            })
        }),
    ],
}
