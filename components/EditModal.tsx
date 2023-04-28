import useCurrentUser from '@/hooks/useCurrentUser'
import useEditModal from '@/hooks/useEditModal'
import useUser from '@/hooks/useUser'
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import ModalLayout from './ModalLayout'
import Input from './Form/Input'
import ImageUpload from './imageUpload'

const EditModal = () => {
  const { data: user } = useCurrentUser()
  const { mutate: updateUser } = useUser(user?.id)
  const editModal = useEditModal()
  const [profileImage, setProfileImage] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    setProfileImage(user?.profileImage)
    setCoverImage(user?.coverImage)
    setName(user?.name)
    setUsername(user?.username)
    setBio(user?.bio)
  }, [user])
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      })
      updateUser()
      toast.success('Updated')
      editModal.onClose()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [name, username, bio, profileImage, coverImage, editModal, updateUser])
  const body = (
    <div className='flex flex-col gap-4'>
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label='Upload profile image'
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label='Upload cover image'
      />
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
        placeholder='Bio'
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  )
  return (
    <ModalLayout
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title='Edit your profile'
      actionLabel='Save'
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={body}
    />
  )
}

export default EditModal
