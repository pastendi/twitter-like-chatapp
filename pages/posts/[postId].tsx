import Header from '@/components/Header'
import Loading from '@/components/Loading'
import PostItem from '@/components/Posts/PostItem'
import Tweet from '@/components/Tweet'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/router'

const PostView = () => {
  const router = useRouter()
  const { postId } = router.query
  const { data: post, isLoading } = usePost(postId as string)

  if (isLoading) return <Loading />

  return (
    <>
      <Header label='Tweet' showBackArrow />
      <PostItem data={post} />
      <Tweet
        postId={postId as string}
        isComment
        placeholder='Tweet your reply'
      />
    </>
  )
}
export default PostView
