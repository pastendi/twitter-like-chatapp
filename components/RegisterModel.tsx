import useLoginModel from '@/hooks/useLoginModal'
import { useCallback, useState } from 'react'
import axios from 'axios'
import Input from './Form/Input'
import ModalLayout from './ModalLayout'
import useRegisterModel from '@/hooks/useRegisterModel'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

const RegisterModel = () => {
  const loginModel = useLoginModel()
  const registerModel = useRegisterModel()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    if (isLoading) return
    registerModel.onClose()
    loginModel.onOpen()
  }, [loginModel, registerModel, isLoading])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      await axios.post('/api/register', { email, password, name, username })
      toast.success('Account created successfully')
      signIn('credentials', {
        email,
        password,
      })
      registerModel.onClose()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [registerModel, email, password, name, username])
  const body = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )
  const footer = (
    <div className='text-neutral-400 text-center'>
      Already have an account?{' '}
      <span
        className='text-white cursor-pointer hover:underline'
        onClick={onToggle}
      >
        Sign In
      </span>
    </div>
  )
  return (
    <ModalLayout
      disabled={isLoading}
      isOpen={registerModel.isOpen}
      title='Create an account'
      actionLabel='sign up'
      onClose={registerModel.onClose}
      onSubmit={onSubmit}
      body={body}
      footer={footer}
    />
  )
}

export default RegisterModel
