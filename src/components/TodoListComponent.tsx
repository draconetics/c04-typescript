import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'


interface IPropsTodoListComponent {
    todoList:Todo[];
    deleteTodo:(id:string)=>void;
    toggleComplete:(index:number)=>void;
}

interface IStateTodoListComponent {

}

class TodoListComponent extends React.Component<IPropsTodoListComponent, IStateTodoListComponent> {
  
  iconsRefList:Array<any>=[];  

componentWillReceiveProps(nextProps:IPropsTodoListComponent) {
  // You don't have to do this check first, but it can help prevent an unneeded render
  
  if (nextProps.todoList.length !== this.iconsRefList.length) {
      const lenght = nextProps.todoList.length;
      this.iconsRefList = Array.apply(null, Array(lenght)).map(function (x, i) { return React.createRef(); })
  }
}

handleOnMouseOver(index:number){
  if(this.iconsRefList[index])
      this.iconsRefList[index].current.classList.add("show")
}

handleOnMouseOut(index:number){
  if(this.iconsRefList[index])
      this.iconsRefList[index].current.classList.remove("show")
}
    render(){
      const todoList = this.props.todoList;
      //console.log(todoList);
      //console.log(this.iconsRefList)
      
      return (<ul data-test="TodoListComponent">
          {todoList && todoList.map((item, index)=>{
              return (
                <li key={index} className="todo-item container" >
                  <label 
                      className={"todo-item__label " + (item.complete ? "complete" : "")} 
                      onMouseOver={e=>this.handleOnMouseOver(index)}
                      onMouseOut={e=>this.handleOnMouseOut(index)}>
                    <input
                      type="checkbox"
                      onChange={() => this.props.toggleComplete(index)}
                      checked={item.complete}
                    />
                    <span className="todo-item__text">{item.text}</span>
                    
                  </label>
                  <span className="todo-item__icon"  
                          ref={(ref)=>{if(this.iconsRefList[index])this.iconsRefList[index].current = ref}} 
                          onClick={()=>this.props.deleteTodo(item._id||"")}
                          >
                      <FontAwesomeIcon icon={faWindowClose} size="2x"></FontAwesomeIcon>
                    </span>
                </li>
              )
          })}
          
        </ul>);
    }

}

export default TodoListComponent;