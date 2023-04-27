import useLoginModel from '@/hooks/useLoginModal'
import { useCallback, useState } from 'react'
import Input from './Form/Input'
import ModalLayout from './ModalLayout'
import useRegisterModel from '@/hooks/useRegisterModel'

const LoginModel = () => {
  const loginModel = useLoginModel()
  const registerModel = useRegisterModel()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onToggle = useCallback(() => {
    if (loading) return
    loginModel.onClose()
    registerModel.onOpen()
  }, [loginModel, registerModel, loading])

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)
      // todo
      loginModel.onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [loginModel])
  const body = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={loading}
      />
      <Input
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={loading}
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
      disabled={loading}
      isOpen={loginModel.isOpen}
      title='login'
      actionLabel='sign in '
      onClose={loginModel.onClose}
      onSubmit={onSubmit}
      body={body}
      footer={footer}
    />
  )
}

export default LoginModel
