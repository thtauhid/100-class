import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import { db } from '../config/firebase';
import { doc, getDoc } from "firebase/firestore";

function Banner({bg}) {
  
  const {class_id} = useParams()
  const [classDetails, setClassDetails] = useState({name: "Loading...", subject_code: "Loading..."})

  useEffect(() => {
    
    const getClassDetails = async () => {
      const docRef = doc(db, "classes", class_id)
      const data = await getDoc(docRef);
      setClassDetails(data.data())
    }

    getClassDetails()

  }, [])

  return (
    <>
      <div className="card mb-3 mt-3 p-5 banner-container" style={{background: bg}}>
        <FontAwesomeIcon className='banner-icon' icon={faFolder} />
        <div className="banner-details">
          <h1 className='text-white'>{classDetails.subject_name}</h1>
          <h4 className="text-white">{classDetails.subject_code}</h4>
        </div>
      </div>
    </>
  )
}

export default Banner