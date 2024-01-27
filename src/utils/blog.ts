import { getCollection } from 'astro:content'

import type { CollectionEntry } from 'astro:content'

export type BlogCollection = CollectionEntry<'blog'>

export const getPosts = async (): Promise<BlogCollection[]> => {
    const posts = await getCollection('blog')
    return sortPosts(posts)
}

const sortPosts = (collections: BlogCollection[]): BlogCollection[] => {
    return collections
        .sort((a, b) => {
            const aDate = new Date(a.data.publishedDate)
            const bDate = new Date(b.data.publishedDate)
            return aDate > bDate ? -1 : 1
        })
        .reverse()
}

export const formatPostDate = (date: Date | undefined): string => {
    if (!date) return ''
    return new Intl.DateTimeFormat('ja-JP', {
        dateStyle: 'medium',
        timeZone: 'Asia/Tokyo'
    }).format(date)
}
