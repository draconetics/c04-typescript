import { shallow } from 'enzyme';
import React from 'react';
import { NoteListComponent } from '../../components/NoteListComponent/NoteListComponent';

describe("#ListItemComponent",()=>{
    describe("checking PropTypes", ()=>{
        it('should NOT show a list because noteList:[]', ()=>{
            const properties = {
                noteList:[],
                getNotes: jest.fn(),
                error: ""
            }
            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            const noteListComponent = appWrapper.find(`[data-test='NoteListComponent']`);
            const alertError = appWrapper.find(`.alert`);
            
            //render
            expect(noteListComponent).toHaveLength(1);
            //no errors
            expect(alertError).toHaveLength(0);
            //show message is empty
            expect(noteListComponent.text().includes('List is empty')).toBe(true);
            //do not show items
            expect(noteListComponent.contains('li')).toEqual(false);
        })

        it('should show a list because noteList:[1item]', ()=>{
            const properties = {
                noteList:[{_id:"123343455667abcdef",text:"this is a task", complete:false}],
                getNotes: jest.fn(),
                error: ""
            }
            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            const noteListComponent = appWrapper.find(`[data-test='NoteListComponent']`);
            const alertError = appWrapper.find(`.alert`);
            
            //render
            expect(noteListComponent).toHaveLength(1);
            //no errors
            expect(alertError).toHaveLength(0);
            //do not show message is empty
            expect(noteListComponent.text().includes('List is empty')).toBe(false);
            //snapshot
            expect(noteListComponent).toMatchSnapshot();
            //do not show items
            expect(noteListComponent.text().includes('this is a task')).toBe(true);
            
        })

        it('should show an error; error:"Network error"', ()=>{
            const properties = {
                noteList:[],
                getNotes: jest.fn(),
                error: "Network error"
            }
            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            const noteListComponent = appWrapper.find(`[data-test='NoteListComponent']`);
            const alertError = appWrapper.find('.alert');
            
            //render
            expect(noteListComponent).toHaveLength(1);
            //no errors
            expect(alertError).toHaveLength(1);
            //show message is empty
            expect(noteListComponent.text().includes('List is empty')).toBe(true);
            //do not show items
            expect(noteListComponent.contains('li')).toEqual(false);
        })

    })
})