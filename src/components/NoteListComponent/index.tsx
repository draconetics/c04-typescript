import {NoteListComponent} from './NoteListComponent'
import { connect } from 'react-redux';

import {getNotes} from '../../actions/noteAction'
import {SET_NOTES} from '../../actions/types'
//import * as actionCreators from '../../actions/noteAction'

/*
interface StateFromProps {
  noteList: INote[]
}

interface DispatchFromProps {
  getNotes: () => void;
}*/

const mapStateToProps = (state:any) =>{
      return {
          noteList: state.noteReducer.notes,
          error: state.noteReducer.error,
          loading: state.noteReducer.loading
      }
  }
 
const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      getNotes: () => dispatch(getNotes()),
      setNotes: (newNoteList:INote[]) => dispatch({type:SET_NOTES,value:newNoteList})
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(NoteListComponent);