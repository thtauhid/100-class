import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import List from './List'
import { db } from '../config/firebase';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

function ClassCard({data}) {

  const [teacherName, setTeacherName] = useState("Loading...");

  useEffect(() => {

    const getTeacherName = async () => {
      const docRef = doc(db, "teachers", data.createdBy);
      const teacher = await getDoc(docRef);
      const teacher_name = teacher.data().name
      setTeacherName(teacher_name)
    }

    getTeacherName()
  }, [])
  
  return (
    <>
      <div className='class-card'>
        <div className='card-head'>
          <h2 className='class-title'><Link to={`/class/${data.id}`}>{`${data.subject_name} (${data.class_name})`}</Link></h2>
          <span className='class-teacher'>{ teacherName }</span>
          
        </div>
        <div className='card-body'>
          {/* <List data={data.assignments} /> */}
        </div>
      </div>
    </>
  )
}

export default ClassCard