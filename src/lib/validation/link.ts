import { z } from 'zod'

export const linkSchema = z.object({
  key: z.string().regex(/^[a-zA-Z0-9_-]+$/i, {
    message: 'Key must only contain letters, numbers, dashes, and underscores',
  }),
  url: z.string().url().trim(),
  archived: z.boolean().optional(),
  clicks: z.number().int().optional(),
  createdAt: z.date().optional(),
})

export type LinkType = z.infer<typeof linkSchema>
