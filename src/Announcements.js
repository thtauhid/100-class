import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { auth, db } from "./firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import dayjs from "dayjs"
import { onAuthStateChanged } from "firebase/auth"

function Announcements() {
	const { class_id } = useParams()
	const [user, setUser] = useState({})
	const [classDetails, setClassDetails] = useState({ teacher: {} })
	const [announcements, setAnnouncements] = useState()

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user)
		})

		const getClassDetails = async () => {
			const docRef = doc(db, "classes", class_id)
			const data = await getDoc(docRef)
			setClassDetails(data.data())
		}

		const getAnnouncements = async () => {
			const collectionName = "classes/" + class_id + "/announcements"
			const classesCollectionRef = collection(db, collectionName)
			const classData = await getDocs(classesCollectionRef)

			const data = classData.docs.map((item) => {
				return {
					...item.data(),
					id: item.id,
					time: item.data().created_at.toDate()
				}
			})
			setAnnouncements(data)
		}

		getClassDetails()
		getAnnouncements()
	}, [])

	return (
		<div className='post-list-container'>
			<div className='d-flex justify-content-between'>
				<h2 className='mb-0'>Announcements</h2>{" "}
				{user.uid == classDetails.teacher.id ? (
					<Link to='create'>
						<button className='btn btn-primary'>Create</button>
					</Link>
				) : (
					""
				)}
			</div>
			<hr className='mb-1' />
			{announcements ? ( // Waiting for announcements to load
				announcements.length ? ( // Checking if there are any announcements
					<OnLoad announcements={announcements} /> // If there are any announcements
				) : (
					<p className='text-center'>No announcement yet</p>
				)
			) : (
				<p className='text-center'>Loading...</p>
			)}
		</div>
	)
}

const OnLoad = ({ announcements }) => {
	return (
		<>
			{announcements.map((item) => {
				return (
					<div className='post' key={item.id}>
						<FontAwesomeIcon
							className='post-icon'
							icon={faPaperPlane}
						/>
						<div className='post-details'>
							<span className='post-author'>
								{item.author.name}
							</span>
							<span className='post-date'>
								{dayjs(item.time).format("MMM D, YYYY h:mm A")}
							</span>
							<p className='mt-3'>{item.content}</p>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default Announcements
