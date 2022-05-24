import React, { useState, useEffect } from "react"
import { getDoc, doc } from "firebase/firestore"
import { useParams } from "react-router-dom"
import { auth, db } from "./firebase"

import Nav from "./Nav"
import { onAuthStateChanged } from "firebase/auth"

function Students() {
	const { class_id } = useParams()

	const [user, setUser] = useState({})
	const [classDetails, setClassDetails] = useState({
		students: [],
		teacher: {}
	})

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user)
		})

		getDoc(doc(db, "classes", class_id))
			.then((document) => setClassDetails(document.data()))
			.catch((err) => console.error(err))
	}, [])

	const copyLink = () => {
		var copyText = document.getElementById("invite")

		copyText.select()
		copyText.setSelectionRange(0, 99999)
		navigator.clipboard.writeText(copyText.value)

		document.getElementById("invite-notification").innerHTML =
			"invite link copied"
	}

	return (
		<>
			<Nav />
			<div className='container students-container mt-3'>
				<div className=''>
					{user.uid == classDetails.teacher.id ? (
						<>
							<h2>Invite Students</h2>
							<hr />
							<input
								className='form-control'
								id='invite'
								value={`https://${process.env.REACT_APP_SITE_URL}/join/${classDetails.invitation_code}`}
								// value={`http://localhost:3000/join/xyz`}
								onClick={copyLink}
								readOnly
							/>
							<p id='invite-notification'>click to copy</p>
							<br />
						</>
					) : (
						""
					)}

					<h2>Students</h2>
					<hr />
					<ul className='list-group'>
						{classDetails.students.map((student) => (
							<li key={student.id} className='list-group-item'>
								{student.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}

export default Students
