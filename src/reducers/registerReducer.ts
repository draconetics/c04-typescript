import * as actionTypes from '../actions/types'
const registerState:IRegisterStateReducer = {
    registerError:'',
    registerRedirectUrl: {},
    registerLoading: false
}
export const registerReducer = (
    state = registerState,
    action: IActionReducer
  ): IRegisterStateReducer => {
    switch (action.type) {
        case actionTypes.SET_REG_LOADING:
            return {
                ...state,
                registerLoading:action.value
            }
        case actionTypes.SET_REG_REDIRECT:
            console.log('set '+ action.value);
            return {
                ...state,
                registerRedirectUrl: action.value
            }
        case actionTypes.SET_REG_ERROR:
            console.log('set '+ action.value);
            return {
                ...state,
                registerError: action.value
            }
        default: return state;
    }
  };
  