import { useRouter } from 'next/router'
import { FaFeather } from 'react-icons/fa'
import { navLinks } from '../constants'
const Sidebar = () => {
  const router = useRouter()
  return (
    <div className='col-span-1 h-full pr-4 md:p-4  w-full lg:max-w-[230px]'>
      <div className='flex flex-col items-center space-y-2 md:items-start'>
        {/* nav items */}
        {navLinks.map((nav, index) => {
          const { label, link, Icon } = nav
          return (
            <div
              key={index}
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
        {/* tweet button */}
        <div className='flex items-center justify-center md:w-full rounded-full bg-transparent md:hover:bg-opacity-80 md:bg-sky-500'>
          <div className='rounded-full w-18 h-18 md:h-14 md:w-14 ml-0 md:-ml-2 flex items-center justify-center p-4 md:p-0 bg-sky-500 hover:bg-opacity-80 md:bg-transparent cursor-pointer'>
            <FaFeather size={22} />
          </div>
          <p className='capitalize font-semibold hidden md:block md:-ml-2 '>
            tweet
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
