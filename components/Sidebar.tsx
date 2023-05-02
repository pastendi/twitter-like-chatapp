import { useRouter } from 'next/router'
import { FaFeather } from 'react-icons/fa'
import { navLinks } from '../constants'
import { signOut } from 'next-auth/react'
import useLoginModal from '@/hooks/useLoginModal'
import { useCallback } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'
import { BiLogOut } from 'react-icons/bi'
const Sidebar = () => {
  const { data: currentUser } = useCurrentUser()
  const loginModal = useLoginModal()
  const router = useRouter()
  const onTweet = useCallback(() => {
    loginModal.onOpen()
  }, [loginModal])

  const handleNavigation = useCallback(
    async (auth: boolean, link: string) => {
      if (auth && !currentUser) {
        loginModal.onOpen()
      } else if (link === '/users/') {
        router.push(link + currentUser?.id)
      } else {
        router.push(link)
      }
    },
    [router, loginModal, currentUser]
  )
  return (
    <div className='col-span-1 h-full pr-4 md:p-4  w-full lg:max-w-[230px]'>
      <div className='flex flex-col items-center space-y-2 lg:space-y-3 md:items-start'>
        {/* nav items */}
        {navLinks.map((nav, index) => {
          const { label, link, Icon, auth } = nav
          return (
            <div
              key={index}
              onClick={() => handleNavigation(auth, link)}
              className={`flex items-center rounded-full  ${
                index !== 0 && 'md:w-full rounded-3xl'
              } md:hover:bg-opacity-20 md:hover:bg-slate-300`}
            >
              <div className='rounded-full w-18 h-18 md:h-14 md:w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-20 md:hover:bg-transparent cursor-pointer'>
                <Icon size={28} />
              </div>
              {index !== 0 && (
                <p className='capitalize hidden md:block'>{label}</p>
              )}
            </div>
          )
        })}
        {/* logout button */}
        {currentUser && (
          <div
            className='flex items-center md:w-full rounded-3xl 
          md:hover:bg-opacity-20 md:hover:bg-slate-300'
            onClick={() => signOut()}
          >
            <div className='rounded-full w-18 h-18 md:h-14 md:w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-20 md:hover:bg-transparent cursor-pointer'>
              <BiLogOut size={28} />
            </div>
            <p className='capitalize hidden md:block'>logout</p>
          </div>
        )}
        {/* tweet button */}
        <div
          className='flex items-center justify-center md:w-full rounded-full bg-transparent md:hover:bg-opacity-80 md:bg-sky-500'
          onClick={onTweet}
        >
          <div className='rounded-full w-18 h-18 md:h-14 md:w-14 ml-0 md:-ml-2 flex items-center justify-center p-4 md:p-0 bg-sky-500 hover:bg-opacity-80 md:bg-transparent cursor-pointer'>
            <FaFeather size={22} />
          </div>
          <p className='capitalize font-semibold texl-xl hidden md:block md:-ml-2 '>
            tweet
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
