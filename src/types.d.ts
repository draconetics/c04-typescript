//declare this instead install @types/webrtc
//declare module 'types-module';
//import {Dispatch} from 'redux'
type Todo = {
    _id?:string;
    text: string;
    complete: boolean;
  };

  type ToggleComplete = (selectedTodo: number) => void;
  
  type AddTodo = (newTodo: string) => void;


interface INote{
    _id: string,
    text: string,
    complete: boolean
}

type NoteState = {
    notes: INote[],
    loading: boolean,
    error:string
}

type NoteAction = {
    type: string,
    value: any   
}

type AppDispatch = any
type AddNote = (newNote: string) => void;

