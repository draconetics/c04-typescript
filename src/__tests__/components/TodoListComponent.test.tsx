import { mount, render, shallow } from 'enzyme';
import React from 'react';
import TodoListComponent from '../../components/TodoListComponent';

describe("#TodoListComponent",()=>{
    describe("checking PropTypes", ()=>{
        let appInstance:any;
        let appWrapper:any;
        let todoProps:any;
        beforeAll((done)=>{
            todoProps = {
                todoList:[{_id:"123lklkfasjsak",text:"sample",complete:false}],
                deleteTodo:jest.fn(),
                toggleComplete:jest.fn()
            }
            appWrapper = shallow(<TodoListComponent {...todoProps}/>)
            appInstance = appWrapper.instance();
            done();
        })      

        it('should render correctly', (done)=>{
            const addTodoComponent = appWrapper.find(`[data-test='TodoListComponent']`);
            expect(addTodoComponent).toHaveLength(1);
            expect(appWrapper.find('li')).toHaveLength(appInstance.props.todoList.length);
            expect(appWrapper.contains(todoProps.todoList[0].text)).toBe(true);
            done();
        })

        

        it("should delete item",()=>{
            const deleteItemFunction = jest.fn();
            todoProps = {
                todoList:[{_id:"123lklkfasjsak",text:"sample",complete:false}],
                deleteTodo:deleteItemFunction,
                toggleComplete:jest.fn()
            }
            const appWrapper = shallow(<TodoListComponent {...todoProps}></TodoListComponent>);
            
            appWrapper.find('.todo-item__icon').simulate("click");
            expect(deleteItemFunction).toHaveBeenCalledTimes(1);//one event
        })

        it("should check checkbox",()=>{
            const checkedCheckbox = jest.fn();
            const props = {
                todoList:[{_id:"123lklkfasjsak",text:"sample",complete:false}],
                deleteTodo: jest.fn(),
                toggleComplete:checkedCheckbox
            }
            const appWrapper = shallow(<TodoListComponent {...props}></TodoListComponent>);
            
            appWrapper.find({ type: 'checkbox' }).simulate("change");
            expect(checkedCheckbox).toHaveBeenCalledTimes(1);//one event

        })

        it("should change on mouse over",()=>{
            const handleOnMouseOverFunc = jest.spyOn(TodoListComponent.prototype, 'handleOnMouseOver');
            const appWrapper = shallow(<TodoListComponent {...todoProps}/>);
            appWrapper.find('label').simulate('mouseover');
            expect(handleOnMouseOverFunc).toHaveBeenCalledTimes(1);
            
        })

        


        it("should change on mouse out",()=>{
            const handleOnMouseOutFunc = jest.spyOn(TodoListComponent.prototype, 'handleOnMouseOut');
            const appWrapper = shallow(<TodoListComponent {...todoProps}/>);
            appWrapper.find('label').simulate('mouseout');
            expect(handleOnMouseOutFunc).toHaveBeenCalledTimes(1);
            
        })

        it('should update global var if props.todoList was changed',(done)=>{
            expect(appInstance).toBeTruthy();   
            const newProps = {
                todoList:[{_id:"123lklkfasjsak",text:"sample",complete:false},{_id:"123lksdfl21312jsak",text:"another sample",complete:true}],
                deleteTodo: jest.fn(),
                toggleComplete:jest.fn()
            }
            appInstance.componentWillReceiveProps(newProps)
            expect(appInstance.iconsRefList.length).toEqual(newProps.todoList.length)
            
            done();
        })

        it("should label have declared properties",(done)=>{
            
            expect(appWrapper.find('label').prop('className')).toEqual("todo-item__label ");
            expect(appWrapper.find('label').prop('onMouseOut')).toEqual(expect.any(Function));
            expect(appWrapper.find('label').prop('onMouseOver')).toEqual(expect.any(Function));
            done()
        })

    })
})