import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

import robotsTxt from 'astro-robots-txt'

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind(),
        sitemap({
            filter: (page) =>
                page !== 'https://ktym4a.me/about/' &&
                page !== 'https://ktym4a.me/about/me/'
        }),
        robotsTxt({
            sitemap: true
        })
    ],
    site: 'https://ktym4a.me/',
    base: '/',
    trailingSlash: 'always'
})
