import React, { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt, faPenSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided } from 'react-beautiful-dnd';
import AddNoteComponent from '../AddNoteComponent'
import {reorder, move, getListStyle, getDoneListStyle, getItemStyle, getDoneItemStyle} from './noteListUtility'
import LoadingComponent from '../LoadingComponent';

interface IPropsNoteListComponent {
    noteList: INote[],
    getNotes: () => Promise<void>,
    loading: boolean,
    setNotes: (data:INote[])=> void
  }

  interface IStateNoteListComponent{
      editedNote:any;
      editMode:boolean;
      noteDoneList:INote[];
      errorGettingList:string;
  }

export class NoteListComponent extends React.Component<IPropsNoteListComponent,IStateNoteListComponent>{

    constructor(props:IPropsNoteListComponent){
        super(props);
        this.state = {
            editedNote:this.getDefaultNote(),
            editMode:false,
            noteDoneList:[],
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
        this.getNotes()
    }
    //warning with hooks
    getNotes = ()=>{
        this.props.getNotes().catch(e=>{
            this.setState({
                errorGettingList:"Error getting List from the server: " + e.message
            });
        });
    } 
    

    editNote(id:string){
        const found = this.props.noteList.find(item => item._id === id);
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
            const newList = this.props.noteList.map((item)=>{
                        if(item._id === this.state.editedNote._id)
                            item.text = this.state.editedNote.text
                        return item;
                    });
            this.props.setNotes(newList)
            this.setState({
                editMode:false
            })
            
        }else{
            this.props.setNotes([...this.props.noteList, this.state.editedNote])
        }
        this.setState({
            editedNote:this.getDefaultNote()
        });
    }

    deleteNote(id:string){
    
        let newList = this.props.noteList.filter(item=>item._id !== id?item:null);
        this.props.setNotes(newList)
        newList = this.state.noteDoneList.filter(item=>item._id !== id?item:null);

        this.setState({
            noteDoneList:newList
        });
    }

    cancel(){
        this.setState({
            editedNote:this.getDefaultNote(),
            editMode:false
        });
    }

    showErrorGettingNotes(){
        if(this.state.errorGettingList){
            return (<span className="alert alert-danger">{this.state.errorGettingList}</span>)
        }
        return null;
    }

    showAlertEmptyList(list:INote[]){
        if(list.length === 0)
            return (<span>List is Empty</span>)
        else
            return null;
    }

    
    droppableIdToList(id:string){
        if(id === "droppable")
            return this.props.noteList;
        else
            return this.state.noteDoneList;
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
/*
            let state = { ...list, items:orderedItems };

            if (source.droppableId === 'droppable2') {
                state = { ...list, doneItems: orderedItems };
            }
            setList(state);
        */
            if (source.droppableId === 'droppable2') {
                this.setState({
                    noteDoneList:orderedItems
                });
            }else{
                this.props.setNotes(orderedItems)
            }
            
        } else {
            const result = move(
                this.droppableIdToList(source.droppableId),
                this.droppableIdToList(destination.droppableId),
                source,
                destination
            );
/*
            setList({
                items: result.droppable,
                doneItems: result.droppable2
            });*/
            this.props.setNotes(result.droppable)
            this.setState({
                noteDoneList:result.droppable2
            });
            
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
                    {this.showAlertEmptyList(this.props.noteList)} 
                    {this.props.noteList.map((item, index) => (
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
                                    <FontAwesomeIcon icon={faWindowClose}  size="2x" onClick={()=>this.deleteNote(item._id)} className="note-board__icon"/>
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
                        {this.showAlertEmptyList(this.state.noteDoneList)}      
                        {this.state.noteDoneList.map((item, index) => (
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
                                        <FontAwesomeIcon icon={faWindowClose}  size="2x" onClick={()=>this.deleteNote(item._id)} className="note-board__icon"/>
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
        return <>{this.props.loading===true?<LoadingComponent/>:this.renderComponent()}</>;
    }
    
}
