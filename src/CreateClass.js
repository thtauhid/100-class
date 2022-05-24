import React, { useState, useEffect } from "react"
import Nav from "./Nav"
import { db, auth } from "./firebase"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { nanoid } from "nanoid"

function CreateClass() {
	const [className, setClassName] = useState("")
	const [section, setSection] = useState("")
	const [subject, setSubject] = useState("")
	const [room, setRoom] = useState("")
	const [teacherId, setTeacherId] = useState("")
	const [teacherName, setTeacherName] = useState("")

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setTeacherId(user.uid)
			setTeacherName(user.displayName)
		})
	}, [])

	const createClassRoom = (e) => {
		// Prevent Default Behavior
		e.preventDefault()

		// Validate Data
		if (
			className === "" ||
			section === "" ||
			subject === "" ||
			room === ""
		) {
			// Need to do Error Handling
		} else {
			// Insert Into Database

			addDoc(collection(db, "classes"), {
				class_name: className,
				section: section,
				subject: subject,
				room: room,
				teacher: {
					name: teacherName,
					id: teacherId
				},
				createdAt: Timestamp.now(),
				invitation_code: nanoid(),
				students: []
			}).then(() => {
				// Reset Data
				setClassName("")
				setSection("")
				setSubject("")
				setRoom("")
				window.location = "/dashboard"
			})
		}
	}

	return (
		<>
			<Nav />
			<div className='create-classroom-container container mt-3'>
				<h1 className='mb-4 mt-3 text-center'>Create Classroom</h1>
				<form onSubmit={createClassRoom}>
					<div className='form-group'>
						<label htmlFor='class_name' className='form-label mt-3'>
							Class Name
						</label>
						<input
							type='text'
							className='form-control'
							id='class_name'
							name='class_name'
							value={className}
							onChange={(e) => setClassName(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='section' className='form-label mt-3'>
							Section
						</label>
						<input
							type='text'
							className='form-control'
							id='section'
							name='section'
							value={section}
							onChange={(e) => setSection(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='subject' className='form-label mt-3'>
							Subject
						</label>
						<input
							type='text'
							className='form-control'
							id='subject'
							name='subject'
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='room' className='form-label mt-3'>
							Room
						</label>
						<input
							type='text'
							className='form-control'
							id='room'
							name='room'
							value={room}
							onChange={(e) => setRoom(e.target.value)}
						/>
					</div>
					<button
						type='submit'
						className='form-control btn btn-primary mt-3'
					>
						Create
					</button>
				</form>
			</div>
		</>
	)
}

export default CreateClass
