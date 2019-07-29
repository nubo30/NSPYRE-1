import {
    INDEX_OF_TAB,
    DATA_FORM_REGISTER,
    DATA_USER_LOGIN,
    CONFIRM_CODE_SEND_TO_EMAIL,
    CONFIRM_SIGNUP_WITH_CODE,
    ENABLE_PASSWORD_FORGET,
    RESTORE_PASSWORD
} from '../actions/authActions'

const authReducer = (state = { authError: null }, action) => {
    switch (action.type) {
        case INDEX_OF_TAB:
            return {
                ...state,
                tabsKey: action.tabsKey
            }
        case DATA_FORM_REGISTER:
            return {
                ...state,
                formRegister: action.formRegister
            }
        case DATA_USER_LOGIN:
            return {
                ...state,
                dataLoginUser: action.dataLoginUser
            }
        case CONFIRM_CODE_SEND_TO_EMAIL:
            return {
                ...state,
                confirmCodeSendToEmailOpen: action.confirmCodeSendToEmailOpen
            }
        case CONFIRM_SIGNUP_WITH_CODE:
            return {
                ...state,
                confirmSignUpWithCode: action.confirmSignUpWithCode
            }
        case ENABLE_PASSWORD_FORGET:
            return {
                ...state,
                enablePasswordForget: action.enablePasswordForget
            }
        case RESTORE_PASSWORD:
            return {
                ...state,
                restorePassword: action.restorePassword
            }
        default:
            return state
    }
}

export default authReducer



