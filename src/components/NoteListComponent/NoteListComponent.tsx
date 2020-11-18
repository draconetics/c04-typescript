import React, { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt, faPenSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided } from 'react-beautiful-dnd';
import AddNoteComponent from '../AddNoteComponent'
import {reorder, move, getListStyle, getDoneListStyle, getItemStyle, getDoneItemStyle} from './noteListUtility'
import LoadingComponent from '../LoadingComponent';

interface IPropsNoteListComponent {
    notesDone: INote[];
    notesDo: INote[];
    loading: boolean;
    notesError: string;
    getNotes: () => Promise<void>;
    setNotesDo: (data:INote[])=> void;
    setNotesDone: (data:INote[])=> void;
    saveNoteDoList:(data:INote)=> void;
    createNoteDoList:(data:INote)=> void;
    deleteNote: (data:INote)=>void;
  }

  interface IStateNoteListComponent{
      editedNote:any;
      editMode:boolean;
      errorGettingList:string;
  }

export class NoteListComponent extends React.Component<IPropsNoteListComponent,IStateNoteListComponent>{

    constructor(props:IPropsNoteListComponent){
        super(props);
        this.state = {
            editedNote:this.getDefaultNote(),
            editMode:false,
            errorGettingList:""
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        this.setEditedNote = this.setEditedNote.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.cancel = this.cancel.bind(this);
    }


    getDefaultNote = ()=> {
        return {
            _id:""+new Date().getTime(),
            text:"",
            complete:false
        }
    };

    componentDidMount(){
        this.props.getNotes()
    }


    editNote(id:string){
        const found = this.props.notesDo.find(item => item._id === id);
        if(found){
            this.setState({
                editedNote:found,
                editMode:true
            })
        }
            
    }

    saveNote(){
        if(this.state.editedNote.text.trim() === "")
            return;
        if(this.state.editMode){
            this.props.saveNoteDoList(this.state.editedNote)
            this.setState({
                editMode:false
            })
            
        }else{
            this.props.createNoteDoList(this.state.editedNote)
        }
        this.setState({
            editedNote:this.getDefaultNote()
        });
    }

    deleteNote(note:INote){
        this.props.deleteNote(note);
    }


    cancel(){
        this.setState({
            editedNote:this.getDefaultNote(),
            editMode:false
        });
    }

    showErrorGettingNotes(){
        if(this.props.notesError){
            return (<span className="alert alert-danger">{this.props.notesError}</span>)
        }
        return null;
    }

    showAlertEmptyList(list:INote[]){
        if(list.length === 0)
            return (<span>List is Empty</span>)
    }

    
    droppableIdToList(id:string){
        if(id === "droppable")
            return this.props.notesDo;
        else
            return this.props.notesDone;
    }

    onDragEnd(result:DropResult){
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const orderedItems = reorder(
                this.droppableIdToList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppable2') {
                this.props.setNotesDone(orderedItems)
            }else{
                this.props.setNotesDo(orderedItems)
            }
            
        } else {
            const result = move(
                this.droppableIdToList(source.droppableId),
                this.droppableIdToList(destination.droppableId),
                source,
                destination
            );

            this.props.setNotesDo(result.droppable)
            this.props.setNotesDone(result.droppable2)
        }
    };

    noteBoardList(){
        return (<div className="note-board__list">
        <h2>TODO LIST</h2>
        <Droppable droppableId="droppable" data-test="droppable">
            {(provided, snapshot) => (<>
                
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {this.showAlertEmptyList(this.props.notesDo)} 
                    {this.props.notesDo.map((item, index) => (
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
                                    <FontAwesomeIcon icon={faPenSquare}  size="2x" onClick={()=>this.editNote(item._id)} className="note-board__icon"/>
                                    <FontAwesomeIcon icon={faWindowClose}  size="2x" onClick={()=>this.deleteNote(item)} className="note-board__icon"/>
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

    noteBoardListDone(){
        return(<div className="note-board__list--done">
            <h2>DONE LIST</h2>
            <Droppable droppableId="droppable2" data-test="droppable2">
                {(provided, snapshot) => (
                    <div
                        data-test="div"
                        ref={provided.innerRef}
                        style={getDoneListStyle(snapshot.isDraggingOver)}>
                        {this.showAlertEmptyList(this.props.notesDone)}      
                        {this.props.notesDone.map((item, index) => (
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
                                        <FontAwesomeIcon icon={faWindowClose}  size="2x" onClick={()=>this.deleteNote(item)} className="note-board__icon"/>
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

    setEditedNote(newEditedNote:any){
        this.setState({
            editedNote:newEditedNote
        })
    }

    renderComponent (){
        
        return (<div data-test="NoteListComponent">
                <div className="note-board container">

                <AddNoteComponent 
                    editedNote={this.state.editedNote} 
                    setEditedNote={this.setEditedNote} 
                    editMode={this.state.editMode} 
                    saveNote={this.saveNote}
                    cancel={this.cancel}/>
                {this.showErrorGettingNotes()}            
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {this.noteBoardList()}                
                    {this.noteBoardListDone()}
                </DragDropContext>
                </div>
        </div>);
    }
    render(){
        //console.log(this.props.notesDo);
        //console.log(this.props.notesDone);
        return <>{this.props.loading===true?<LoadingComponent/>:this.renderComponent()}</>;
    }
    
}
