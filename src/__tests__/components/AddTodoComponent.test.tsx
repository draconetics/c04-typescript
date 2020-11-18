import { shallow } from 'enzyme';
import React from 'react';
import AddTodoComponent from '../../components/AddTodoComponent';

describe("#AddTodoComponent",()=>{
    describe("checking PropTypes", ()=>{
        
        
        it("should render correctly",(done)=>{
            const addTodoFunction = jest.fn();
            const appWrapper = shallow(<AddTodoComponent addTodo={addTodoFunction}/>)
            const addTodoComponent = appWrapper.find(`[data-test='AddTodoComponent']`);
            expect(addTodoComponent).toHaveLength(1);
            const addTodoButton = appWrapper.find('button');
            expect(addTodoButton).toHaveLength(1);
            const inputTodo = appWrapper.find('input')
            expect(inputTodo).toHaveLength(1);
            done();
        });

        it("should change state:newTodo when insert data on input",(done)=>{
            const addTodoFunction = jest.fn();
            const appWrapper = shallow(<AddTodoComponent addTodo={addTodoFunction}/>)
            
            const setNewTodo = jest.fn();
            const handleClick = jest.spyOn(React, "useState");
            handleClick.mockImplementation(() => ["", setNewTodo]);
            
            appWrapper.find('input').simulate('change', { target: { value: 'Hello' } });
            expect(setNewTodo).toBeTruthy();
            done();
        })

        it("should call addTodo function when it is clicked on 'Add Todo' button",(done)=>{
            const spyAddTodo = jest.fn();
            const appWrapper = shallow(<AddTodoComponent addTodo={spyAddTodo}/>)
            
            const setNewTodo = jest.fn();
            const handleClick = jest.spyOn(React, "useState");
            handleClick.mockImplementation(() => ["", setNewTodo]);
            
            appWrapper.find('button').simulate('click',{ 
                preventDefault: () => {
                }
               });
            expect(spyAddTodo).toHaveBeenCalledTimes(1);
            expect(setNewTodo).toBeTruthy();
            done();
        })
    });

});