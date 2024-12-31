import { getCollection, getEntry } from "astro:content";

import type { CollectionEntry } from "astro:content";
import { sortByDate } from ".";

export type NoteCollection = CollectionEntry<"note">;

export const getNotes = async (): Promise<NoteCollection[]> => {
	const posts = await getCollection("note");
	return sortPosts(posts);
};

export const getNote = async (
	slug: string,
): Promise<NoteCollection | undefined> => {
	const note = await getEntry("note", slug);
	return note;
};

const sortPosts = (collections: NoteCollection[]): NoteCollection[] => {
	return sortByDate(collections);
};
