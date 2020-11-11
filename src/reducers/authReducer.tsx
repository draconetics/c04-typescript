import * as actionType from '../actions/types'
let init:IAuthStateReducer = {
    loggedUser: null,
    token: "",
    authLoading: false
}

if( localStorage.getItem('loggedUser') && 
    localStorage.getItem('token'))
    init={
        loggedUser: JSON.parse(localStorage.getItem('loggedUser')||""),
        token: localStorage.getItem('token')|| "",
        authLoading: false
    }

export const authReducer = (state = init, action:IActionReducer) => {
    console.log("this is the action.value")
    console.log(action.value)
      switch (action.type) {
        case actionType.SET_LOGGED_USER:
          return {...state, loggedUser:action.value};
        case actionType.SET_TOKEN:
            return {...state, token: action.value}
        case actionType.SET_AUTH_LOADING:
            return {...state, authLoading: action.value}
        default:
          return state
      }
    }
    
    