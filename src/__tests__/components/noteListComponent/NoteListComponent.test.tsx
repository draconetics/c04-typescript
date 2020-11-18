import { mount, render, shallow } from 'enzyme';
import React from 'react';
import LoadingComponent from '../../../components/LoadingComponent';
import { NoteListComponent } from '../../../components/NoteListComponent/NoteListComponent';

describe("#NoteListComponent",()=>{
    describe("checking PropTypes", ()=>{

        let appInstance:any;
        let appWrapper:any;
        let properties:any;
        beforeAll((done)=>{
            properties = {
                notesDo:[{_id:"123343455667abcdef",text:"this is a task", complete:false}],
                notesDone:[{_id:"123343455667abcd321",text:"done task", complete:true}],
                loading: false,
                notesError: "",
                getNotes: async():Promise<void>=>{},
                setNotesDo: jest.fn(),
                setNotesDone: jest.fn(),
                saveNoteDoList:jest.fn(),
                createNoteDoList:jest.fn(),
                deleteNote: jest.fn(),
            }
            appWrapper = shallow(<NoteListComponent {...properties}/>)
            appInstance = appWrapper.instance();
            done();
        })  

        it('should show TODO LIST and DONE LIST', (done)=>{
            
            const noteListComponent = appWrapper.find(`[data-test='NoteListComponent']`);
            expect(noteListComponent).toHaveLength(1);
            const todoListDroppable = appWrapper.find(`[data-test='droppable']`);
            expect(todoListDroppable).toHaveLength(1);
            const doneListDroppable2 = appWrapper.find(`[data-test='droppable2']`);
            expect(doneListDroppable2).toHaveLength(1);
            const alertError = appWrapper.find(`.alert`);
            expect(alertError).toHaveLength(0);
            
            //snapshot
            //expect(noteListComponent).toMatchSnapshot();
            done();
        })

        it('should return a default note',(done)=>{
            
            const defaultNote = appInstance.getDefaultNote();
            expect(typeof defaultNote).toBe("object")
            expect(defaultNote).toHaveProperty('_id')
            expect(defaultNote).toHaveProperty('text')
            expect(defaultNote).toHaveProperty('complete')
            done();
        })

        it('should show an error alert:"Error on getting list at server."', (done)=>{
            const jestGetNotes = jest.fn();
            properties.getNotes = jestGetNotes;
            shallow(<NoteListComponent {...properties}/>)
            expect(jestGetNotes).toHaveBeenCalledTimes(1)
            properties.getNotes = jest.fn();
            done();
        })

        it('should show an error alert:"Error on getting list at server."', (done)=>{
            
            properties.notesError = "Server error"
            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            expect(appWrapper.find(".alert.alert-danger")).toHaveLength(1);
            properties.notesError = "";//reset
            done();
        })

        it('should change state.editdNote',(done)=>{
            const resp = properties.notesDo[0];
            appInstance.editNote(resp._id);
            expect(appWrapper.state('editedNote')).toEqual(resp)
            done();
        })

        it('should not save empty notes',()=>{
            const newNote = {
                _id: "23213123",
                text: "",
                complete: false
            }
            appInstance.setState({editedNote:newNote});
            const listBeforeSave = appWrapper.state('noteList');
            appInstance.saveNote();
            const listAfterSave = appWrapper.state('noteList');
            expect(listBeforeSave).toEqual(listAfterSave);
        })

        it('should save a note',()=>{
            const newNote = {
                _id: "23213123",
                text: "item does not empty",
                complete: false
            }

            const jestCreateNote = jest.fn();
            properties.createNoteDoList = jestCreateNote;
            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            const appInstance:any = appWrapper.instance();
            expect(appInstance).toBeTruthy();   
            appInstance.setState({editedNote:newNote});
            expect(appWrapper.state('editedNote')).toEqual(newNote);
            appInstance.saveNote();
            expect(jestCreateNote).toHaveBeenCalledTimes(1)
            expect(appWrapper.state('editedNote')).not.toEqual(newNote)
            properties.createNoteDoList = jest.fn();//reset properties
        })

        it('should save edited note',()=>{
            const editedNote = properties.notesDo[0];
            editedNote.text = "edited text";

            const spySaveEditedNote = jest.fn();
            properties.saveNoteDoList = spySaveEditedNote;

            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            const appInstance:any = appWrapper.instance(); 
            appInstance.setState({editedNote,editMode:true});//edit mode is true
            expect(appWrapper.state('editedNote')).toEqual(editedNote);
            appInstance.saveNote();
            expect(spySaveEditedNote).toHaveBeenCalledTimes(1)
            expect(appWrapper.state('editedNote')).not.toEqual(editedNote)//reset editedNote when save note.
            properties.saveNoteDoList = jest.fn();//reset properties
        })

        it('should delete a note by id',(done)=>{
            const appWrapper:any = shallow(<NoteListComponent {...properties}/>)
            const ins = appWrapper.instance();
            const spy = jest.spyOn(ins, 'deleteNote');
            ins.deleteNote(properties.notesDo[0]._id);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(properties.notesDo).toHaveLength(1);//nothis is deleted because it is just a probe
            done();
        })

        it('should reset editedNote:object',(done)=>{
            const editedNote_now = appWrapper.state('editedNote');
            appInstance.cancel();
            expect(editedNote_now._id).not.toBe(appWrapper.state('editedNote')._id)
            done();
        })

        it('should show a message "Lis is empty"',()=>{
            const notesDo = [{_id:"123343455667abcdef",text:"this is a task", complete:false}];
            const notesDone = [{_id:"123343455667abcd321",text:"done task", complete:true}];
            //empty list
            properties.notesDo = [];
            properties.notesDone = [];
            const appWrapper = mount(<NoteListComponent {...properties}/>)
            const todoList = appWrapper.find('.note-board__list')
            expect(todoList.contains("List is Empty")).toBeTruthy();
            const doneList = appWrapper.find('.note-board__list--done')
            expect(doneList.contains("List is Empty")).toBeTruthy();
            //reset
            properties.notesDo = notesDo;
            properties.notesDone = notesDone;
        })

        it('should change state.editedNote with function setEditedNote()',(done)=>{
            const newEditedNote = appInstance.getDefaultNote();
            appInstance.setEditedNote(newEditedNote)
            expect(appWrapper.state('editedNote')).toEqual(newEditedNote)
            done();
        })

        it('should show loading',(done)=>{
            properties.loading = true;
            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            expect(appWrapper.find(LoadingComponent)).toHaveLength(1);
            //reset
            properties.loading=false;
            done();
        })

        it('should show number of draggables equals to number of notesDo:array and notesDone:array',(done)=>{
            
            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            const notesDoLength = properties.notesDo.length;
            const droppableChildren = appWrapper.find(`[data-test='droppable']`).children();
            expect(droppableChildren).toHaveLength(notesDoLength);

            const notesDoneLength = properties.notesDone.length;
            expect(appWrapper.find(`[data-test='droppable2']`).children()).toHaveLength(notesDoneLength);
            //expect(appWrapper.find('DragDropContext').dive().find('Draggable')).toHaveLength(2);
            done();
        })
        
        it('should select list correctly from id:string (droppable|droppable2)',()=>{
            const notesDo = [{_id:"123343455667abcdef",text:"this is a task", complete:false}];
            const notesDone = [{_id:"123343455667abcd321",text:"done task", complete:true}];          

            properties.notesDo = notesDo;
            properties.notesDone = notesDone;

            const appWrapper = shallow(<NoteListComponent {...properties}/>)
            const appInstance:any =  appWrapper.instance();
            const droppable = appInstance.droppableIdToList("droppable")
            expect(droppable).toEqual(notesDo);
            const droppable2 = appInstance.droppableIdToList("droppable2")
            expect(droppable2).toEqual(notesDone);
            /* const droppable2 = appInstance.droppableIdToList("droppable2")
            expect(droppable2).toEqual(properties.notesDone); */
        })
    })

})