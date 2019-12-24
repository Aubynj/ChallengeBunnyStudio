import axios from 'axios'
import Toast from '../../Helper/index'
import { FETCH_USERS, FETCH_USER_TASKS, FETCH_SINGLE_USERNAME, FETCH_USER_SINGLE_TASK } from './types'

export const fetchUsers = () => (dispatch) => {
    axios.get('http://localhost:8000/Users/')
    .then(response => {
        console.log(response)
        dispatch({ type: FETCH_USERS, payload: response.data})
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteUser = (id) => (dispatch) => {
    axios.delete('http://localhost:8000/Users/'+id)
    .then(response => {
        // Successful user delete
        if (response.data.success){
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
            dispatch(fetchUsers())
        }
    })
    .catch(err => console.log(err))
}

export const fetchUserTask = (id) => dispatch =>{
    axios.get('http://localhost:8000/Task/'+id)
    .then(response => {
        console.log(response)
        const taskUser = response.data.filter(todo => todo.user_id === id)
        dispatch({ type: FETCH_USER_TASKS, payload: taskUser})
    })
    .catch(err => {
        console.log(err)
    })
}

export const fetchUsername = (id) => dispatch => {
    axios.get('http://localhost:8000/Users/'+id)
    .then(response => {
        console.log(response)
        dispatch({ type: FETCH_SINGLE_USERNAME, payload: response.data.username})
    })
    .catch(err => {
        console.log(err)
    })
}

export const completeUserTask = data => dispatch => {
    axios.post('http://localhost:8000/Task/Completed/'+data._id, data)
    .then(response => {
        if (response.data.success) {
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
            dispatch(fetchUserTask(data.user_id))
        }
    })
    .catch(err => console.log(err))
}

export const deleteUserTask = (id, user_id) => dispatch => {
    axios.delete('http://localhost:8000/Task/'+id)
    .then(response => {
        if (response.data.success) {
            Toast.fire({
                icon: 'success',
                title: response.data.message
              })
            dispatch(fetchUserTask(user_id))
        }
    })
    .catch(err => console.log(err))
}

export const createUserTask = (data, headers) => dispatch => {
    axios.post('http://localhost:8000/Task/add', data, {headers})
    .then(response => {
        if (response.data.success) {
            Toast.fire({
                icon: 'success',
                title: 'Task created successfully'
              })
            dispatch(fetchUserTask(data.user_id))
        }
    })
    .catch(err => console.log(err))
}

export const updateUserTask = (param, data, headers) => dispatch => {
    axios.post('http://localhost:8000/Task/Update/'+param, data, {headers})
    .then(response => {
        if (response.data.success) {
            Toast.fire({
                icon: 'success',
                title: 'Task updated successfully'
            })
        }
    })
    .catch(err => console.log(err))
}

export const fetchUserSingleTask = id => dispatch => {
    axios.get('http://localhost:8000/Task/Single/'+id)
    .then(response => {
        console.log(response)
        dispatch({ type: FETCH_USER_SINGLE_TASK, payload: response.data})
    })
    .catch(err => console.log(err))
}
export const createUserData = (data, headers) => dispatch => {
    axios.post('http://localhost:8000/Users/add', data, {headers})
    .then(response => {
        if (response.data.success){
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
        }else{
            Toast.fire({
                icon: 'error',
                title: response.data.message
            })
        }
    })
    .catch(err => {
        Toast.fire({
            icon: 'error',
            title: `${data.username} already exist`
          })
    })
}

export const updateUser = (data, userData) => dispatch => {
    axios.post('http://localhost:8000/Users/update/'+data, userData)
        .then(response => {
            // SUCCESSFUL UPDATE
            if (response.data.success){
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                  })
            }
        })
        .catch(err => {console.log(err)})
}
