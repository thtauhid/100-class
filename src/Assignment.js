import React, { useEffect, useState } from "react"
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { useParams } from "react-router-dom"
import { auth, db, storage } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { nanoid } from "nanoid"
import dayjs from "dayjs"
import Nav from "./Nav"

function Assignment() {
	const { class_id, assignment_id } = useParams()

	const [update, setUpdate] = useState(0)
	const [classDetails, setClassDetails] = useState({ teacher: {} })
	const [user, setUser] = useState({})
	const [file, setFile] = useState(null)
	const [assignment, setAssignment] = useState({
		title: "Loading...",
		author: { name: "Loading..." },
		submission: [],
		submissions: []
	})

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user)

			const getClassDetails = async () => {
				const docRef = doc(db, "classes", class_id)
				const data = await getDoc(docRef)
				setClassDetails(data.data())
			}

			const path = `/classes/${class_id}/assignments`

			getDoc(doc(db, path, assignment_id))
				.then((ref) => {
					const submission = ref.data().submissions.filter((item) => {
						return item.id == user.uid
					})

					setAssignment({
						...ref.data(),
						id: ref.id,
						created_at: ref.data().created_at.toDate(),
						deadline: ref.data().deadline.toDate(),
						submission
					})
				})
				.catch((err) => {
					console.log(err)
				})
			getClassDetails()
		})
	}, [update])

	const uploadFile = () => {
		const storageRef = ref(
			storage,
			"assignments/" + nanoid() + "-" + file.name
		)

		uploadBytes(storageRef, file)
			.then((snapshot) => {
				// Write as submission

				updateDoc(
					doc(db, `/classes/${class_id}/assignments/`, assignment_id),
					{
						submissions: arrayUnion({
							name: user.displayName,
							id: user.uid,
							path: snapshot.ref.fullPath
						})
					}
				)
					.then(() => {
						setUpdate(update + 1)
					})
					.catch((err) => {
						console.log(err)
					})
			})
			.catch((err) => console.log(err))
	}

	const downloadFile = () => {
		const fileRef = ref(storage, assignment.submission[0].path)
		getDownloadURL(fileRef).then((url) => window.open(url))
	}

	// console.log(assignment.submissions)
	return (
		<div>
			<Nav />
			<div className='assignment-container container mt-3'>
				<div className='row'>
					<div className='col-8'>
						<h1>{assignment.title}</h1>
						{assignment.author.name} {" · "}
						{dayjs(assignment.created_at).format(
							"MMM D, YYYY h:mm A"
						)}
						<br />
						<div className='d-flex justify-content-between'>
							<span>{assignment.marks} Marks</span>
							<span>
								Due{" "}
								{dayjs(assignment.deadline).format(
									"MMM D, YYYY h:mm A"
								)}
							</span>
						</div>
						<hr />
						<p>{assignment.content}</p>
					</div>
					<div className='col-4'>
						{user.uid == classDetails.teacher.id ? (
							<div className='sidebar'>
								<h3>Submission Status</h3>
								<hr />
								<h6>Submitted by:</h6>
								<ul className='list-group'>
									{assignment.submissions.map((item) => {
										return (
											<li
												className='list-group-item'
												key={item.name}
											>
												{item.name}
											</li>
										)
									})}
								</ul>
							</div>
						) : (
							<div className='sidebar'>
								<h3>Submission</h3>
								<small>
									{assignment.submission.length
										? "Submitted"
										: "Not submitted"}
								</small>

								<hr />
								{assignment.submission.length ? (
									<>
										<button
											className='btn btn-primary mt-3 form-control'
											onClick={downloadFile}
										>
											Download File
										</button>
									</>
								) : (
									<>
										<input
											className='form-control'
											type='file'
											onChange={(e) =>
												setFile(e.target.files[0])
											}
										/>
										<button
											className='btn btn-primary mt-3 form-control'
											onClick={uploadFile}
										>
											Submit
										</button>
									</>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Assignment
