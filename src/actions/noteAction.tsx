import {SET_NOTES_DO, SET_NOTES_DONE, SET_NOTES_LOADING} from './types'
import noteService from '../services/NoteService'

export const getNotes = () =>(dispatch:AppDispatch) =>{
        dispatch({
            type: SET_NOTES_LOADING,
            value: true
        });
        return noteService.getList()
            .then(resp => {
                // dispatch
                createLists(resp.data.data, dispatch)
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
  

    const createLists = (noteList:INote[], dispatch:any) =>{
        const listDo:INote[] = [];
        const listDone:INote[] = [];
        noteList.map((item)=>{
            if(item.complete === true)
                listDone.push(item);
            else
                listDo.push(item);
        });
        
        dispatch({
            type: SET_NOTES_DONE,
            value: listDone
        });
        dispatch({
            type: SET_NOTES_DO,
            value: listDo
        });   
        
    }