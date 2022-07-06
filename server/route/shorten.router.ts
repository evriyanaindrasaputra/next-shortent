import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'
import {slugCheckSchema , createSlugSchema} from '~/server/schema/shorten.schema'
import { prisma } from "~/lib/prisma";

export const shortenRouter = createRouter()
.query('all-slug', {
  async resolve({ctx}){
    return await prisma.shortLink.findMany(
      {
        select : {
          slug: true
        }
      }
    )
  }
})
.query('slug-check', {
  input : slugCheckSchema,
  async resolve({ctx, input}){
    // logic for checking slug 
    try {
      const count = await prisma.shortLink.count({
        where: {
          slug : input.slug
        }
      })
      return {used : count > 0}
    } catch (error) {
      
    }
  }
})
.mutation('create-slug', {
  input : createSlugSchema,
  async resolve({ctx, input}){
    // logic for creating slug
  }
})

