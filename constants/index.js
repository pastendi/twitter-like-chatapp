import { BsHouseFill, BsBellFill, BsTwitter } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
export const navLinks = [
  {
    label: '',
    link: '/',
    Icon: BsTwitter,
  },
  {
    label: 'home',
    link: '/',
    Icon: BsHouseFill,
  },
  {
    label: 'notifications',
    link: '/notifications',
    Icon: BsBellFill,
  },
  {
    label: 'profile',
    link: '/users/123',
    Icon: FaUser,
  },
  {
    label: 'logout',
    link: '/logout',
    Icon: BiLogOut,
  },
]
