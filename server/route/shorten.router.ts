import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'
import {slugCheckSchema , createSlugSchema} from '~/server/schema/shorten.schema'

export const shortenRouter = createRouter()
.query('slug-check', {
  input : slugCheckSchema,
  async resolve({ctx, input}){
    // logic for checking slug 
  }
})
.mutation('create-slug', {
  input : createSlugSchema,
  async resolve({ctx, input}){
    // logic for creating slug
  }
})

