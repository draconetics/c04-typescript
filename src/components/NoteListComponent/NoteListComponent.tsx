import React, { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt, faPenSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided } from 'react-beautiful-dnd';
import AddNoteComponent from '../AddNoteComponent'
import {reorder, move, getListStyle, getDoneListStyle, getItemStyle, getDoneItemStyle} from './noteListUtility'

interface IProps {
    noteList: INote[],
    getNotes: () => void,
    error: string,
    loading: boolean,
    setNotes: (data:INote[])=> void
  }


export const NoteListComponent:React.FC<IProps> = (props)=>{
    const getDefaultNote = ()=> {
        return {
            _id:""+new Date().getTime(),
            text:"",
            complete:false
        }
    };
    const [editedNote, setEditedNote] = useState(getDefaultNote())
    const [editMode, setEditMode] = useState<boolean>(false);
    const [noteDoneList, setNoteDoneList] = useState<INote[]>([]);
    
    //warning with hooks
    const getNotes =  props.getNotes;
    useEffect(()=>{
        getNotes();
    },[getNotes])

    const editNote = (id:string)=>{
        const found = props.noteList.find(item => item._id === id);
        if(found){
            setEditedNote(found);
            setEditMode(true)
        }
            
    }

    const saveNote = ()=>{
        if(editedNote.text.trim() === "")
            return;
        if(editMode){
            const newList = props.noteList.map((item)=>{
                        if(item._id === editedNote._id)
                            item.text = editedNote.text
                        return item;
                    });
            props.setNotes(newList)
            setEditMode(false)
        }else{
            props.setNotes([...props.noteList, editedNote])
        }
        setEditedNote(getDefaultNote())
    }

    const deleteNote = (id:string)=>{
    
        let newList = props.noteList.filter(item=>item._id !== id?item:null);
        props.setNotes(newList)
        newList = noteDoneList.filter(item=>item._id !== id?item:null);
        setNoteDoneList(newList)
    }

    const cancel = ()=>{
        setEditedNote(getDefaultNote());
        setEditMode(false);
    }

    const showAlert = () =>{
        if(props.error){
            return <span className="alert alert-danger">{props.error}</span>
        }
        return null;
    }

    const showAlertEmptyList = (list:INote[]) =>{
        if(list.length === 0)
            return (<span>List is Empty</span>)
        else
            return null;
    }

    
    const droppableIdToList = (id:string) => {
        if(id === "droppable")
            return props.noteList;
        else
            return noteDoneList;
    }

    const onDragEnd = (result:DropResult) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const orderedItems = reorder(
                droppableIdToList(source.droppableId),
                source.index,
                destination.index
            );
/*
            let state = { ...list, items:orderedItems };

            if (source.droppableId === 'droppable2') {
                state = { ...list, doneItems: orderedItems };
            }
            setList(state);
        */
            if (source.droppableId === 'droppable2') {
                setNoteDoneList(orderedItems)
            }else{
                props.setNotes(orderedItems)
            }
            
        } else {
            const result = move(
                droppableIdToList(source.droppableId),
                droppableIdToList(destination.droppableId),
                source,
                destination
            );
/*
            setList({
                items: result.droppable,
                doneItems: result.droppable2
            });*/
            props.setNotes(result.droppable)
            setNoteDoneList(result.droppable2)
        }
    };

    const noteBoardList = ()=>{
        return (<div className="note-board__list">
        <h2>TODO LIST</h2>
        <Droppable droppableId="droppable" data-test="droppable">
            {(provided, snapshot) => (<>
                
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {showAlertEmptyList(props.noteList)} 
                    {props.noteList.map((item, index) => (
                        <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index}>
                            {(provided, snapshot) => (
                                
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}>
                                    <FontAwesomeIcon icon={faExpandArrowsAlt} size="2x"/>
                                    <span className="note-board__item__text">{item.text}</span>
                                    <FontAwesomeIcon icon={faPenSquare}  size="2x" onClick={()=>editNote(item._id)} className="note-board__icon"/>
                                    <FontAwesomeIcon icon={faWindowClose}  size="2x" onClick={()=>deleteNote(item._id)} className="note-board__icon"/>
                                </div>
                                
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            </>)}
        </Droppable>
        </div>);
    }

    const noteBoardListDone = ()=>{
        return(<div className="note-board__list--done">
            <h2>DONE LIST</h2>
            <Droppable droppableId="droppable2" data-test="droppable2">
                {(provided, snapshot) => (
                    <div
                        data-test="div"
                        ref={provided.innerRef}
                        style={getDoneListStyle(snapshot.isDraggingOver)}>
                        {showAlertEmptyList(noteDoneList)}      
                        {noteDoneList.map((item, index) => (
                            <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}>
                                {(provided:DraggableProvided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getDoneItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        <span className="note-board__item__text">{item.text}</span>
                                        <FontAwesomeIcon icon={faWindowClose}  size="2x" onClick={()=>deleteNote(item._id)} className="note-board__icon"/>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>);
    }

    return (<div data-test="NoteListComponent">
            <div className="note-board container">

            <AddNoteComponent 
                editedNote={editedNote} 
                setEditedNote={setEditedNote} 
                editMode={editMode} 
                saveNote={saveNote}
                cancel={cancel}/>
            {showAlert()}
            <DragDropContext onDragEnd={onDragEnd}>
                {noteBoardList()}                
                {noteBoardListDone()}
            </DragDropContext>
            </div>


    </div>);
}
