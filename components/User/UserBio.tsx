import useCurrentUser from '@/hooks/useCurrentUser'
import useUser from '@/hooks/useUser'
import { format } from 'date-fns'
import { useMemo } from 'react'
import Button from '../Form/Button'
import { BiCalendar } from 'react-icons/bi'
import useEditModal from '@/hooks/useEditModal'
import useFollow from '@/hooks/useFollow'

interface Props {
  userId: string
}
const UserBio: React.FC<Props> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser()
  const { data: user } = useUser(userId)
  const editModal = useEditModal()
  const { isFollowing, toggleFollow } = useFollow(userId)
  const createdAt = useMemo(() => {
    if (!user) return null
    return format(new Date(user.createdAt), 'MMMM yyyy')
  }, [user])
  return (
    <div className='border-b-[1px] border-neutral-800 p-4'>
      <div className='flex justify-end'>
        {currentUser?.id === userId ? (
          <Button secondary label='Edit' onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? 'Unfollow' : 'Follow'}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className='mt-8 flex flex-col'>
        <p className='text-2xl font-semibold'>{user?.name}</p>
        <p className='text-md text-sky-500'>@{user?.username}</p>
      </div>
      <div className='flex flex-col mt-4'>
        <p>{user?.bio}</p>
        <div className='flex items-center gap-2 text-neutral-500'>
          <BiCalendar size={24} />
          <p>Joined {createdAt}</p>
        </div>
      </div>
      <div className='flex items-center mt-4 gap-6'>
        <p>{user?.followingIds?.length} Following</p>
        <p>{user?.followersCount || 0} Followers</p>
      </div>
    </div>
  )
}

export default UserBio
