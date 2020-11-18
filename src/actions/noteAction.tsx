import {SET_NOTES_DO, SET_NOTES_DONE, SET_NOTES_ERROR, SET_NOTES_LOADING} from './types'
import noteService from '../services/NoteService'

export const getNotes = () =>(dispatch:AppDispatch) =>{
        dispatch({
            type: SET_NOTES_LOADING,
            value: true
        });
        return noteService.getList()
            .then(resp => {
                
                //console.log(resp);
                // dispatch
                createLists(resp.data.data, dispatch)
                
                dispatch({
                    type: SET_NOTES_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_NOTES_ERROR,
                    value: ""
                });
            }).catch((e)=>{
                //console.log("entra a catcher")
                dispatch({
                    type: SET_NOTES_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_NOTES_ERROR,
                    value: "Error getting data from the server: " + e.message
                });
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