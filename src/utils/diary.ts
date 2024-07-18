import { getCollection } from "astro:content";

import type { CollectionEntry } from "astro:content";
import { sortByDate } from ".";

export type DiaryCollection = CollectionEntry<"diary">;

export const getDiaries = async (): Promise<DiaryCollection[]> => {
	const diaries = await getCollection("diary");
	return sortDiaries(diaries);
};

const sortDiaries = (collections: DiaryCollection[]): DiaryCollection[] => {
	return sortByDate(collections);
};
