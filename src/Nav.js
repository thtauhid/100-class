import React, { useState, useEffect } from "react"
import { auth } from "./firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { faChalkboard } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"

function Nav() {
	const { class_id } = useParams()

	const handleLogOut = () => {
		signOut(auth).then(() => (window.location = "/"))
	}
	const handleLogIn = () => {
		window.location = "/login"
	}
	const handleRegister = () => {
		window.location = "/register"
	}

	// Right menu
	const loggedInRightMenu = [{ name: "Logout", action: handleLogOut }]
	const loggedOutRightMenu = [
		{ name: "Login", action: handleLogIn },
		{ name: "Register", action: handleRegister }
	]

	// Left menu
	const classMenu = [
		{ title: "dashboard", link: "/dashboard" },
		{ title: "stream", link: `/class/${class_id}` },
		{
			title: "classworks",
			link: `/class/${class_id}/classworks`
		},
		{ title: "students", link: `/class/${class_id}/students` }
		// {
		// 	title: "class settings",
		// 	link: `/class/${class_id}/settings`
		// }
	]

	const regularMenu = [
		{ title: "dashboard", link: "/dashboard" },
		{ title: "create class", link: "/create-class" }
	]

	const [rightMenu, setRightMenu] = useState([])
	const [leftMenu, setLeftMenu] = useState([])

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setRightMenu(loggedInRightMenu)

				if (class_id) {
					setLeftMenu(classMenu)
				} else {
					setLeftMenu(regularMenu)
				}
			} else {
				setRightMenu(loggedOutRightMenu)
			}
		})
	}, [])

	return (
		<nav className='navbar-container navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<span className='navbar-brand'>
					<FontAwesomeIcon
						className='brand-icon'
						icon={faChalkboard}
					/>
					{" White Board"}
				</span>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarColor03'
					aria-controls='navbarColor03'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id='navbarColor03'>
					<ul className='navbar-nav me-auto'>
						{leftMenu.map((item) => {
							return (
								<li className='nav-item' key={item.title}>
									<Link className='nav-link' to={item.link}>
										{item.title}
									</Link>
								</li>
							)
						})}
					</ul>
					<div className='d-flex right-menu'>
						{rightMenu.map((item) => {
							return (
								<button
									key={item.name}
									className='btn btn-secondary m-2 my-sm-0'
									onClick={item.action}
								>
									{item.name}
								</button>
							)
						})}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Nav
