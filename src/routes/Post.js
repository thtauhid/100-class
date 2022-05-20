import { useState, useEffect } from 'react';
import Nav from '../Nav'
import Comments from '../comps/Comments'
import post from '../config/post'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons'
import CommentBox from '../comps/CommentBox';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc } from "firebase/firestore";

function Post() {

    const {id} = useParams()
    const [postDetails, setPostDetails] = useState({title: "Loading...", post: "Loading...", time: "Loading...", author_name: "Loading..."})

    useEffect(() => {

    const getPostDetails = async () => {
        const docRef = doc(db, "posts", id)
        const data = await getDoc(docRef)
        setPostDetails({...data.data(), time: data.data().createdAt.toDate().toString(), })
    }

    getPostDetails()

    }, [])
    
  return (
    <>
        <Nav />
        <div className="mt-3 container post-container">
            <h1 className="post-title">{postDetails.title}</h1>
            
            <div className="post-meta mb-3">
                <span className='post-author'>
                    <FontAwesomeIcon className='post-icon' icon={faUser} />
                    {postDetails.author_name}
                </span>
                <span className='post-date'>
                    <FontAwesomeIcon className='post-icon' icon={faClock} />
                    {postDetails.time}
                </span>
            </div>

            <p className='post-description text-justify'>{postDetails.post}</p>
            
            <Comments data={post.comments} />

            <br />
            <hr />

            <CommentBox />
        </div>
    </>
  )
}

export default Post