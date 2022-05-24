import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore"
import { auth, db } from "./firebase"
import React, { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useParams } from "react-router-dom"
import Nav from "./Nav"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function CreateAssignment() {
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [marks, setMarks] = useState("")
	const [userId, setUserId] = useState("")
	const [userName, setUserName] = useState("")
	const [date, setDate] = useState(new Date())

	const { class_id } = useParams()

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUserId(user.uid)
			setUserName(user.displayName)
		})
	}, [])

	const createAssign = (e) => {
		// Prevent default
		e.preventDefault()

		// Validate content
		if (content == "") {
		} else {
			// Determine collection name
			const collectionName = `/classes/${class_id}/assignments`

			// Create post
			addDoc(collection(db, collectionName), {
				title,
				content,
				marks: Number(marks),
				deadline: date,
				author: {
					id: userId,
					name: userName
				},
				created_at: Timestamp.now(),
				submissions: []
			})
				.then(() => {
					setTitle("")
					setContent("")
					setMarks("")
					setDate(new Date())
					window.location = `/class/${class_id}/classworks`
				})
				.catch((err) => console.log(err))
		}
	}

	return (
		<>
			<Nav />
			<div className='container mt-3 create-assignment-container'>
				<h2>Create Assignment</h2>
				<hr />
				<form onSubmit={createAssign}>
					<input
						className='form-control'
						placeholder='Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						className='form-control mt-3'
						placeholder='Details'
						value={content}
						onChange={(e) => setContent(e.target.value)}
					></textarea>
					<input
						type='number'
						className='form-control mt-3 marks'
						placeholder='Marks'
						value={marks}
						onChange={(e) => setMarks(e.target.value)}
					/>
					<span className='d-block mt-3'>Deadline</span>
					<DatePicker
						className='form-control date'
						selected={date}
						onChange={(date) => setDate(date)}
						showTimeSelect
						dateFormat='MMMM d, yyyy     h:mm aa'
					/>
					<div className='d-flex justify-content-end'>
						<button type='submit' className='btn btn-primary mt-2'>
							Create
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default CreateAssignment
