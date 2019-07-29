
// Types Variables
export const INDEX_TAB_SECOND_HEADER = 'INDEX_TAB_SECOND_HEADER'
export const TYPE_DATA_PASS_TO_SCENES_CONTEST = 'TYPE_DATA_PASS_TO_SCENES_CONTEST'
export const DATA_PASS_TO_SCENES_CONTEST_DETAILS = 'DATA_PASS_TO_SCENES_CONTEST_DETAILS'
export const DATA_ENGAGE_FORM = 'DATA_ENGAGE_FORM'
export const DATA_CREATE_A_CONTEST_FORM = 'DATA_CREATE_A_CONTEST_FORM'
export const DATA_SUBMIT_A_PRIZE_FORM = 'DATA_SUBMIT_A_PRIZE_FORM'
export const DATA_AUDIENCE_TO_REACH = 'DATA_AUDIENCE_TO_REACH'
export const CHANGE_AVATAR = 'CHANGE_AVATAR'
export const DATA_OUR_AUDIENCE_FORM = 'DATA_OUR_AUDIENCE_FORM'
export const DATA_CREATE_A_PRIZE_CONTEST_FORM = 'DATA_CREATE_A_PRIZE_CONTEST_FORM'

export const secondHeaderSwitchData = (indexTabHeader) => {
    return (dispatch) => {
        return dispatch({
            type: "INDEX_TAB_SECOND_HEADER",
            indexTabHeader: indexTabHeader
        })
    }
}

export const contestType = (contestTypeParams) => {
    return (dispatch) => {
        return dispatch({
            type: "TYPE_DATA_PASS_TO_SCENES_CONTEST",
            contestTypeParams: contestTypeParams
        })
    }
}

// Data that have scene 'ContestDetails'
export const dataContestDetails = (dataContestDetailsParams) => {
    return (dispatch) => {
        return dispatch({
            type: "DATA_PASS_TO_SCENES_CONTEST_DETAILS",
            dataContestDetailsParams: dataContestDetailsParams
        })
    }
}

export const engageFormData = (engageFormDataParams) => {
    return (dispatch) => {
        return dispatch({
            type: DATA_ENGAGE_FORM,
            engageFormData: engageFormDataParams
        })
    }
}

// createAContestFormData
export const createAContestFormData = (createAContestFormDataParams) => {
    return (dispatch) => {
        return dispatch({
            type: DATA_CREATE_A_CONTEST_FORM,
            createAContestFormData: createAContestFormDataParams
        })
    }
}

// Datos del formulario 'Create a contest'
export const ourAudienceFormData = (ourAudienceFormDataParams) => {
    return (dispatch) => {
        return dispatch({
            type: DATA_OUR_AUDIENCE_FORM,
            ourAudienceFormData: ourAudienceFormDataParams
        })
    }
}

// Datos del formulario 'Create a Prize'
export const prizesFormData = (prizesFormDataParams) => {
    return (dispatch) => {
        return dispatch({
            type: DATA_CREATE_A_PRIZE_CONTEST_FORM,
            prizesFormData: prizesFormDataParams
        })
    }
}

// submitAPrizeFormData
export const submitAPrizeFormData = (submitAPrizeFormDataParams) => {
    return (dispatch) => {
        return dispatch({
            type: DATA_SUBMIT_A_PRIZE_FORM,
            submitAPrizeFormData: submitAPrizeFormDataParams
        })
    }
}

// Data from audience to reach
export const audienceReachData = (audienceReachDataDataParams) => {
    return (dispatch) => {
        return dispatch({
            type: DATA_AUDIENCE_TO_REACH,
            audienceReachData: audienceReachDataDataParams
        })
    }
}

// Chage Avatar
export const urlAvatar = (urlAvatarParams) => {
    return (dispatch) => {
        return dispatch({
            type: CHANGE_AVATAR,
            urlAvatar: urlAvatarParams
        })
    }
}