import {  shallow } from 'enzyme';
import React from 'react';
import TodoComponent from '../../components/TodoComponent';


describe("#TodoItemComponent",()=>{
    describe("checking PropTypes", ()=>{
        let appInstance:any;
        let appWrapper:any;
        beforeAll((done)=>{
            appWrapper = shallow(<TodoComponent />)
            appInstance = appWrapper.instance();
            done();
        })      
        it("should render correctly",(done)=>{
            const addTodoComponent = appWrapper.find(`[data-test='TodoComponent']`);
            expect(addTodoComponent).toHaveLength(1);
            expect(appWrapper.find('TodoListComponent').length).toEqual(1);
            expect(appWrapper.find('AddTodoComponent').length).toEqual(1);
            //expect(appWrapper.html()).toMatchSnapshot();
            done();
        });

        it('should show error messages',(done)=>{
            
            const errorTodoList = "error trying to connect to server"
            const errorAddingTodo = "error adding new item"
            appInstance.setState({errorTodoList,errorAddingTodo})
            //expect(appWrapper.html()).toMatchSnapshot();
            expect(appWrapper.contains(<span>{errorTodoList}</span>)).toBe(true);
            expect(appWrapper.contains(<span>{errorAddingTodo}</span>)).toBe(true);
            
           done();
            
        })

        
        it('should add new todo',(done)=>{
            expect(appInstance).toBeTruthy();   
            appInstance.addTodo("sample");
            expect(appWrapper.state('todoList').length).toEqual(1)
            expect(appWrapper.state('todoList')[0].text).toEqual("sample")
            appInstance.setState({todoList:[]});
            expect(appWrapper.state('todoList').length).toEqual(0)
            done();
        })

        it('should delete todo item',(done)=>{
            expect(appInstance).toBeTruthy();   
            appInstance.addTodo("sample");
            expect(appWrapper.state('todoList').length).toEqual(1)
            expect(appWrapper.state('todoList')[0].text).toEqual("sample")
            const idToDelete = appWrapper.state('todoList')[0]._id;
            appInstance.deleteTodo(idToDelete);
            expect(appWrapper.state('todoList').length).toEqual(0)
            done();
        })

        it('should toggle property complete:true|false of todo item',(done)=>{
            expect(appInstance).toBeTruthy();   
            appInstance.addTodo("sample");
            expect(appWrapper.state('todoList').length).toEqual(1)
            expect(appWrapper.state('todoList')[0].text).toEqual("sample")
            expect(appWrapper.state('todoList')[0].complete).toEqual(false)
            appInstance.toggleComplete(0)//position 0 of the list
            expect(appWrapper.state('todoList')[0].complete).toEqual(true)
            //reset
            appInstance.setState({todoList:[]});
            done();
        })
    });
});
