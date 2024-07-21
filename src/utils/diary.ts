import { getCollection, getEntry } from "astro:content";

import type { CollectionEntry } from "astro:content";
import { formatDateToCollectionName, sortByDate } from ".";

export type DiaryCollection = CollectionEntry<"diary">;

export const getDiaries = async (): Promise<DiaryCollection[]> => {
	const diaries = await getCollection("diary");
	return sortDiaries(diaries);
};

export const getDiary = async (
	date: Date,
): Promise<DiaryCollection | undefined> => {
	const diary = await getEntry("diary", formatDateToCollectionName(date));
	return diary;
};

const sortDiaries = (collections: DiaryCollection[]): DiaryCollection[] => {
	const diaries = sortByDate(collections) as DiaryCollection[];
	return diaries.filter((diary) => diary.slug !== "template");
};
