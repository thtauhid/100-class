import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Class from "./Class"
import ClassWorks from "./ClassWorks"
import CreateClass from "./CreateClass"
import Dashboard from "./Dashboard"
import Students from "./Students"
import Settings from "./Settings"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import Assignment from "./Assignment"
import Join from "./Join"
import LandingPage from "./LandingPage"
import CreateAssignment from "./CreateAssignment"
import CreateAnnouncement from "./CreateAnnouncement"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/register' element={<SignUp />} />
				<Route path='/login' element={<SignIn />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/create-class' element={<CreateClass />} />
				<Route path='/join/:invitation_code' element={<Join />} />
				<Route path='/class/:class_id' element={<Class />} />
				<Route
					path='/class/:class_id/create'
					element={<CreateAnnouncement />}
				/>
				<Route
					path='/class/:class_id/classworks'
					element={<ClassWorks />}
				/>
				<Route
					path='/class/:class_id/classworks/:assignment_id'
					element={<Assignment />}
				/>
				<Route
					path='/class/:class_id/classworks/create'
					element={<CreateAssignment />}
				/>
				<Route
					path='/class/:class_id/students'
					element={<Students />}
				/>
				<Route
					path='/class/:class_id/settings'
					element={<Settings />}
				/>
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/' element={<LandingPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
