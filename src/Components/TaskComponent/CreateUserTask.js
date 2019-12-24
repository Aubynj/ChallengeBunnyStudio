import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CreateUserTask() {
    let [users, setUsers] = useState([])
    let [user_id, setUser_id ] = useState('')
    let [description, setDescription ] = useState('')

    useEffect(() =>{
        axios.get('http://localhost:8000/Users/')
        .then(response => {
            if (response.data.length > 0) {
                setUsers(users = response.data)
            }
        })
        .catch(err => console.log(err))
    },[])

    const onSubmit = e => {
        e.preventDefault()
        const Task = {
            user_id,
            description
        }
        axios.post('http://localhost:8000/Task/add', Task,{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then(res =>{
            console.log(res)
            setDescription(description = '')
            setUser_id(user_id ='')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="container push-down">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h3>Create User Task</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                        <label>Username</label>
                        <select 
                            className="form-control"
                            required
                            value = {user_id}
                            onChange = {(e) => setUser_id(e.target.value)}>
                            <option value="">Select User</option>
                            {   
                                users.map(user => {
                                    return (
                                        <option key={user._id} value={user._id}>
                                            {user.username}
                                        </option>
                                    )
                                })
                            }
                            >
                        </select>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" rows="3" 
                                required
                                value = {description}
                                onChange={(e) => setDescription(e.target.value)} 
                                />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-lg">Create User Task</button>
                        </div>
                    </form>

                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}
export default CreateUserTask
