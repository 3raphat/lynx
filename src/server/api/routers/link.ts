import { z } from 'zod'

import { linkSchema } from '@/lib/validation/link'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc'

export const linkRouter = createTRPCRouter({
  create: protectedProcedure
    .input(linkSchema)
    .mutation(async ({ ctx, input }) => {
      const existingLink = await ctx.db.link.findUnique({
        where: { key: input.key },
      })

      if (existingLink) {
        throw new Error("Link's key already exists")
      }

      return await ctx.db.link.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      })
    }),
  delete: protectedProcedure
    .input(linkSchema.pick({ key: true }))
    .mutation(async ({ ctx, input }) => {
      const link = await ctx.db.link.findUnique({
        where: { key: input.key },
      })

      if (!link) {
        throw new Error('Link not found')
      }

      return await ctx.db.link.delete({
        where: { key: input.key },
      })
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.link.deleteMany({
      where: {
        userId: ctx.session.user.id,
      },
    })
  }),
  edit: protectedProcedure
    .input(
      linkSchema.extend({
        rawKey: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.link.update({
        where: { key: input.rawKey },
        data: {
          key: input.key,
          url: input.url,
        },
      })
    }),
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.link.findFirst({
      orderBy: { createdAt: 'desc' },
      where: {
        userId: ctx.session.user.id,
      },
    })
  }),
  getAll: protectedProcedure
    .input(
      z
        .object({
          orderBy: z.enum(['createdAt', 'clicks', 'key']).optional(),
          orderDirection: z.enum(['asc', 'desc']).optional(),
        })
        .optional()
    )
    .query(({ ctx, input }) => {
      return ctx.db.link.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        orderBy: {
          [input?.orderBy ?? 'createdAt']: input?.orderDirection ?? 'desc',
        },
      })
    }),
  fetch: publicProcedure
    .input(linkSchema.pick({ key: true }))
    .query(async ({ ctx, input }) => {
      const link = await ctx.db.link.findUnique({
        where: { key: input.key },
      })

      if (!link) {
        throw new Error('Link not found')
      }

      return link
    }),
  updateClick: protectedProcedure
    .input(linkSchema.pick({ key: true }))
    .query(async ({ ctx, input }) => {
      const link = await ctx.db.link.findUnique({
        where: { key: input.key },
      })

      if (!link) {
        throw new Error('Link not found')
      }
      // link.clicks += 1
      return await ctx.db.link.update({
        where: { key: input.key },
        data: {
          clicks: link.clicks + 1,
        },
      })
    }),
})
