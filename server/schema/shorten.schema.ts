import z from 'zod'

export const slugSchema  = z.object({
  slug : z.string(),
  url : z.string(),
  maxVisit : z.number(),
})
export type SlugObject = z.TypeOf<typeof slugSchema>

export const listSlugSchema = z.object({
  page : z.number(),
  limit : z.number(),
})
export type listSlugSchema = z.TypeOf<typeof listSlugSchema>




