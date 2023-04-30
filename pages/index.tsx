import Header from '@/components/Header'
import PostFeed from '@/components/Posts/PostFeed'
import Tweet from '@/components/Tweet'

export default function Home() {
  return (
    <>
      <Header showBackArrow label='home' />
      <Tweet placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}
