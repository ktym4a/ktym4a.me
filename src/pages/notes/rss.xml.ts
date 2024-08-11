import { NOTE_DESCRIPTION } from "@/constants/index";
import { getNotes } from "@/utils/note";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

const notes = await getNotes().then((notes) => notes.reverse());

export function GET(context: APIContext) {
	const site = new URL("notes", context.site ?? "");

	return rss({
		title: "ktym4a's Notes",
		description: NOTE_DESCRIPTION,
		site,
		items: notes.map((note) => ({
			link: `${site}/${note.slug}/`,
			title: note.data.title,
			pubDate: new Date(note.data.publishedDate),
		})),
	});
}
