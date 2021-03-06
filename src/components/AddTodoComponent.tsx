import React, { useState, ChangeEvent, FormEvent } from "react";


interface AddTodoFormProps {
  addTodo: AddTodo;
}

const AddTodoComponent: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <form data-test="AddTodoComponent">
      <input type="text" value={newTodo} onChange={(e)=>handleChange(e)} />
      <button type="submit" onClick={(e)=>handleSubmit(e)}>
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoComponent;