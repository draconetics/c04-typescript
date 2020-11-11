import * as actionTypes from '../actions/types'
const initialState:INoteStateReducer = {
    notes:[],
    loading:true
}
export const noteReducer = (
    state = initialState,
    action: IActionReducer
  ): INoteStateReducer => {
    switch (action.type) {
        case actionTypes.SET_NOTES:
            return {
                ...state,
                notes:action.value,
                loading:false
            }
        case actionTypes.SET_NOTES_LOADING:
            return {
                ...state,
                loading: action.value
            }
        
        default: return state;
    }
  };
  
  