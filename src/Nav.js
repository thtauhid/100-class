import React from 'react'
import Button from './comps/Button'
import MenuItem from './comps/MenuItem'
import navigation from './config/navigation'
import { Logout } from './utils'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboard, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


function Nav() {
  return (
    <nav className="navbar-container navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <Link to='/' className='navbar-brand'>
                <FontAwesomeIcon className='brand-icon' icon={faChalkboard} />
                {' White Board'}
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    {navigation.map(item => {
                        return <MenuItem key={item.title} title={item.title} link={item.link}  />
                    })}
                </ul>

                <div className="d-flex right-menu">
                
                    <button className="create-icon">
                        <Link to='/create'>
                            <FontAwesomeIcon icon={faPlus} />
                        </Link>
                    </button>
                    <Button title="Logout" type="logout" onClick={Logout} />
                </div>
            </div>
        </div>
    </nav>

  )
}

export default Nav