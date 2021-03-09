import * as actionType from '../actions/types'
let init:IAuthStateReducer = {
    loggedUser: {},
    token: "",
    authLoading: false,
    loggedError: ""
}

if( localStorage.getItem('loggedUser') && 
    localStorage.getItem('token'))
    init={
        loggedUser: JSON.parse(localStorage.getItem('loggedUser')||""),
        token: localStorage.getItem('token')|| "",
        authLoading: false,
        loggedError:""
    }

export const authReducer = (state = init, action:IActionReducer) => {
    
    switch (action.type) {
        case actionType.SET_LOGGED_USER:
            return {...state, loggedUser:action.value};
        case actionType.SET_AUTH_TOKEN:
            return {...state, token: action.value}
        case actionType.SET_AUTH_LOADING:
            return {...state, authLoading: action.value}
        case actionType.SET_LOGGED_ERROR:
            return {...state, loggedError: action.value}
        default:
            return state
    }
}
    