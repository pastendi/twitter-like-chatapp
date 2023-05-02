import Comment from './Comment'

interface CommentFeedProps {
  comments?: Record<string, any>[]
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment: Record<string, any>) => (
        <Comment key={comment.id} data={comment} />
      ))}
    </>
  )
}

export default CommentFeed
