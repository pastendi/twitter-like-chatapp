import useUser from '@/hooks/useUser'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

interface Props {
  userId: string
  isLarge?: boolean
  hasBorder?: boolean
}

const Avatar: React.FC<Props> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter()
  const { data: user } = useUser(userId)
  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation()
      const url = `/users/${userId}`
      router.push(url)
    },
    [router, userId]
  )
  return (
    <div
      className={`${hasBorder && 'border-4 border-black'} ${
        isLarge ? 'h-32 w-32' : 'h-12 w-12'
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        className='object-cover'
        alt='Avatar'
        onClick={onClick}
        src={user?.profileImage || '/images/avatar.png'}
      />
    </div>
  )
}

export default Avatar
