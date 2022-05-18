import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

function PostList({data}) {
  return (
    <div className='post-list-container'>
        {
            data.map(item => {
                return (
                    <div className='post-list-single'>
                        <FontAwesomeIcon className='post-list-single-icon' icon={faPaperPlane} />
                        <div className='post-list-details'>
                            <i className='fa-solid fa-circle-book-open'></i>
                            <Link className='post-list-single-title' to={item.link}> {item.title} </Link>
                            {/* <p>{item.date}</p> */}
                            <p className='post-list-single-date'>12 Aug</p>
                        </div>
                    </div>
                ) 
            })
        }
    </div>
  )
}

export default PostList