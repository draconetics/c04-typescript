import { shallow } from 'enzyme';
import React from 'react';
import  AddNoteComponent  from '../../components/AddNoteComponent';

describe("#AddNoteComponent",()=>{
    describe("checking PropTypes", ()=>{
        
        it('should render addNoteComponent as first normal view', ()=>{
            const properties = {
                editedNote: {_id:"123456789abcdef",text:"", complete: false},
                setEditedNote: jest.fn(),
                saveNote: jest.fn(),
                editMode:false,
                cancel: jest.fn()
            }
            const appWrapper = shallow(<AddNoteComponent {...properties}/>)
            const addNoteComponent = appWrapper.find(`[data-test='AddNoteComponent']`);
            expect(addNoteComponent).toHaveLength(1);
            const button = appWrapper.find('.btn'); 
            expect(button.text()).toBe('Add New Note');
            const inputText = appWrapper.find('.input-form'); 
            expect(inputText).toHaveLength(1);
        })

        it('should render addNoteComponent as edit mode', ()=>{
            const properties = {
                editedNote: {_id:"123456789abcdef",text:"another text", complete: false},
                setEditedNote: jest.fn(),
                saveNote: jest.fn(),
                editMode:true,
                cancel: jest.fn()
            }
            const appWrapper = shallow(<AddNoteComponent {...properties}/>)
            const addNoteComponent = appWrapper.find(`[data-test='AddNoteComponent']`);
            expect(addNoteComponent).toHaveLength(1);
            const saveButton = appWrapper.find('.btn').first();           
            expect(saveButton.text()).toBe('Save');
            const cancelButton = appWrapper.find('.btn').at(1);           
            expect(cancelButton.text()).toBe('Cancel');
            const inputText = appWrapper.find('.input-form'); 
            expect(inputText.props().value).toBe('another text');
        })

        it('should render addNoteComponent to create new note', ()=>{
            const properties = {
                editedNote: {_id:"123456789abcdef",text:"this is a new note", complete: false},
                setEditedNote: jest.fn(),
                saveNote: jest.fn(),
                editMode:false,
                cancel: jest.fn()
            }
            const appWrapper = shallow(<AddNoteComponent {...properties}/>)
            const addNoteComponent = appWrapper.find(`[data-test='AddNoteComponent']`);
            expect(addNoteComponent).toHaveLength(1);
            const button = appWrapper.find('.btn');           
            expect(button.text()).toBe('Add New Note');
            
            const inputText = appWrapper.find('.input-form'); 
            expect(inputText.props().value).toBe('this is a new note');
        })

        it('should call an event to create new note', ()=>{
            const setEditedNoteFunc = jest.fn();
            const saveNoteFunc = jest.fn();
            const fakeEvent = {preventDefault:jest.fn()}
            const properties = {
                editedNote: {_id:"123456789abcdef",text:"this is a new note", complete: false},
                setEditedNote: setEditedNoteFunc,
                saveNote: saveNoteFunc,
                editMode:false,
                cancel: jest.fn()
            }
            const appWrapper = shallow(<AddNoteComponent {...properties}/>)
            const addNoteComponent = appWrapper.find(`[data-test='AddNoteComponent']`);
            expect(addNoteComponent).toHaveLength(1);
            
            appWrapper.find('.input-form').simulate('change', { target: { value: 'hola' } });
            expect(setEditedNoteFunc).toHaveBeenCalledTimes(1);//one event

            appWrapper.find('.btn').simulate('click', fakeEvent);           
            expect(saveNoteFunc).toHaveBeenCalledTimes(1);
            //expect(updateActiveBoardArray).toHaveBeenCalledWith('X');
            //expect(changeTurn).toHaveBeenCalledTimes(1);

        })


    })
})