import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { auth, db } from "./firebase"
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	getDoc
} from "firebase/firestore"
import dayjs from "dayjs"
import { onAuthStateChanged } from "firebase/auth"

function Assignments() {
	const { class_id } = useParams()
	const [user, setUser] = useState({})
	const [classDetails, setClassDetails] = useState({ teacher: {} })
	const [posts, setPosts] = useState()

	onAuthStateChanged(auth, (user) => {
		setUser(user)
	})

	const getClassDetails = async () => {
		const docRef = doc(db, "classes", class_id)
		const data = await getDoc(docRef)
		setClassDetails(data.data())
	}

	useEffect(() => {
		const getPosts = async () => {
			const collectionName = "classes/" + class_id + "/assignments"
			const classesCollectionRef = collection(db, collectionName)
			const classData = await getDocs(classesCollectionRef)

			const data = classData.docs.map((item) => {
				return {
					...item.data(),
					id: item.id,
					time: item.data().created_at.toDate()
				}
			})
			setPosts(data)
		}

		getClassDetails()
		getPosts()
	}, [])

	return (
		<div className='assign-list-container'>
			<div className='d-flex justify-content-between'>
				<h2 className='mb-0'>Assignments</h2>{" "}
				{user.uid == classDetails.teacher.id ? (
					<Link to='create'>
						<button className='btn btn-primary'>Create</button>
					</Link>
				) : (
					""
				)}
			</div>
			<hr />
			{posts ? ( // Waiting for announcements to load
				posts.length ? ( // Checking if there are any announcements
					<>
						{posts.map((item) => {
							return (
								<div className='assign' key={item.id}>
									<FontAwesomeIcon
										className='assign-icon'
										icon={faPaperPlane}
									/>
									<div className='assign-details'>
										<span className='assign-title'>
											<Link
												to={`/class/${class_id}/classworks/${item.id}`}
											>
												{item.title}
											</Link>
										</span>
										<span className='assign-date'>
											{item.author.name} {" · "}
											{dayjs(item.time).format(
												"MMM D, YYYY h:mm A"
											)}
										</span>
										<p className='mt-3'>{item.content}</p>
									</div>
								</div>
							)
						})}
					</>
				) : (
					<p className='text-center'>No assignment yet</p>
				)
			) : (
				<p className='text-center'>Loading...</p>
			)}
		</div>
	)
}

export default Assignments
