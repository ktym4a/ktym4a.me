import { getCollection } from 'astro:content'

import type { CollectionEntry } from 'astro:content'
import { sortByDate } from '.'

export type ProjectsCollection = CollectionEntry<'projects'>

export const getProjects = async (): Promise<ProjectsCollection[]> => {
    const posts = await getCollection('projects')
    return sortProjects(posts)
}

const sortProjects = (
    collections: ProjectsCollection[]
): ProjectsCollection[] => {
    return sortByDate(collections)
}
