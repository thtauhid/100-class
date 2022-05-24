import { useState } from "react"
import { auth } from "./firebase"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import Nav from "./Nav"

function SignIn() {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			window.location = "/dashboard"
		}
	})

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleSignIn = (e) => {
		e.preventDefault()

		// Validate Data
		if (email === "" || password === "") {
			// Need to throw an error
		} else {
			// Sign user in
			signInWithEmailAndPassword(auth, email, password)
				.then((cred) => console.log(cred))
				// Error Handling
				.catch((err) => console.log(err.message))

			// Redirect to dashboard: To be done later
		}
	}

	return (
		<>
			<Nav />
			<div className='container signup-container'>
				<form className='mt-4' onSubmit={handleSignIn}>
					<h1 className='text-center'>Sign In</h1>
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
							Sign In
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default SignIn
