import { defineCollection, z } from 'astro:content';

// Regular pages collection (index, resume, etc.)
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    layout: z.string().optional(),
  }),
});

// Blog posts collection (to maintain existing URLs like /facilittante/)
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    alt: z.string().optional(),
  }),
});

// Garden collection - Obsidian-style notes
const garden = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional().nullable(),
    created: z.coerce.date().optional().nullable(),
    updated: z.coerce.date().optional().nullable(),
    aliases: z.array(z.string()).optional().nullable(),
    publish: z.boolean().default(true),
  }),
});

export const collections = {
  pages,
  blog,
  garden,
};