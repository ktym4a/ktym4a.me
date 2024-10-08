import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		image: z.string().optional(),
		tags: z.array(z.string()),
		publishedDate: z.date(),
		updatedDate: z.date().optional(),
		lang: z.string().optional(),
	}),
});

const projectCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		image: z.string().optional(),
		link: z.string(),
		publishedDate: z.date(),
	}),
});

const diaryCollection = defineCollection({
	type: "content",
	schema: z.object({
		publishedDate: z.date(),
	}),
});

const noteCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedDate: z.date(),
	}),
});

export const collections = {
	blog: blogCollection,
	project: projectCollection,
	diary: diaryCollection,
	note: noteCollection,
};
