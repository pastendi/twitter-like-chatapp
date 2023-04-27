import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BiArrowBack } from 'react-icons/bi'

interface Props {
  label: string
  showBackArrow?: boolean
}
const Header: React.FC<Props> = ({ label, showBackArrow }) => {
  const router = useRouter()
  const handleBack = useCallback(() => {
    router.back()
  }, [router])
  return (
    <div className='border-b-2 border-neutral-800 p-5'>
      <div className='flex items-center gap-2'>
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={20}
            className='cursor-pointer hover:opacity-70 transition'
          />
        )}
        <h1 className='text-xl font-semibold capitalize'>{label}</h1>
      </div>
    </div>
  )
}

export default Header
