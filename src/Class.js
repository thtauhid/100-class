import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Nav from "./Nav"
import Announcements from "./Announcements"
import Banner from "./components/Banner"
import CreateAnnouncement from "./CreateAnnouncement"

function Class() {
	const { class_id } = useParams()

	return (
		<>
			<Nav />
			<div className='container'>
				<Banner />
				<div className='row'>
					<main className=''>
						<Announcements />
					</main>
				</div>
			</div>
		</>
	)
}

export default Class
