import React from 'react'
import noteService from '../services/NoteService'
import AddTodoComponent from './AddTodoComponent';
import TodoListComponent from './TodoListComponent';

interface IPropsTodoComponent{}

interface IStateTodoComponent{
    todoList:Todo[];
    errorTodoList:string;
    errorAddingTodo:string;
}

export default class TodoComponent extends React.Component<IPropsTodoComponent,IStateTodoComponent>{
    constructor(props:IPropsTodoComponent){
        super(props);
        this.state = {
            todoList:[],
            errorTodoList:"",
            errorAddingTodo:""
        };

        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
    }

    

    componentDidMount(){
        this.updateTodoList();
    }

    

    addTodo(newTodo:string){
        const todo = { _id:new Date().getTime()+"ab",text: newTodo, complete: false }
        //console.log(todo);
        this.setState({
            todoList:[todo,...this.state.todoList]
        })
        /*
        if(newTodo.trim() !== "")
        noteService.createNote(todo)
          .then(({data})=>{
              console.log(data)
              this.updateTodoList();
              this.setState({
                errorAddingTodo:""
              })
          }).catch(e => {
              this.setState({
                errorAddingTodo:"Error creating new note: "+e.message
              })
          })*/
      };

    deleteTodo(id:string){
        const newTodos = this.state.todoList.filter(item=>(item._id!==id)?item:null);
        this.setState({
          todoList: newTodos
        })
    }

    toggleComplete(index:number){
/*
        const cloneItem = {...this.state.todoList[index],complete:!this.state.todoList[index].complete}
        const newTodos = this.state.todoList.filter((item:Todo) =>{
          if(cloneItem._id !== item._id)
            return item;
        }); 
        if(cloneItem.complete)
          newTodos.push(cloneItem);
        else
          newTodos.unshift(cloneItem);
        this.setState({
            todoList: newTodos
        })*/
        
        let newList = Array.from(this.state.todoList);
      
        const [removed] = newList.splice(index,1)
      
        removed.complete = !removed.complete;
        
        if(removed.complete === true)
          newList.push(removed);
        else
          newList.unshift(removed)

      
        this.setState({
          todoList:newList
        })
    };

    updateTodoList(){
      //console.log("updatetodolist")
      
        return noteService.getList()
            .then((resp)=>{
                this.setState({
                    todoList:resp.data.data,
                    errorTodoList:""
                })
                
            })
            .catch(e=>{
                this.setState({
                    errorTodoList:"Error getting todo list: " + e.message
                })
            })
          
      
      
      }

    showErrorGettingList(){
        if(this.state.errorTodoList)
            return <span>{this.state.errorTodoList}</span>
        return null;
    }
    
    showErrorAddingTodo (){
        if(this.state.errorAddingTodo)
            return <span>{this.state.errorAddingTodo}</span>
        return null;
    }
    render(){
        return (<div data-test="TodoComponent">
            {this.showErrorAddingTodo()}
            {this.showErrorGettingList()}
            <TodoListComponent 
                todoList={this.state.todoList}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
                ></TodoListComponent>
            <AddTodoComponent addTodo={this.addTodo}></AddTodoComponent>
            </div>)
    }
}