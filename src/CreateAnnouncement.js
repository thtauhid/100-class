import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore"
import { auth, db } from "./firebase"
import React, { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import Nav from "./Nav"
import { useParams } from "react-router-dom"

function CreateAnnouncement() {
	const { class_id } = useParams()

	const [content, setContent] = useState("")
	const [userId, setUserId] = useState("")
	const [userName, setUserName] = useState("")

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUserId(user.uid)
			setUserName(user.displayName)
		})
	}, [])

	const createAnnouncement = (e) => {
		// Prevent default
		e.preventDefault()

		// Validate content
		if (content == "") {
		} else {
			// Determine collection name
			const collectionName = `/classes/${class_id}/announcements`

			// Create post
			addDoc(collection(db, collectionName), {
				content,
				author: { id: userId, name: userName },
				created_at: Timestamp.now()
			})
				.then(() => {
					setContent("")
					window.location = `/class/${class_id}`
				})
				.catch((err) => console.log(err))
		}
	}

	return (
		<>
			<Nav />
			<div className='container mt-3 create-post-container'>
				<h2>Create Announcement</h2>
				<hr />
				<form onSubmit={createAnnouncement}>
					<textarea
						className='form-control'
						placeholder='Create new announcement'
						value={content}
						onChange={(e) => setContent(e.target.value)}
					></textarea>
					<div className='d-flex justify-content-end'>
						<button type='submit' className='btn btn-primary mt-2'>
							Post
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default CreateAnnouncement
