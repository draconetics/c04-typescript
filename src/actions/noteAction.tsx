import {SET_NOTES, SET_NOTES_LOADING} from './types'
import noteService from '../services/NoteService'

export const getNotes = () =>(dispatch:AppDispatch) =>{
        dispatch({
            type: SET_NOTES_LOADING,
            value: true
        });
        return noteService.getList()
            .then(resp => {
                // dispatch
                dispatch({
                    type: SET_NOTES,
                    value: resp.data.data
                });
                dispatch({
                    type: SET_NOTES_LOADING,
                    value: false
                });
            }).catch((e)=>{
                dispatch({
                    type: SET_NOTES_LOADING,
                    value: false
                });
                throw e;
            });
    };//end getNotes
  