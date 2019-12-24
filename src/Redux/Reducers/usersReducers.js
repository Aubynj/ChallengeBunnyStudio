import { FETCH_USERS, FETCH_SINGLE_USERNAME } from "../Action/types"

const intialState = {
    users : [],
    user : ''
}

const usersReducers = (state = intialState, action) => {
    switch(action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users : action.payload
            }
        case FETCH_SINGLE_USERNAME:
            return {
                ...state,
                user : action.payload
            }
        default:
            return state
    }
}

export default usersReducers