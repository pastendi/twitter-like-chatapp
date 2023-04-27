import { BsHouseFill, BsBellFill, BsTwitter } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'

export const navLinks = [
  {
    label: '',
    link: '/',
    Icon: BsTwitter,
    auth: false,
  },
  {
    label: 'home',
    link: '/',
    Icon: BsHouseFill,
    auth: false,
  },
  {
    label: 'notifications',
    link: '/notifications',
    Icon: BsBellFill,
    auth: true,
  },
  {
    label: 'profile',
    link: '/users/123',
    Icon: FaUser,
    auth: true,
  },
]
