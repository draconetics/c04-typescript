import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

interface TodoListItemProps {
  todo: Todo;
  toggleComplete: ToggleComplete;
  index: number;
  itemsRef:any;
  deleteTodo:(id:string)=>void;
}

export const TodoItemComponent: React.FC<TodoListItemProps> = ({
  todo,
  toggleComplete,
  index,
  itemsRef,
  deleteTodo
}) => {

  const handleOverLabel = (e:React.MouseEvent,index:number)=>{
      //console.log(index);
      //console.log(itemsRef.current[index].className)
      itemsRef.current[index].classList.add("show")
  }

  const handleOutLabel = (e:React.MouseEvent, index:number)=>{
    itemsRef.current[index].classList.remove("show")
  }

  return (
    <li className="container">
      <label 
          className={"todo-item " + (todo.complete ? "complete" : "")} 
          onMouseOver={e=>handleOverLabel(e,index)}
          onMouseOut={e=>handleOutLabel(e,index)}>
        <input
          type="checkbox"
          onChange={() => toggleComplete(index)}
          checked={todo.complete}
        />
        <span className="todo-item__text">{todo.text}</span>
        <span className="todo-item__icon"  
              ref={el => itemsRef.current[index] = el}  
              onClick={()=>deleteTodo(todo._id||"")}
              >
          <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
        </span>
      </label>
    </li>
  );
};