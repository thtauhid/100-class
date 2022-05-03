import React from 'react'

function Button({title, type}) {

    if(type === 'logout') {
        return <button className="btn btn-danger">{title}</button>
    }
  
}

export default Button