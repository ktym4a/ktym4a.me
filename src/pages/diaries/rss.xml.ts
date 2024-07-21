import { DIARY_LEARNING_DESCRIPTION } from "@/constants/index";
import { getDiaries } from "@/utils/diary";
import { formatPostDate } from "@/utils/index";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

const diaries = await getDiaries().then((diaries) => diaries.reverse());

export function GET(context: APIContext) {
	const site = new URL("diaries", context.site ?? "");

	return rss({
		title: "ktym4a's Diaries",
		description: DIARY_LEARNING_DESCRIPTION,
		site,
		items: diaries.map((diary) => ({
			link: `${site}/${diary.slug}/`,
			title: `${formatPostDate(diary.data.publishedDate)}の学び`,
			pubDate: new Date(diary.data.publishedDate),
		})),
	});
}
