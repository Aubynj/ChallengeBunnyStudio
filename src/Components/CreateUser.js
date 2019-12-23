import React, { useState } from 'react'
import axios from 'axios'

function CreateUser() {
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
        createUserData(User, headers)
    }

    async function createUserData(data, headers){
        try{
            let response = await axios.post('http://localhost:8000/Users/add', data, {headers})
            console.log(response)
            setUsername(username = '')
        }catch(e){
            console.log(e)
        }
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
export default CreateUser