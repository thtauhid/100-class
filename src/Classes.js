import React from 'react'
import ClassCard from './comps/ClassCard'
import Nav from './Nav'
import classes from './config/classes'

function Classes() {
  return (
    <>
      <Nav />
      <div className='container mt-3'>
        {classes.map( item =>  <ClassCard data={item} /> )}
      </div>
    </>
  )
}

export default Classes