import { combineReducers } from 'redux'

// Dependencias
import authReducer from './authReducer'
import projectReducer from './projectReducer'
import networkReducer from '../network/reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    networkStatus: networkReducer
});

export default rootReducer