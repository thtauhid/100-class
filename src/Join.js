import { onAuthStateChanged } from "firebase/auth"
import {
	arrayUnion,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { auth, db } from "./firebase"
import Nav from "./Nav"

function Join() {
	const { invitation_code } = useParams()

	const [classDetails, setClassDetails] = useState({
		class_name: "Loading...",
		subject: "Loading...",
		section: "Loading...",
		room: "Loading...",
		teacher: {
			name: "Loading..."
		}
	})
	const [user, setUser] = useState({ displayName: "Loading..." })

	useEffect(() => {
		// Get User Details
		onAuthStateChanged(auth, (user) => {
			setUser(user)
		})

		// Get Class Details
		const q = query(
			collection(db, "classes"),
			where("invitation_code", "==", invitation_code)
		)
		getDocs(q)
			.then((docs) => {
				docs.forEach((doc) => {
					setClassDetails({ ...doc.data(), id: doc.id })
				})
			})
			.catch((err) => console.error(err))
	}, [])

	const joinClass = () => {
		updateDoc(doc(db, "classes", classDetails.id), {
			students_ids: arrayUnion(user.uid),
			students: arrayUnion({ name: user.displayName, id: user.uid })
		})
			.then(() => {
				window.location = "/dashboard"
			})
			.catch((err) => console.log(err))
	}

	return (
		<>
			<Nav />
			<div className='join-container container mt-3 mb-3 text-center'>
				<h1>Join Class</h1>
				<hr />
				<h2>You are joining {classDetails.class_name}</h2>
				<p>as {user.displayName}</p>

				<div className='class-details'>
					<h3>Class Details</h3>
					<hr />
					<p>Class Name: {classDetails.subject}</p>
					<p>Section: {classDetails.section}</p>
					<p>Room: {classDetails.room}</p>
					<p>Teacher: {classDetails.teacher.name}</p>
				</div>
				<button className='btn btn-primary mt-3' onClick={joinClass}>
					Confirm
				</button>
			</div>
		</>
	)
}

export default Join
