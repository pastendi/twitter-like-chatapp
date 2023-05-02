import usePosts from '@/hooks/usePosts'
import PostItem from './PostItem'

interface Props {
  userId?: string
}

const PostFeed: React.FC<Props> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId)

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post.id} data={post} />
      ))}
    </>
  )
}

export default PostFeed
