import useUser from '@/hooks/useUser'
import Image from 'next/image'
import Avatar from '../Avatar'

interface Props {
  userId: string
}

const UserHero: React.FC<Props> = ({ userId }) => {
  const { data: user } = useUser(userId)
  return (
    <>
      <div className='bg-neutral-700 h-44 relative'>
        {user?.coverImage && (
          <Image
            src={user?.coverImage}
            fill
            alt='Cover image'
            className='object-cover'
          />
        )}
        <div className='absolute -bottom-16 left-4'>
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </>
  )
}

export default UserHero
