import { FETCH_USERS } from "../Action/types"

const intialState = {
    users : []
}

const usersReducers = (state = intialState, action) => {
    switch(action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users : action.payload
            }
        default:
            return state
    }
}

export default usersReducers