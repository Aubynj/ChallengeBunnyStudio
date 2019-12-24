import { FETCH_USER_TASKS, FETCH_USER_SINGLE_TASK } from "../Action/types"

const intialState = {
    userTasks : [],
    userSingleTask : []
}

const taskReducers = (state = intialState, action) => {
    switch(action.type) {
        case FETCH_USER_TASKS:
            return {
                ...state,
                userTasks : action.payload
            }
        case FETCH_USER_SINGLE_TASK:
            return {
                ...state,
                userSingleTask : action.payload
            }
        default:
            return state
    }
}

export default taskReducers