import { shallow } from 'enzyme';
import React from 'react';
import { NoteListComponent } from '../../components/NoteListComponent/NoteListComponent';

describe("#NoteListComponent",()=>{
    describe("checking PropTypes", ()=>{

        let appInstance:any;
        let appWrapper:any;
        let properties:any;
        beforeAll((done)=>{
            properties = {
                noteList:[{_id:"123343455667abcdef",text:"this is a task", complete:false}],
                getNotes: async():Promise<void>=>{},
                loading: false,
                setNotes: jest.fn()
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

        it('should show an error alert:"Error on getting list at server."', (done)=>{
            
            const errorGettingList = "server error"
            appInstance.setState({errorGettingList})
            expect(appWrapper.contains(<span className="alert alert-danger">{errorGettingList}</span>)).toBe(true);
            
            //reset
            appInstance.setState({errorGettingList:""})
            done();
        })

        it('should get notes using function props.getNotes()',()=>{
            const fakeGetNotes = jest.fn(async():Promise<void>=>{});
            properties.getNotes = fakeGetNotes;
            appWrapper = shallow(<NoteListComponent {...properties}/>)
            appInstance = appWrapper.instance();
            expect(fakeGetNotes).toHaveBeenCalledTimes(1)
        })

        it('should select a specific note with specific id',()=>{
            const idNote0 = properties.noteList[0];
            appInstance.editNote(idNote0._id);
            expect(appWrapper.state('editedNote')).toEqual(idNote0);
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
            properties.getNotes = async():Promise<void>=>{};
            appWrapper = shallow(<NoteListComponent {...properties}/>)
            appInstance = appWrapper.instance();
            expect(appInstance).toBeTruthy();   
            appInstance.setState({editedNote:newNote});
            expect(appWrapper.state('editedNote')).toEqual(newNote);
            appInstance.saveNote();
            expect(properties.noteList).toHaveLength(1);
            expect(appInstance.props).toEqual(properties);
            
        })


    })

})