import { createRouter } from "../createRouter";
import { shortenRouter } from "./shorten.router";
import { userRouter } from "./user.router";

export const appRouter = createRouter()
  .merge('shorten.', shortenRouter)
  .merge('user.', userRouter)

export type AppRouter = typeof appRouter
