import {SET_NOTES, SET_NOTES_ERROR} from './types'
import noteService from '../services/NoteService'

/*
export const getNotes = async (dispatch:Dispatch) => {
    console.log("this is the function get notes()")
    try{
        console.log("this is the function get notes()")
        const res = await noteService.getList()
        console.log(res)
        dispatch( {
            type: actionTypes.GET_NOTES,
            value: res.data.data
        })
    }
    catch(e){
        dispatch( {
            type: actionTypes.NOTES_ERROR,
            value: e,
        })
    }

}
*/
export const getNotes = () =>(dispatch:AppDispatch) =>{
        return noteService.getList()
            .then(resp => {
                // dispatch
                dispatch({
                    type: SET_NOTES,
                    value: resp.data.data
                });
            }).catch((e)=>{
                console.log("catching error")
                console.log(e.message)
                dispatch({
                    type: SET_NOTES_ERROR,
                    value: e.message
                })
            });
    };//end getNotes
  