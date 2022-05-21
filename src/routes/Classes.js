import React, {useState, useEffect} from 'react'
import ClassCard from '../comps/ClassCard'
import Nav from '../Nav'
import { db } from '../config/firebase';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
function Classes() {

  const [classes, setClasses] = useState([]);
  
  useEffect(() => {

    const getClasses = async () => {
      const classesCollectionRef = collection(db, "classes");
      const classData = await getDocs(classesCollectionRef)

      const data = classData.docs.map(item => {
        return {...item.data(), id: item.id}
      }) 

      setClasses(data)
      
    }

    getClasses();

  }, [])
  
  return (
    <>
      <Nav />
      <div className='classes-container d-flex flex-wrap container mt-3'>
        {classes.map( item =>  <ClassCard key={item.id} data={item} /> )}
      </div>
    </>
  )
}

export default Classes