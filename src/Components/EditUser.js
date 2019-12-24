import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {updateUser} from '../Redux/Action/action'

function EditUser(props) {
    let [username, setUsername] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8000/Users/'+props.match.params.id)
        .then(response => {
            setUsername(username = response.data.username)
        })
    }, [props.match.params.id])

    const onSubmit = e => {
        e.preventDefault()
        const userData = {
            username
        }
        props.updateUser(props.match.params.id, userData)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h3>Edit User</h3><br/>
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
                        <button type="submit" className="btn btn-primary btn-lg">Update User</button>
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
        updateUser: (id, userdata) => dispatch(updateUser(id, userdata)),

    }
}
export default connect(null, mapDispatchToProps)(EditUser)