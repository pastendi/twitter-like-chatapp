import useSWR from 'swr'
import fetcher from '@/libs/fetcher'
import prismaClient from '@/libs/prismadb'

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/currentUser', fetcher)
  return { data, error, isLoading, mutate }
}
export default useCurrentUser
