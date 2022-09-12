import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Nav from "./Nav"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChalkboard } from "@fortawesome/free-solid-svg-icons"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"

function LandingPage() {
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) window.location = "/dashboard"
		})
	}, [])

	return (
		<>
			<Nav />
			<div className='landing-page-container container mt-3 text-center'>
				<FontAwesomeIcon className='icon' icon={faChalkboard} />
				<h1>Welcome to White Board</h1>
				<p>
					White Board is a open source solution to Google Classroom.
					<br /> This project was created by{" "}
					<a target='_blank' href='https://github.com/thtauhid'>
						Tasnimul Hasan Tauhid
					</a>
					.
				</p>

				<p>
					Feature requests can be sent via:{" "}
					<a href='mailto:thtauhid.71@gmail.com'>
						thtauhid.71@gmail.com
					</a>
				</p>

				<p>
					Please <Link to='/login'>Login</Link> or{" "}
					<Link to='/register'>Register</Link> to use this platform.
				</p>
			</div>
		</>
	)
}

export default LandingPage
