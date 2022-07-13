import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { userSchema } from "../schema/user.schema";

export const userRouter = createRouter()
  .query('sign-in', {
    input : userSchema,
    async resolve({ctx, input}){
      try {
        console.log(input)
        return {
          status : 'success'
        }
      } catch (error) {
        console.error(error)
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'error'
        })
      }
    }
  })
