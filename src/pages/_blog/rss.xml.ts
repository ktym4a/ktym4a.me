import { BLOG_DESCRIPTION } from "@/constants/index";
import { getPosts } from "@/utils/blog";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

const posts = await getPosts().then((post) => post.reverse());

export function GET(context: APIContext) {
	const site = new URL("blog", context.site ?? "");

	return rss({
		title: "ktym4a's Blog",
		description: BLOG_DESCRIPTION,
		site,
		items: posts.map((post) => ({
			link: `${site}/${post.slug}/`,
			title: post.data.title,
			description: post.data.description,
			pubDate: new Date(post.data.publishedDate),
		})),
	});
}
