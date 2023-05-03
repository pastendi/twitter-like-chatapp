import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/libs/serverAuth'
import prismaClient from '@/libs/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const { postId } = req.body

    const { currentUser } = await serverAuth(req, res)

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID')
    }

    const post = await prismaClient.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (!post) {
      throw new Error('Invalid ID')
    }

    let newlikedIds = post.likedIds

    if (post.likedIds.includes(currentUser.id)) {
      newlikedIds = newlikedIds.filter((id) => id !== currentUser.id)
    } else {
      newlikedIds.push(currentUser.id)
      try {
        const post = await prismaClient.post.findUnique({
          where: { id: postId },
        })
        if (post?.userId) {
          await prismaClient.notification.create({
            data: {
              body: `${currentUser.name} liked your tweet`,
              userId: post.userId,
            },
          })
          await prismaClient.user.update({
            where: { id: post.userId },
            data: {
              hasNotification: true,
            },
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    const updatedPost = await prismaClient.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: newlikedIds,
      },
    })

    return res.status(200).json(updatedPost)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
