import React, {useState, useEffect} from 'react'
import axios from 'axios'

function CreateEditTask(props) {
    console.log(props)
    let [username, setUsername] = useState('')
    let [user_id, setUser_id ] = useState('')
    let [description, setDescription ] = useState('')

    useEffect(() => {
        fetchUser()
        fetchUserTask()
    }, [])

    const onSubmit = e => {
        e.preventDefault()
        const data = {
            description
        }
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        updateUserTask(data, headers)
    }

    async function fetchUser(){
        try{
            let response = await axios.get('http://localhost:8000/Users/'+props.location.extraParams.user_id)
            setUsername(username = response.data.username)
        }catch(e) {
            console.log(e)
        }
    }

    async function updateUserTask(data, headers){
        try{
            let response = await axios.post('http://localhost:8000/Task/Update/'+props.match.params.id, data, 
            {headers})
            console.log(response)
        }catch(e) {
            console.log(e)
        }
    }

    async function fetchUserTask(){
        try{
            let response = await axios.get('http://localhost:8000/Task/Single/'+props.match.params.id)
            setDescription(description = response.data.description)
        }catch(e) {
            console.log(e)
        }
    }

    const redirectBack = () => {
        return props.history.goBack()
    }

    return (
        <div className="container push-down">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h3>Edit User Task</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                        <label>Username</label>
                        <input className="form-control form-control-lg" 
                                type="text"
                                value={username}
                                required
                                disabled
                            />
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
                            <label>Status</label>
                            
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg">Edit User Task</button>&nbsp;
                            <button onClick={redirectBack} className="btn btn-primary btn-lg">Go previous</button>
                        </div>
                    </form>

                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}
export default CreateEditTask