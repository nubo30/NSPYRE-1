import {
    IS_NOT_EXIST_USER_IN_THE_API
} from '../actions/authActions'

const authReducer = (state = { authError: null }, action) => {
    switch (action.type) {
        case IS_NOT_EXIST_USER_IN_THE_API:
            return {
                ...state,
                isNotExistUserInTheAPI: action.isNotExistUserInTheAPI
            }
        default:
            return state
    }
}

export default authReducer



