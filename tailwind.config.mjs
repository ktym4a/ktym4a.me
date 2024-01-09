/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: ['class', '.ctp-mocha'],
    theme: {
        extend: {
            fontFamily: {
                mono: [
                    `'ml', 'Inter', ${defaultTheme.fontFamily.mono}`,
                    {
                        fontFeatureSettings: '"ss07" 1, "zero" 1'
                    }
                ],
                'mono-script': [
                    `'ml', 'Inter', ${defaultTheme.fontFamily.mono}`,
                    {
                        fontFeatureSettings: '"ss02" 1'
                    }
                ]
            },
            gradientColorStopPositions: {
                33: '33.33%',
                66: '66.66%'
            },
            gridAutoColumns: {
                full: '100%'
            },
            saturate: {
                350: '3.5'
            },
            spacing: {
                18: '4.5rem',
                96: '20rem',
                104: '24rem'
            },
            transitionProperty: {
                filter: 'filter'
            },
            translate: {
                3.25: '0.85rem'
            }
        }
    },
    plugins: [
        require('@catppuccin/tailwindcss')({
            prefix: 'ctp'
        })
    ]
}
