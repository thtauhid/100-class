import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"

function Banner() {
	const { class_id } = useParams()
	const [classDetails, setClassDetails] = useState({
		class_name: "Loading...",
		section: "Loading..."
	})

	useEffect(() => {
		const getClassDetails = async () => {
			const docRef = doc(db, "classes", class_id)
			const data = await getDoc(docRef)
			setClassDetails(data.data())
		}

		getClassDetails()
	}, [])
	return (
		<div
			className='card mb-3 mt-3 p-5 banner-container'
			style={{ background: "#4C8BF5" }}
		>
			<FontAwesomeIcon className='banner-icon' icon={faFolder} />
			<div className='banner-details'>
				<h1 className='text-white'>{classDetails.class_name}</h1>
				<h4 className='text-white'>{classDetails.section}</h4>
			</div>
		</div>
	)
}

export default Banner
