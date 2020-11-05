import React, {ChangeEvent} from 'react'


interface AddNoteProps {
    editedNote: INote,
    setEditedNote: any,
    saveNote: ()=>void,
    editMode:boolean,
    cancel: ()=>void
  }

const AddNoteComponent : React.FC<AddNoteProps> =({editedNote, setEditedNote, saveNote, editMode, cancel}) =>{

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const newNote = {...editedNote, text:e.target.value}
        setEditedNote(newNote);
    }

    const cancelButton = ()=>{
        if(editMode)
            return (<button type="button" className="btn" onClick={()=>{cancel()}}>Cancel</button>)
        return null;
    }

    return (<form className="note-board__add-note">
                <input type="text" value={editedNote.text} onChange={e=>handleChange(e)} className="input-form"></input>  
                <button type="submit" className="btn btn-success" onClick={(e)=>{e.preventDefault();saveNote()}}>{editMode?"Save":"Add New Note"}</button>
                {cancelButton()}
            </form>);
}
export default AddNoteComponent;