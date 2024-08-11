import { getCollection, getEntry } from "astro:content";

import type { CollectionEntry } from "astro:content";

export type NoteCollection = CollectionEntry<"note">;

export const getNotes = async (): Promise<NoteCollection[]> => {
	return await getCollection("note");
};

export const getNote = async (
	slug: string,
): Promise<NoteCollection | undefined> => {
	const note = await getEntry("note", slug);
	return note;
};
