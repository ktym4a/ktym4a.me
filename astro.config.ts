import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import metaTags from "astro-meta-tags";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

import pageInsight from "astro-page-insight";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		sitemap(),
		robotsTxt({
			sitemap: true,
		}),
		metaTags(),
		pageInsight({
			lh: {},
			cache: true,
			firstFetch: "open",
			// build: {
			// 	bundle: true,
			// 	showOnLoad: true,
			// },
		}),
	],
	site: "https://ktym4a.me/",
	base: "/",
	trailingSlash: "always",
	markdown: {
		shikiConfig: {
			theme: "catppuccin-latte",
			themes: {
				light: "catppuccin-latte",
				dark: "catppuccin-mocha",
			},
		},
	},
});
