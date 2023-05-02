import Header from '@/components/Header'
import Loading from '@/components/Loading'
import PostFeed from '@/components/Posts/PostFeed'
import UserBio from '@/components/User/UserBio'
import UserHero from '@/components/User/UserHero'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import React from 'react'
import { ClipLoader } from 'react-spinners'

const UserView = () => {
  const router = useRouter()
  const { userId } = router.query
  const { data: user, isLoading } = useUser(userId as string)
  if (isLoading || !user) return <Loading />
  return (
    <>
      <Header showBackArrow label={user?.username} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  )
}

export default UserView
