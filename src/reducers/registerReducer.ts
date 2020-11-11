import * as actionTypes from '../actions/types'
const initialState:IRegisterStateReducer = {
    status:"",
    detail:"",
    loading:false
}
export const registerReducer = (
    state = initialState,
    action: IActionReducer
  ): IRegisterStateReducer => {
    switch (action.type) {
        case actionTypes.REG_SET_STATUS:
            return {
                ...state,
                status:action.value
            }
        default: return state;
    }
  };
  