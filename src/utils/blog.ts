import { getCollection } from 'astro:content'

import type { CollectionEntry } from 'astro:content'
import { sortByDate } from '.'

export type BlogCollection = CollectionEntry<'blog'>

export const getPosts = async (): Promise<BlogCollection[]> => {
    const posts = await getCollection('blog')
    return sortPosts(posts)
}

const sortPosts = (collections: BlogCollection[]): BlogCollection[] => {
    return sortByDate(collections)
}
