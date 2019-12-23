import { combineReducers } from 'redux'
import userReducer from './usersReducers'
import taskReducers from './taskReducers'

const rootReducers = combineReducers({
    users : userReducer,
    tasks : taskReducers
})

export default rootReducers