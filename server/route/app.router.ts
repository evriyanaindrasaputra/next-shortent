import { createRouter } from "../createRouter";
import { shortenRouter } from "./shorten.router";

export const appRouter = createRouter()
  .merge('shorten.', shortenRouter)

export type AppRouter = typeof appRouter
