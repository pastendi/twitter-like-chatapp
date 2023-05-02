import prismaClient from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(405).end()
  }
  try {
    const { userId } = req.body
    const { currentUser } = await serverAuth(req, res)
    const user = await prismaClient.user.findUnique({
      where: { id: currentUser.id },
    })
    if (!user) {
      throw new Error('Invalid ID')
    }

    let updatedFollowingIds = user.followingIds
    if (user.followingIds.includes(userId)) {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      )
    } else {
      updatedFollowingIds.push(userId)
    }
    const updatedUser = await prismaClient.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
