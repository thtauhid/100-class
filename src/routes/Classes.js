import React, {useState, useEffect} from 'react'
import ClassCard from '../comps/ClassCard'
import Nav from '../Nav'
import { db } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";

function Classes() {

  const [classes, setClasses] = useState([]);
  
  const classesCollectionRef = collection(db, "classes");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(classesCollectionRef);
      setClasses(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getUsers();
  }, [])
  

  
  return (
    <>
      <Nav />
      <div className='classes-container d-flex container mt-3'>
        {classes.map( item =>  <ClassCard key={item.id} data={item} /> )}
      </div>
    </>
  )
}

export default Classes