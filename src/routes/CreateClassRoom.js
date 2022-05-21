import React, {useState} from 'react'
import Nav from '../Nav'
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore"; 
import { db } from '../config/firebase';

// Class Name 
// Section 
// Subject 
// Room 
// Class ID
function CreateClassRoom() {

    const [className, setClassName] = useState("")
    const [subjectName, setSubjectName] = useState("")
    const [subjectCode, setSubjectCode] = useState("")
    
    const createClassRoom = (e) => {
        // Prevent Default Behavior
        e.preventDefault()

        // Validate Data
        if(className == "" || subjectCode == "") {
            // Do Error Handling
            
        } else {

        // Insert Into Database
        const insertData = async () => {
            const teacher = "philip@idea5.tech"
            const class_id = `${className}_${subjectName}_${subjectCode}`

            await setDoc(doc(db, "classes", class_id), {
                class_name: className, 
                subject_name: subjectName,
                subject_code: subjectCode,
                createdBy: teacher,
                createdAt: Timestamp.now(),
                // teachers: [teacher]
            })
        }
        insertData()

        // Reset Data
        setClassName("")
        setSubjectName("")
        setSubjectCode("")
        }
    }

    return (
    <>
        <Nav />
        <div className='create-classroom-container container mt-3'>
            <h1 className='mb-4 mt-4 text-center'>Create Classroom</h1>
            {/* {errors.map(error => {
                return <span>Bal</span>
            })} */}
            <form onSubmit={createClassRoom}>
                <div className="form-group">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" 
                                id="class_name" name="class_name" 
                                value={className} onChange={e => setClassName(e.target.value)}
                        />
                        <label htmlFor="class_name">Class Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" 
                                id="subject_name" name="subject_name" 
                                value={subjectName} onChange={e => setSubjectName(e.target.value)}
                        />
                        <label htmlFor="subject_name">Subject Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" 
                                id="subject_code" name="subject_code" 
                                value={subjectCode} onChange={e => setSubjectCode(e.target.value)}
                        />
                        <label htmlFor="subject_code">Subject Code</label>
                    </div>
                    <button type='submit' className="form-control btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    </>
    )
}

export default CreateClassRoom