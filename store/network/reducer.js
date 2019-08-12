import { ONLINE, OFFLINE } from './actions'


export default function networkReducer(state = {online: true}, action) {
    switch (action.type) {
        case ONLINE:
            return {
                ...state,
                online: action.online // true
            }

        case OFFLINE:
            return {
                ...state,
                online: action.online // false
            }
    
        default: return state
    }
}