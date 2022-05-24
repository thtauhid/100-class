import React from "react"
import { Link } from "react-router-dom"
import Assignments from "./Assignments"
import Banner from "./components/Banner"
import CreateAssignment from "./CreateAssignment"
import Nav from "./Nav"

function ClassWorks() {
	return (
		<>
			<Nav />
			<div className='container classworks-container mt-3'>
				{/* <Banner /> */}

				<Assignments />
			</div>
		</>
	)
}

export default ClassWorks
