import React from 'react'
import Button from './comps/Button'
import MenuItem from './comps/MenuItem'
import navigation from './config/navigation'

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Class 100</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    {navigation.map(item => {
                        return <MenuItem title={item.title} link={item.link}  />
                    })}
                </ul>
                <div className="d-flex">
                    <Button title="Logout" type="logout" />
                </div>
            </div>
        </div>
    </nav>

  )
}

export default Nav