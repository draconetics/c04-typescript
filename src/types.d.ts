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

interface INoteStateReducer {
    notesDone: INote[];
    notesDo: INote[];
    loading: boolean;
    notesError: string;
}

interface IActionReducer{
    type: string,
    value: any       
}

type AppDispatch = any
type AddNote = (newNote: string) => void;
/*** RegisterForm */
interface IRegisterInput{
    value:string;
    touched:boolean;
    msg:string;
    isValidated:boolean;
}

interface IRegisterUser{
    name:string;
    email:string;
    password:string;
}
interface IRegisterStateReducer{
    status:string;
    detail:string;
    loading:boolean;
}

/*** authReducer */

interface IAuthStateReducer{
    loggedUser: any;
    token: string;
    authLoading: boolean;
    loggedError:string;
}

interface IAuthUser{
    email:string;
    password: string;
}