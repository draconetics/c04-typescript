import React, { useState, useEffect } from "react";

import { TodoListComponent } from "./components/TodoListComponent";
import { AddTodoComponent } from "./components/AddTodoComponent";
import NoteService from './services/NoteService'

const App: React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
      updateTodoList();
  }, [])

  const updateTodoList = () =>{
    NoteService.getList()
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

  const addTodo: AddTodo = newTodo => {
    

    const todo = { text: newTodo, complete: false }
    
    if(newTodo.trim() !== "")
    NoteService.createNote(todo)
      .then(({data})=>{
        console.log(data)
        updateTodoList();
      }).catch(e => {console.error(e)})
  };

  return (
    <React.Fragment>
      <TodoListComponent todos={todos} toggleComplete={toggleComplete} />
      <AddTodoComponent addTodo={addTodo} />
    </React.Fragment>
  );
};
export default App;