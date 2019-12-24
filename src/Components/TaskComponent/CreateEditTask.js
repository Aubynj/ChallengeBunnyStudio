import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {fetchUsername, updateUserTask, fetchUserSingleTask} from '../../Redux/Action/action'


function CreateEditTask(props) {
    let [description, setDescription ] = useState('')
    const {fetchUsername, fetchUserSingleTask, updateUserTask} = props
    
    useEffect(() => {
        fetchUsername(localStorage.getItem('extra'))
        fetchUserTask()
    }, [fetchUsername, fetchUserSingleTask])


    const onSubmit = e => {
        e.preventDefault()
        const data = {
            description
        }
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        updateUserTask(props.match.params.id, data, headers)
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
                                value={props.user}
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
const mapStateToProps = (state) => {
    return {
        user : state.users.user,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchUsername: (id) => dispatch(fetchUsername(id)),
        updateUserTask : (param, data, headers) => dispatch(updateUserTask(param, data, headers)),
        fetchUserSingleTask : (id) => dispatch(fetchUserSingleTask(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEditTask)