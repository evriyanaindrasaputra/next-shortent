import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'
import { createSlugSchema } from '~/server/schema/shorten.schema'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { prisma } from "~/lib/prisma";

export const shortenRouter = createRouter()
  .query('all-slug', {
    async resolve({ ctx }) {
      return await prisma.shortLink.findMany(
        {
          select: {
            slug: true
          }
        }
      )
    }
  })
  .mutation('create-slug', {
    input: createSlugSchema,
    async resolve({ ctx, input }) {
      // logic for creating slug
      try {
        const data = await prisma.shortLink.create({
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

