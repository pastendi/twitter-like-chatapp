import useLoginModel from '@/hooks/useLoginModal'
import { useCallback, useState } from 'react'
import Input from './Form/Input'
import ModalLayout from './ModalLayout'
import useRegisterModel from '@/hooks/useRegisterModel'

const RegisterModel = () => {
  const loginModel = useLoginModel()
  const registerModel = useRegisterModel()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const onToggle = useCallback(() => {
    if (loading) return
    registerModel.onClose()
    loginModel.onOpen()
  }, [loginModel, registerModel, loading])

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)
      // todo registering user
      registerModel.onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [registerModel])
  const body = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={loading}
      />
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
      disabled={loading}
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
