import React, { useState, useEffect } from 'react'
import UserlistComponent from './UserlistComponent'
import axios from 'axios'

function UserList() {
    let [users, setUsers] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:8000/Users/')
        .then(response => {
            if (response.data.length > 0) {
                setUsers(users = response.data)
            }
        })
        .catch(err => console.log(err))
    },[])

    const deleteUser = (id) => {
        axios.delete('http://localhost:8000/Users/'+id)
        .then(response => {
            // Successful user delete
            
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="container push-down">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th width="70%">Users</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   users.length > 0 ?
                                users.map(userlist =>{
                                    return <UserlistComponent user={userlist} deleteUser={deleteUser} key={userlist._id}/>
                                }) : null
                                    
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}
export default UserList