import z from 'zod'

export const slugCheckSchema = z.object({
  slug : z.string()
})
export type slugCheckSchema = z.TypeOf<typeof slugCheckSchema>

export const createSlugSchema  = z.object({
  slug : z.string(),
  url : z.string()
})
export type createSlugSchema = z.TypeOf<typeof slugCheckSchema>


