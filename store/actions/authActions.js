export const INDEX_OF_TAB = 'INDEX_OF_TAB'
export const DATA_FORM_REGISTER = 'DATA_USER_SIGNUP'
export const DATA_USER_LOGIN = 'DATA_USER_LOGIN'
export const CONFIRM_CODE_SEND_TO_EMAIL = 'CONFIRM_CODE_SEND_TO_EMAIL'
export const CONFIRM_SIGNUP_WITH_CODE = 'CONFIRM_SIGNUP_WITH_CODE'
export const ENABLE_PASSWORD_FORGET = 'ENABLE_PASSWORD_FORGET'
export const RESTORE_PASSWORD = 'RESTORE_PASSWORD'

// SignUp
export const singinOrLogin = (tabsKey) => {
    return (dispatch) => {
        return dispatch({
            type: INDEX_OF_TAB,
            tabsKey: tabsKey
        })
    }
}

// data user registraction
export const formRegister = (formRegisterParams) => {
    return (dispatch) => {
        return dispatch({
            type: DATA_FORM_REGISTER,
            formRegister: formRegisterParams
        })
    }
}

// data user login
export const dataLoginUser = (dataLoginUserParams) => {
    return (dispatch) => {
        return dispatch({
            type: DATA_USER_LOGIN,
            dataLoginUser: dataLoginUserParams
        })
    }
}

export const confirmCodeSendToEmailOpen = (confirmCodeSendToEmailOpenParams) => {
    return (dispatch) => {
        return dispatch({
            type: CONFIRM_CODE_SEND_TO_EMAIL,
            confirmCodeSendToEmailOpen: confirmCodeSendToEmailOpenParams
        })
    }
}

export const confirmSignUpWithCode = (confirmSignUpWithCodeParams) => {
    return (dispatch) => {
        return dispatch({
            type: CONFIRM_SIGNUP_WITH_CODE,
            confirmSignUpWithCode: confirmSignUpWithCodeParams
        })
    }
}

export const enablePasswordForget = (enablePasswordForgetParams) => {
    return (dispatch) => {
        return dispatch({
            type: ENABLE_PASSWORD_FORGET,
            enablePasswordForget: enablePasswordForgetParams
        })
    }
}

export const restorePassword = (restorePasswordParams) => {
    return (dispatch) => {
        return dispatch({
            type: RESTORE_PASSWORD,
            restorePassword: restorePasswordParams
        })
    }
}