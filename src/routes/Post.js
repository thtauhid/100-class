import Nav from '../Nav'
import Comments from '../comps/Comments'
import post from '../config/post'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons'
import CommentBox from '../comps/CommentBox';



function Post() {
    
  return (
    <>
        <Nav />
        <div className="mt-3 container post-container">
            <h1 className="post-title">{post.title}</h1>
            
            <div className="post-meta mb-3">
                <span className='post-author'>
                    <FontAwesomeIcon className='post-icon' icon={faUser} />
                    {post.author}
                </span>
                <span className='post-date'>
                    <FontAwesomeIcon className='post-icon' icon={faClock} />
                    {post.date}
                </span>
            </div>

            <p className='post-description text-justify'>{post.description}</p>
            
            <Comments data={post.comments} />

            <br />
            <hr />

            <CommentBox />
        </div>
    </>
  )
}

export default Post