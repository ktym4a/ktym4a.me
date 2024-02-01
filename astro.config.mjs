import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import robotsTxt from 'astro-robots-txt'

import metaTags from 'astro-meta-tags'

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind(),
        sitemap(),
        robotsTxt({
            sitemap: true
        }),
        metaTags()
    ],
    site: 'https://ktym4a.me/',
    base: '/',
    trailingSlash: 'always',
    markdown: {
        shikiConfig: {
            theme: 'catppuccin-mocha'
        }
    }
})
