// Types
import {
    DATA_ENGAGE_FORM,
    DATA_CREATE_A_CONTEST_FORM,
    DATA_OUR_AUDIENCE_FORM,
    DATA_CREATE_A_PRIZE_CONTEST_FORM,
    DATA_SUBMIT_A_PRIZE_FORM,
    DATA_AUDIENCE_TO_REACH,
    CHANGE_AVATAR
} from '../actions/projectsActions'

const procjectReducer = (state = {}, action) => {
    switch (action.type) {
        case "INDEX_TAB_SECOND_HEADER":
            return {
                ...state,
                indexTabHeader: action.indexTabHeader
            }
        case "TYPE_DATA_PASS_TO_SCENES_CONTEST":
            return {
                ...state,
                contestTypeParams: action.contestTypeParams
            }
        case "DATA_PASS_TO_SCENES_CONTEST_DETAILS":
            return {
                ...state,
                dataContestDetailsParams: action.dataContestDetailsParams
            }
        case DATA_ENGAGE_FORM:
            return {
                ...state,
                engageFormData: action.engageFormData
            }
        case DATA_CREATE_A_CONTEST_FORM:
            return {
                ...state,
                createAContestFormData: action.createAContestFormData
            }
        case DATA_OUR_AUDIENCE_FORM:
            return {
                ...state,
                ourAudienceFormData: action.ourAudienceFormData
            }
        case DATA_SUBMIT_A_PRIZE_FORM:
            return {
                ...state,
                submitAPrizeFormData: action.submitAPrizeFormData
            }
        case DATA_CREATE_A_PRIZE_CONTEST_FORM:
            return {
                ...state,
                prizesFormData: action.prizesFormData
            }
        case DATA_AUDIENCE_TO_REACH:
            return {
                ...state,
                audienceReachData: action.audienceReachData
            }
        case CHANGE_AVATAR:
            return {
                ...state,
                urlAvatar: action.urlAvatar
            }
        default:
            return state
    }
}

export default procjectReducer;