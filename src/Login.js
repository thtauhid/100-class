import React, {useState} from 'react'
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from './firebase'

function Login() {

    const [userId, setUserId] = useState(localStorage.getItem('user_id'))

    const SignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider)
            setUserId(userCredential.user.uid)
            localStorage.setItem('user_id', userCredential.user.uid)
            window.location = "/";
        } catch (error) {
            console.log(error)
        }

    }

    return (        
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <button className='btn btn-lg text-white' style={{backgroundColor: '#DB4437'}} onClick={SignInWithGoogle}>SIGN IN WITH GOOGLE</button>
            </div>
        </>
    )

}

export default Login