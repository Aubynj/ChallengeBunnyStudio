import React, { useState, useEffect } from 'react'
import TaskCard from '../TaskComponent/TaskCard'
import { connect } from 'react-redux'
import { 
    fetchUserTask, 
    fetchUsername, 
    deleteUserTask, 
    completeUserTask, 
    createUserTask  
} from '../../Redux/Action/action'
import _ from 'lodash'

function SingleUserComponent(props) {
    let [description, setDescription ] = useState('')

    console.log(props)

    const {fetchUserTask, fetchUsername, deleteUserTask, completeUserTask, createUserTask} = props

    useEffect(() => {
        fetchUserTask(props.match.params.id)
        fetchUsername(props.match.params.id)

    }, [fetchUserTask, fetchUsername, props.match.params.id])


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
        setDescription(description = '')
    }

    return (
        <div className="container push-down">
            <div className="row">
                <div className="col-md-8">
                    <h4>{_.capitalize(props.user)} Task Lists</h4>
                    { props.userSingleTask.length > 0 ?
                        props.userSingleTask.map(task => {
                            return <TaskCard task={task} deleteTask={deleteUserTask} completeTask={completeUserTask} key={task._id}/>
                        }) : <small>No Available Task for {_.capitalize(props.user)}</small>
                    }
                </div>
                <div className="col-md-4">
                <h3>Create {_.capitalize(props.user)} Task</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                        <label>Username</label>
                        <select 
                            className="form-control"
                            required
                            disabled
                            value = {props.match.params.id}>
                            >
                            <option>{props.user}</option>
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

const mapStateToProps = (state) => {
    return {
        userSingleTask : state.tasks.userTasks,
        user : state.users.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchUserTask: (id) => dispatch(fetchUserTask(id)),
        fetchUsername: (id) => dispatch(fetchUsername(id)),
        completeUserTask : (data, id) => dispatch(completeUserTask(data, id)),
        deleteUserTask : (id, user_id) => dispatch(deleteUserTask(id, user_id)),
        createUserTask : (data, header) => dispatch(createUserTask(data, header))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SingleUserComponent)