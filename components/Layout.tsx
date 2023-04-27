import FollowBar from './FollowBar'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='container mx-auto max-w-6xl'>
      <div className='grid grid-cols-4 min-h-screen h-full'>
        <Sidebar />
        <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-700'>
          {children}
        </div>
        <FollowBar />
      </div>
    </div>
  )
}

export default Layout
