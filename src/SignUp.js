import { useState } from "react"
import { auth, db } from "./firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc, Timestamp } from "firebase/firestore"

import Nav from "./Nav"

function SignUp() {
	const [displayName, setDisplayName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleSignUp = (e) => {
		e.preventDefault()

		// Validate Data
		if (email === "" || password === "") {
			// Need to throw an error
		} else {
			// Sign user up
			createUserWithEmailAndPassword(auth, email, password)
				// Set Display Name
				.then(() => {
					updateProfile(auth.currentUser, {
						displayName
					})
				})
				// Create document in users collection
				.then(() => {
					setDoc(doc(db, "users", auth.currentUser.uid), {
						createdAt: Timestamp.now(),
						name: displayName
					})
						// Reset form after creating document
						.then(() => {
							setDisplayName("")
							setEmail("")
							setPassword("")
							// Redirect to dashboard
							window.location = "/dashboard"
						})
						// Error Handling
						.catch((err) => console.log(err.message))
				})
				// Error Handling
				.catch((err) => console.log(err.message))
		}
	}

	return (
		<>
			<Nav />
			<div className='container signup-container'>
				<form className='mt-4' onSubmit={handleSignUp}>
					<h1 className='text-center'>Sign Up</h1>
					<div className='form-group'>
						<label
							htmlFor='displayName'
							className='form-label mt-4'
						>
							Full Name
						</label>
						<input
							type='text'
							className='form-control'
							id='displayName'
							placeholder='John Doe'
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='email' className='form-label mt-4'>
							Email address
						</label>
						<input
							type='email'
							className='form-control'
							id='email'
							placeholder='me@example.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password' className='form-label mt-4'>
							Password
						</label>
						<input
							type='password'
							className='form-control'
							id='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='form-group mt-4'>
						<button
							type='submit'
							className='btn btn-primary form-control'
						>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default SignUp
