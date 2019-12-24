import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to='/' className="navbar-brand" href="#">BunnyStudio</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to='/' className="nav-link">Users</Link>
                    </li>
                    <Link to='/User' className="nav-link">Create User</Link>
                    {/* <li className="nav-item">
                    </li>
                    <li className="nav-item">
                        <Link to='/Create' className="nav-link">Create Task</Link>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar