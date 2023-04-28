import Header from '@/components/Header'
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
  if (isLoading || !user) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightBlue' size={80} />
      </div>
    )
  }
  return (
    <>
      <Header showBackArrow label={user?.username} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  )
}

export default UserView
