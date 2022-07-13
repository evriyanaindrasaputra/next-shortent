import { createRouter } from "../createRouter";
import { shortenRouter } from "./shorten.router";
import { userRouter } from "./user.router";

export const appRouter = createRouter()
  .merge('user.', userRouter)
  .merge('shorten.', shortenRouter)

export type AppRouter = typeof appRouter
