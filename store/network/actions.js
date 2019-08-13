// Types
export const OFFLINE = 'network-status/offline'
export const ONLINE = 'network-status/online'


// Actions trigger for network status
export const networkStatusOnline = () => {
    return (dispatch) => {
        return dispatch({
            type: ONLINE,
            online: true
        })
    }
}

export const networkStatusOffline = () => {
    return (dispatch) => {
        return dispatch({
            type: OFFLINE,
            online: false
        })
    }
}