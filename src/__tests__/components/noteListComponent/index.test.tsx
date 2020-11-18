import React from 'react';
// We made the mapStateToProps and mapDispatchToProps methods public, 
// so they can now be imported in the test
import { mapStateToProps, mapDispatchToProps } from '../../../components/NoteListComponent/index';

describe('#index - NoteListComponent', () => {
    it('should map state:object to props', () => {
        const initialState = {
            noteReducer:{
                notesDone: [],
                notesDo: [],
                loading: false,
                notesError: ""
            }
        };

        // Just call the method directly passing in sample data
        // to make sure it does what it's supposed to
        expect(mapStateToProps(initialState).notesDone).toEqual([]);
        expect(mapStateToProps(initialState).notesDo).toEqual([]);
        expect(mapStateToProps(initialState).loading).toEqual(false);
        expect(mapStateToProps(initialState).notesError).toEqual("");
    });

    it('should map dispatch:function to props', () => {
        const dispatch = jest.fn();

        // For the `mapDispatchToProps`, call it directly but pass in
        // a mock function and check the arguments passed in are as expected
        mapDispatchToProps(dispatch).getNotes();
        expect(typeof dispatch.mock.calls[0][0]).toBe('function');
        
        jest.clearAllMocks();
        mapDispatchToProps(dispatch).setNotesDo([]);
        expect(dispatch.mock.calls[0][0]).toEqual({type:"SET_NOTES_DO",value:[]})
        
        jest.clearAllMocks();
        mapDispatchToProps(dispatch).setNotesDone([]);
        expect(dispatch.mock.calls[0][0]).toEqual({type:"SET_NOTES_DONE",value:[]})

        jest.clearAllMocks();
        const note = {_id:"123343455667abcdef",text:"this is a task", complete:false};
        mapDispatchToProps(dispatch).saveNoteDoList(note);
        expect(dispatch.mock.calls[0][0]).toEqual({type:"SAVE_NOTE_DO_LIST",value:note})

        jest.clearAllMocks();
        mapDispatchToProps(dispatch).createNoteDoList(note);
        expect(dispatch.mock.calls[0][0]).toEqual({type:"CREATE_NOTE_DO_LIST",value:note})

        jest.clearAllMocks();
        mapDispatchToProps(dispatch).deleteNote(note);
        expect(dispatch.mock.calls[0][0]).toEqual({type:"DELETE_NOTE",value:note})
    });
});