import React from 'react'

function Button({title, type, onClick}) {

    if(type === 'logout') {
        return <button className="btn btn-danger" onClick={onClick}>{title}</button>
    }
  
}

export default Button