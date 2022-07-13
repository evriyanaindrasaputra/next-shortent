import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '~/lib/prisma'

export async function createContext({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  const session = await getSession({ req })
  return { req, res, prisma, session }
}

export type Context = ReturnType<typeof createContext>
