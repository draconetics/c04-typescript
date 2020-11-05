import * as actionTypes from '../actions/types'
const initialState:NoteState = {
    notes:[],
    loading:true,
    error:""
}
export const noteReducer = (
    state = initialState,
    action: NoteAction
  ): NoteState => {
    switch (action.type) {
        case actionTypes.SET_NOTES:
            return {
                ...state,
                notes:action.value,
                loading:false
            }
        case actionTypes.SET_NOTES_ERROR:
            return {
                ...state,
                error: action.value,
                loading: false
            }
        
        default: return state;
    }
  };
  
  