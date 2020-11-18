import { shallow } from 'enzyme';
import React from 'react';
import TodoComponent from '../../components/TodoComponent';
import {http} from '../../config/http-common'
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(http,{ delayResponse:0 });
 

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
 
        it('should update noteList:state from the server',async ()=>{
            const expectedState = [
                {_id:"123343455667abcd01",text:"this is a task01", complete:false},
                {_id:"123343455667abcdB01",text:"this is a taskB01", complete:false},
                {_id:"123343455667abcd02",text:"this is a task02", complete:false},
                {_id:"123343455667abcd03",text:"this is a task03", complete:true},
            ];
            
            mock.onGet("/api/notes").reply(200, {
                data: expectedState
                });  
            const appWrapper = shallow(<TodoComponent />)
            let appInstance:any = appWrapper.instance();
            expect(appInstance).toBeTruthy();   
            await appInstance.updateTodoList();
            //expect(appWrapper).toMatchSnapshot();
            //console.log(appWrapper.state())
            expect(appWrapper.state('errorTodoList')).toEqual("")
            expect(appWrapper.state('todoList')).toEqual(expectedState)
                
        }) 

        it('should error on updateTodoList() in errorTodoList:state',async ()=>{
            mock.resetHandlers();
            mock.onGet("/api/notes").reply(500, {
                data: "error"
                });  
            const appWrapper = shallow(<TodoComponent />)
            let appInstance:any = appWrapper.instance();
            expect(appInstance).toBeTruthy();   
            await appInstance.updateTodoList();
            //expect(appWrapper).toMatchSnapshot();
            //console.log(appWrapper.state())
            expect(appWrapper.state('errorTodoList')).not.toEqual("")
                
        }) 

        it('should change note.complete to true',async()=>{
            
            const expectedState = [
                {_id:"123343455667abcd01",text:"this is a task01", complete:false},
                {_id:"123343455667abcdB01",text:"this is a taskB01", complete:false},
                {_id:"123343455667abcd02",text:"this is a task02", complete:false},
                {_id:"123343455667abcd03",text:"this is a task03", complete:true},
            ];
            appInstance.setState({
                todoList:expectedState
            })
            //console.log(appWrapper.state())
            await appInstance.toggleComplete(0) //pos 0 change complete:false to complete:true
            //console.log(appWrapper.state('todoList'))
            expect(expectedState[0]._id).toEqual(appWrapper.state('todoList')[3]._id)
        })     

        it('should change note.complete to true',async()=>{
            
            const expectedState = [
                {_id:"123343455667abcd01",text:"this is a task01", complete:false},
                {_id:"123343455667abcdB01",text:"this is a taskB01", complete:false},
                {_id:"123343455667abcd02",text:"this is a task02", complete:false},
                {_id:"123343455667abcd03",text:"this is a task03", complete:true},
            ];
            appInstance.setState({
                todoList:expectedState
            })
            //console.log(appWrapper.state())
            await appInstance.toggleComplete(3) //pos 0 change complete:true to complete:false
            //console.log(appWrapper.state('todoList'))
            expect(expectedState[3]._id).toEqual(appWrapper.state('todoList')[0]._id)
        })     
    });
/* 
    describe('just a sample',()=>{
        beforeEach(() => { 
            jest.clearAllMocks(); 
            jest.resetAllMocks();
          });

       
    }); */
});
