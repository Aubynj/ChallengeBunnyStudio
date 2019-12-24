import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createUserData } from '../Redux/Action/action'

function CreateUser(props) {
    let [username, setUsername] = useState('')

    const onSubmit = e => {
        e.preventDefault()
        const User = {
            username
        }
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        props.createUserData(User, headers)
        setUsername(username = '')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h3>Create New User</h3><br/>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input className="form-control form-control-lg" 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(username = e.target.value)}
                                required
                             />
                        </div>
                        <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">Create User</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return{
        createUserData: (user, header) => dispatch(createUserData(user, header))
    }
}
export default connect(null, mapDispatchToProps)(CreateUser)