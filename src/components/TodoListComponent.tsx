import React, {useEffect, useState} from "react";
//import { Todo, ToggleComplete } from "./types";
import { TodoItemComponent } from "./TodoItemComponent";
import noteService from "../services/NoteService"
import AddTodoComponent from './AddTodoComponent'

export const TodoListComponent: React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
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
    }).catch(e => {console.error(e)})
};

const updateTodoList = () =>{
  noteService.getList()
      .then(({data})=>{
        console.log(data)
        setTodos(data.notes)
      }).catch(e => {console.error(e)})
}
const toggleComplete: ToggleComplete = selectedTodo => {
  const updatedTodos = todos.map(todo => {
    if (todo === selectedTodo) {
      return { ...todo, complete: !todo.complete };
    }
    return todo;
  });
  setTodos(updatedTodos);
};


  return (<>
    <ul>
      {todos && todos.map(todo => (
        <TodoItemComponent
          key={todo.text}
          todo={todo}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
    <AddTodoComponent addTodo={addTodo} />
  </>);
};