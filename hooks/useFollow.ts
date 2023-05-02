import { useCallback, useMemo } from 'react'
import useCurrentUser from './useCurrentUser'
import useLoginModel from './useLoginModal'
import useUser from './useUser'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
  const { mutate: mutateFetchedUser } = useUser(userId)
  const loginModel = useLoginModel()
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || []
    return list.includes(userId)
  }, [userId, currentUser])
  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModel.onOpen()
    }
    try {
      await axios.patch('/api/follow', { userId })
      mutateCurrentUser()
      mutateFetchedUser()
      toast.success('success')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [currentUser, userId, mutateCurrentUser, mutateFetchedUser, loginModel])
  return { isFollowing, toggleFollow }
}

export default useFollow
