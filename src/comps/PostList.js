import {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

function PostList() {
    const {id} = useParams()
    const [posts, setPosts] = useState([])

    useEffect(() => {

        const getQueryData = async () => {
            const q = query(collection(db, "posts"), where("class", "==", id))
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            })
            setPosts(data)
        }

        getQueryData()
        
    }, [])
    

    

  return (
    <div className='post-list-container'>
        {
            posts.map(item => {
                return (
                    <div className='post'>
                        <FontAwesomeIcon className='post-icon' icon={faPaperPlane} />
                        <div className='post-details'>
                            <Link className='post-title' to={`/post/${item.id}`}> {item.title} </Link>
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