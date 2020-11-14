import * as actionTypes from '../actions/types'
const initialState:INoteStateReducer = {
    notesDo:[],
    notesDone:[],
    loading:false
}
export const noteReducer = (
    state = initialState,
    action: IActionReducer
  ): INoteStateReducer => {
    switch (action.type) {
        case actionTypes.SET_NOTES_DO:
            return {
                ...state,
                notesDo:action.value,
            }
        case actionTypes.SET_NOTES_DONE:
            return {
                ...state,
                notesDone:action.value,
            }
        case actionTypes.SET_NOTES_LOADING:
            return {
                ...state,
                loading: action.value
            }
        
        case actionTypes.SAVE_NOTE_DO_LIST:         
            const newList = state.notesDo.map((item)=>{
                if(item._id === action.value._id){
                    item.text = action.value.text;
                    item.complete = action.value.complete;
                }
                return item;
            });
            
            return {
                ...state,
                notesDo:newList
            }
        case actionTypes.CREATE_NOTE_DO_LIST:
            return {
                ...state,
                notesDo:[...state.notesDo,action.value]
            }
        case actionTypes.DELETE_NOTE:
            console.log(action.value)
            let isDoneList = action.value.complete;
            let id = action.value._id;
            let newNotes = [];
            if(isDoneList === true){
                newNotes = state.notesDone.filter(item=>item._id !== id?item:null);
                return { ...state, notesDone:newNotes}
            }else{
                newNotes = state.notesDo.filter(item=>item._id !== id?item:null);
                return { ...state, notesDo:newNotes}
            }
        default: return state;
    }
  };
  
  