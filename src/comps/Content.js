import posts from '../config/posts'
import PostList from './PostList'

function Content() {
  return (
    <>
        <PostList data={posts} />
    </>
  )
}

export default Content