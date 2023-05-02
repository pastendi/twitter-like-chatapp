import useLoginModal from '@/hooks/useLoginModal'
import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import Input from './Form/Input'
import ModalLayout from './ModalLayout'
import useRegisterModal from '@/hooks/useRegisterModal'

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    if (isLoading) return
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal, isLoading])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      await signIn('credentials', {
        email,
        password,
      })
      loginModal.onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [loginModal, email, password])
  const body = (
    <div className='flex flex-col gap-4'>
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
      New here?{' '}
      <span
        className='text-white cursor-pointer hover:underline'
        onClick={onToggle}
      >
        Create an account
      </span>
    </div>
  )
  return (
    <ModalLayout
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='login'
      actionLabel='sign in '
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={body}
      footer={footer}
    />
  )
}

export default LoginModal
