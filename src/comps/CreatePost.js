import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore"; 
import { db } from '../config/firebase';
import React, {useState} from 'react'

function CreatePost() {
  const [content, setContent] = useState("")

  const createPost = (e) => {
    // Prevent default
    e.preventDefault()

    // Validate content
    if(content == "") {

    } else {
    
    // Create post
    const insertData = async () => {

      await addDoc(collection(db, "/classes/SEM4_DBMS_01IT0203_erin@idea5.tech/posts"), {
          title: content
      })
  }
  insertData()

    // Reset
    }
  }

  return (
    <div className='create-post-container'>
      <form onSubmit={createPost}>
        <textarea 
          className='form-control' 
          placeholder='Create new post'
          value={content}
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <div className='d-flex justify-content-end'>
          <button type="submit" className='btn btn-primary mt-2'>Post</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost