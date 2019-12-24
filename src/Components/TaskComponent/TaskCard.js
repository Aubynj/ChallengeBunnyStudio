import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

function TaskCard(props) {

    useEffect(() => {
        localStorage.setItem('extra', props.task.user_id)
    }, [props.task.user_id])
    
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h4>{props.task.state}</h4>
                <small className="card-title">Status: {props.task.state === false ? <p className='not-completed'>Not Completed</p> : <p className='completed'>Completed</p>}</small>
                <p className="card-text">{props.task.description}</p>
                <Link to={{
                        pathname : `Task/Edit/${props.task._id}`,
                        extraParams : {
                            user_id : props.task.user_id  
                        }
                    }} 
                className="btn btn-warning">Edit</Link>&nbsp;
                <button onClick={() => props.deleteTask(props.task._id, props.task.user_id)} className="btn btn-danger">Delete</button>&nbsp;
                { props.task.state === true ? <button onClick={() => props.completeTask(props.task)}className="btn btn-primary">Set InComplete</button> : 
                <button onClick={() => props.completeTask(props.task)} className="btn btn-success">Complete</button> }
            </div>
        </div>
    )
}
export default TaskCard

