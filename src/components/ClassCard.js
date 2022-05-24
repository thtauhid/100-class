import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import List from "./List"
import { db } from "../firebase"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"

function ClassCard({ data }) {
	return (
		<>
			<div className='class-card'>
				<div className='card-head'>
					<h2 className='class-title'>
						<Link to={`/class/${data.id}`}>{data.class_name}</Link>
					</h2>
					<span className='class-teacher'>{data.teacher.name}</span>
				</div>
				<div className='card-body'>
					{/* <List data={data.assignments} /> */}
				</div>
			</div>
		</>
	)
}

export default ClassCard
