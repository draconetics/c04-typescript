import React, {useEffect, useState} from "react";
//import { Todo, ToggleComplete } from "./types";
import { TodoItemComponent } from "./TodoItemComponent";
import noteService from "../services/NoteService"
import AddTodoComponent from './AddTodoComponent'



export const TodoListComponent: React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [errorTodos, setErrorTodos] = useState<string>("");
  const [errorAddTodo, setErrorAddTodo] = useState<string>("");
  const itemsRef = React.useRef([]);
  useEffect(() => {
    updateTodoList();
    
}, [])

const addTodo: AddTodo = newTodo => {
  const todo = { text: newTodo, complete: false }
  
  
  if(newTodo.trim() !== "")
  noteService.createNote(todo)
    .then(({data})=>{
      console.log(data)
      updateTodoList();
      setErrorAddTodo("")
    }).catch(e => {setErrorAddTodo("Error creating new note: "+e.message);})
};

const deleteTodo = (id:string) =>{
    const newTodos = todos.filter(item=>(item._id!==id)?item:null);
    setTodos(newTodos)
}

const showErrorGettingList = () =>{
    if(errorTodos)
    return <span>{errorTodos}</span>
    return null;
}

const showErrorAddingTodo = () => {
    if(errorAddTodo)
        return <span>{errorAddTodo}</span>
    return null;
}

const updateTodoList = () =>{
  noteService.getList()
      .then(({data})=>{
        console.log(data)
        setTodos(data.data)
        itemsRef.current = itemsRef.current.slice(0, data.data.length);
        setErrorTodos("")
      }).catch(e => {setErrorTodos("Error getting todo list: " + e.message)})
}
const toggleComplete: ToggleComplete = (index:number) => {

    const cloneItem = {...todos[index],complete:!todos[index].complete}
    const newTodos = todos.filter((item) =>{
      if(cloneItem._id !== item._id)
        return item;
    }); 
    if(cloneItem.complete)
      newTodos.push(cloneItem);
    else
      newTodos.unshift(cloneItem);
    setTodos(newTodos)
};


  return (<>
    {showErrorGettingList()}
    <ul>
      {todos && todos.map((todo, index) => (
          <TodoItemComponent
            key={index}
            todo={todo}
            toggleComplete={toggleComplete}
            index={index}
            itemsRef={itemsRef}
            deleteTodo={deleteTodo}
          />
      ))}
    </ul>
    <AddTodoComponent addTodo={addTodo} />
    {showErrorAddingTodo()}
  </>);
};