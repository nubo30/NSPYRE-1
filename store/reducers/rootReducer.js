import { combineReducers } from 'redux'

// Dependencias
import authReducer from './authReducer'
import projectReducer from './projectReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
});

export default rootReducer