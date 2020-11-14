import {NoteListComponent} from './NoteListComponent'
import { connect } from 'react-redux';

import {getNotes} from '../../actions/noteAction'
import {CREATE_NOTE_DO_LIST, DELETE_NOTE, SAVE_NOTE_DO_LIST, SET_NOTES_DO,SET_NOTES_DONE} from '../../actions/types'
//import * as actionCreators from '../../actions/noteAction'


const mapStateToProps = (state:any) =>{
      return {
          notesDone: state.noteReducer.notesDone,
          notesDo: state.noteReducer.notesDo,
          loading: state.noteReducer.loading,
      }
  }
 
const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      getNotes: () => dispatch(getNotes()),
      setNotesDo: (newNoteList:INote[]) => dispatch({type:SET_NOTES_DO,value:newNoteList}),
      setNotesDone: (newNoteList:INote[]) => dispatch({type:SET_NOTES_DONE,value:newNoteList}),
      saveNoteDoList: (newNoteList:INote) => dispatch({type:SAVE_NOTE_DO_LIST,value:newNoteList}),
      createNoteDoList: (newNoteList:INote) => dispatch({type:CREATE_NOTE_DO_LIST,value:newNoteList}),
      deleteNote: (note:INote) => dispatch({type:DELETE_NOTE,value:note}),
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(NoteListComponent);