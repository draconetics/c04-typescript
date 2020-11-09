import { shallow } from 'enzyme';
import React from 'react';
import { NoteListComponent } from '../../components/NoteListComponent/NoteListComponent';

describe("#ListItemComponent",()=>{
    describe("checking PropTypes", ()=>{
        /*
        it('should NOT show a list because noteList:[]', ()=>{
            const properties = {
                noteList:[],
                getNotes: jest.fn(),
                error: "",
                loading: true
            }
            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            const noteListComponent = appWrapper.find(`[data-test='NoteListComponent']`);
            const alertError = appWrapper.find(`.alert`);
            
            //render
            expect(noteListComponent).toHaveLength(1);
            //no errors
            expect(ale rtError).toHaveLength(0);
            //show message is empty
            expect(noteListComponent.text().includes('List is empty')).toBe(true);
            //do not show items
            expect(noteListComponent.contains('li')).toEqual(false);
        })*/

        it('should show TODO LIST and DONE LIST', ()=>{
            const properties = {
                noteList:[{_id:"123343455667abcdef",text:"this is a task", complete:false}],
                getNotes: jest.fn(),
                error: "",
                loading: true,
                setNotes: jest.fn()
            }
            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            const noteListComponent = appWrapper.find(`[data-test='NoteListComponent']`);
            const todoListDroppable = appWrapper.find(`[data-test='droppable']`);
            const doneListDroppable2 = appWrapper.find(`[data-test='droppable2']`);
            const alertError = appWrapper.find(`.alert`);
            
            //render
            expect(noteListComponent).toHaveLength(1);
            expect(todoListDroppable).toHaveLength(1);
            expect(doneListDroppable2).toHaveLength(1);
            //no errors
            expect(alertError).toHaveLength(0);
            
            //snapshot
            //expect(noteListComponent).toMatchSnapshot();
            
        })

        it('should show an error alert:"Network error"', ()=>{
            const properties = {
                noteList:[],
                getNotes: jest.fn(),
                error: "Network error",
                loading: true,
                setNotes: jest.fn()
            }
            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            const noteListComponent = appWrapper.find(`[data-test='NoteListComponent']`);
            const alertError = appWrapper.find('.alert');
            
            
            //render
            expect(noteListComponent).toHaveLength(1);
            //no errors
            expect(alertError).toHaveLength(1);
            //show message is empty
            expect(noteListComponent.text().includes('Network error')).toBe(true);
            //do not show items
            expect(noteListComponent.contains('li')).toEqual(false);
        })

    })
})