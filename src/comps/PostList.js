import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

function PostList({data}) {
  return (
    <div className='post-list-container'>
        {
            data.map(item => {
                return (
                    <div className='post'>
                        <FontAwesomeIcon className='post-icon' icon={faPaperPlane} />
                        <div className='post-details'>
                            <Link className='post-title' to={item.link}> {item.title} </Link>
                            <p className='post-date'>12 Aug</p>
                        </div>
                    </div>
                ) 
            })
        }
    </div>
  )
}

export default PostList