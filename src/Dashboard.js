import React, { useState, useEffect } from "react"
import ClassCard from "./components/ClassCard"
import Nav from "./Nav"
import { auth, db } from "./firebase"
import {
	collection,
	getDocs,
	doc,
	getDoc,
	query,
	where
} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

function Dashboard() {
	const [user, setUser] = useState({})
	const [teaching, setTeaching] = useState()
	const [learning, setLearning] = useState()

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user)

			const teachingQuery = query(
				collection(db, "classes"),
				where("teacher.id", "==", user.uid)
			)

			getDocs(teachingQuery)
				.then((result) => {
					setTeaching(
						result.docs.map((doc) => ({
							...doc.data(),
							id: doc.id
						}))
					)
				})
				.catch((err) => console.error(err))

			const learningQuery = query(
				collection(db, "classes"),
				where("students_ids", "array-contains", user.uid)
			)

			getDocs(learningQuery)
				.then((result) => {
					setLearning(
						result.docs.map((doc) => ({
							...doc.data(),
							id: doc.id
						}))
					)
				})
				.catch((err) => console.error(err))
		})
	}, [])

	return (
		<>
			<Nav />
			<div className='classes-container container mt-3'>
				{learning && teaching ? ( // Waiting for the data to be loaded
					learning.length || teaching.length ? ( // After the data has been loaded
						<>
							{teaching.length ? (
								<TeachingCard teaching={teaching} />
							) : (
								""
							)}
							{learning.length ? (
								<LearningCard learning={learning} />
							) : (
								""
							)}
						</>
					) : (
						// If both the data array are empty
						<p className='text-center'>
							Please join or create a class to get started
						</p>
					)
				) : (
					<p className='text-center'>Loading...</p>
				)}
			</div>
		</>
	)
}

const TeachingCard = ({ teaching }) => {
	return (
		<>
			<h2>Teaching</h2>
			<hr />
			<div className='d-flex flex-wrap '>
				{teaching.map((item) => (
					<ClassCard key={item.id} data={item} />
				))}
			</div>
		</>
	)
}

const LearningCard = ({ learning }) => {
	return (
		<>
			<h2>Learning</h2>
			<hr />
			<div className='d-flex flex-wrap '>
				{learning.map((item) => (
					<ClassCard key={item.id} data={item} />
				))}
			</div>
		</>
	)
}

export default Dashboard
