import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import robotsTxt from 'astro-robots-txt'
import metaTags from 'astro-meta-tags'
import remarkCodeTitles from 'remark-code-titles'

import pageInsight from 'astro-page-insight'

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind(),
        sitemap(),
        robotsTxt({
            sitemap: true
        }),
        metaTags(),
        pageInsight()
    ],
    site: 'https://ktym4a.me/',
    base: '/',
    trailingSlash: 'always',
    markdown: {
        shikiConfig: {
            theme: 'catppuccin-latte',
            experimentalThemes: {
                light: 'catppuccin-latte',
                dark: 'catppuccin-mocha'
            }
        },
        remarkPlugins: [remarkCodeTitles]
    }
})
