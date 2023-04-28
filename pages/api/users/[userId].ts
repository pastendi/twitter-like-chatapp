import prismaClient from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).end()
  try {
    const { userId } = req.query
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user id')
    }
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    })
    const followerCount = await prismaClient.user.count({
      where: {
        followingIds: { has: userId },
      },
    })
    return res.status(200).json({ ...user, followerCount })
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
