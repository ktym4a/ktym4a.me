import { getCollection, getEntry } from "astro:content";

import type { CollectionEntry } from "astro:content";
import { sortByDate } from ".";

export type ProjectsCollection = CollectionEntry<"project">;

export const getProjects = async (): Promise<ProjectsCollection[]> => {
	const posts = await getCollection("project");
	return sortProjects(posts);
};

export const getProject = async (
	slug: string,
): Promise<ProjectsCollection | undefined> => {
	const project = await getEntry("project", slug);
	return project;
};

const sortProjects = (
	collections: ProjectsCollection[],
): ProjectsCollection[] => {
	return sortByDate(collections);
};
