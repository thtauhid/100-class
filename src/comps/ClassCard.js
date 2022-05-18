import React from 'react'
import { Link } from 'react-router-dom'
import List from './List'

function ClassCard({data}) {
  return (
    <>
        <div className="card border-secondary pointer mb-3" style={{maxWidth: '20rem'}}>
            <div className="card-header d-flex justify-content-between align-items-center"> 
                <h4 className="card-title"><Link to={data.link}>{data.title}</Link></h4> 
                <img src={data.avatar} style={{borderRadius: 50}} height="50"  />
            </div>
            
            <div className="card-body">
                <List data={data.assignments} />
            </div>
        </div>
    </>
  )
}

export default ClassCard