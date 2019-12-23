import React, { useState, useEffect } from 'react'
import TaskCard from './TaskCard'
import Toast from '../Helper/index'
import axios from 'axios'
import _ from 'lodash'

function SingleUserComponent(props) {
    let [user, setUser] = useState('')
    // let [user_id, setUser_id] = useState('')
    let [description, setDescription ] = useState('')
    let [userTask, setUserTask] = useState([])

    useEffect(() => {
        fetchUsername()
        fetchUserTask()
        
        
        // axios.get('http://localhost:8000/Users/'+props.match.params.id)
        // .then(response => {
        //     if (response.data) {
        //         console.log(response)
        //         setUser(user = response.data.username)
        //         // setUser_id(user_id = response.data._id)
        //     }
        // })
        // .catch(err => console.log(err))

    }, [])

    async function fetchUsername(){
        try {
            let response = await axios.get('http://localhost:8000/Users/'+props.match.params.id)
            setUser(user = response.data.username)
        }catch (e){
            console.log(e)
        }
    }

    async function fetchUserTask(){
        try{
            let response = await axios.get('http://localhost:8000/Task/'+props.match.params.id)
            const taskUser = response.data.filter(todo => todo.user_id === props.match.params.id)
            setUserTask(userTask = taskUser)
        }catch(e){
            console.log(e)
        }
    }

    const onSubmit = e => {
        e.preventDefault()
        const Task = {
            user_id : props.match.params.id,
            description
        }
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        createUserTask(Task, headers)
    }

    async function createUserTask(data, headers){
        try{
            let response = await axios.post('http://localhost:8000/Task/add', data, {headers})
            console.log(response)
            if (response.data.success){
                Toast.fire({
                    icon: 'success',
                    title: 'Task created successfully'
                  })
                setDescription(description = '')
                fetchUserTask()
            }
        }catch(e){
            console.log(e)
        }
    }

    const deleteUserTask = id => {
        console.log(id)
        axios.delete('http://localhost:8000/Task/'+id)
        .then(response => {
            if (response.data.success) {
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                  })
                fetchUserTask()
            }
        })
        .catch(err => console.log(err))
    }

    const completeUserTask = data => {
        axios.post('http://localhost:8000/Task/Completed/'+data._id, data)
        .then(response => {
            if (response.data.success) {
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                  })
                fetchUserTask()
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="container push-down">
            <div className="row">
                <div className="col-md-8">
                    <h4>{_.capitalize(user)} Task Lists</h4>
                    { userTask.length > 0 ?
                        userTask.map(task => {
                            return <TaskCard task={task} deleteTask={deleteUserTask} completeTask={completeUserTask} key={task._id}/>
                        }) : <small>No Available Task for {_.capitalize(user)}</small>
                    }
                </div>
                <div className="col-md-4">
                <h3>Create {_.capitalize(user)} Task</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                        <label>Username</label>
                        <select 
                            className="form-control"
                            required
                            disabled
                            value = {props.match.params.id}>
                            >
                            <option>{user}</option>
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
            </div>
        </div>
    )
}
export default SingleUserComponent