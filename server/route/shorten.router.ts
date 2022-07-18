import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'
import { slugSchema, listSlugSchema } from '~/server/schema/shorten.schema'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { z } from "zod";

export const shortenRouter = createRouter()
  .query('list-slug', {
    input: listSlugSchema,
    async resolve({ ctx, input }) {
      try {
        const data = await (await ctx).prisma.shortLink.findMany(
          {
            select : {
              id: true,
              maxVisit : true,
              slug: true,
              url: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          }
        )
        return {
          totalPage: Math.ceil(data.length / input.limit),
          totalResult: data.length,
          list: data.slice(input.page * input.limit, (input.page + 1) * input.limit),
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
  .mutation('create-slug', {
    input: slugSchema,
    async resolve({ ctx, input }) {
      // logic for creating slug
      try {
        const data = await (await ctx).prisma.shortLink.create({
          data: {
            slug: input.slug,
            url: input.url,
            maxVisit: input.maxVisit
          }
        })
        return data
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new trpc.TRPCError({
              code: 'CONFLICT',
              message: 'Shorten already exists'
            })
          }
        }
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong'
        })
      }
    }
  })
  .mutation('delete-slug', {
    input: z.object({
      id: z.string()
    }),
    async resolve({ ctx, input }) {
      try {
        await (await ctx).prisma.shortLink.delete({
          where : {
            id: input.id
          }
        })
        return {
          message : 'Successfully deleted'
        }
      } catch (error) {
        console.error(error)
      }
    }
  })

