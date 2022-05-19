import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'

function CommentBox() {
  return (
    <>
        <div className='commentbox-container d-flex'>
            <textarea className='form-control'></textarea>
            <button>
                <FontAwesomeIcon icon={faAnglesRight} />
            </button>
        </div>
    </>
  )
}

export default CommentBox