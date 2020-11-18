import moxios from 'moxios';
import {store} from '../../config/createStore'
import { getNotes } from '../../actions/noteAction';
const {http} = require('../../config/http-common')
var MockAdapter = require("axios-mock-adapter");
 
// This sets the mock adapter on the default instance
var mock = new MockAdapter(http);
 


describe("#noteAction testing", ()=>{
    describe('getNotes() action', () => {
        it('should dispatch action getNotes()', async() => {
    
            const expectedState = [
                {_id:"123343455667abcd01",text:"this is a task01", complete:false},
                {_id:"123343455667abcdB01",text:"this is a taskB01", complete:false},
                {_id:"123343455667abcd02",text:"this is a task02", complete:false},
                {_id:"123343455667abcd03",text:"this is a task03", complete:true},
            ];
            mock.onGet("/api/notes").reply(200, {
            data: expectedState,
            }); 
            await store.dispatch<any>(getNotes())
            const newState = store.getState()
            //console.log(store.getState());
            expect(newState.noteReducer.notesDo.length).toBe(3);
            expect(newState.noteReducer.notesDone.length).toBe(1);
            
        });//ent It
    

        it('Store is cannot connect to internet', async() => {
            //reset handlers
            mock.resetHandlers();
            //reset store
            store.dispatch({type:"SET_NOTES_DO",value:[]});
            store.dispatch({type:"SET_NOTES_DONE",value:[]});

            mock.onGet("/api/notes").reply(500, {
            data: "error",
            }); 
            await store.dispatch<any>(getNotes())
            const newState:any = store.getState()
            //console.log(newState);
            expect(newState.noteReducer.notesDo).toEqual([])
            expect(newState.noteReducer.notesDone).toEqual([])
            expect(newState.noteReducer.loading).toBe(false)
            expect(newState.noteReducer.notesError).not.toBe("");
        });//ent It
    
    });//end describe
}) //end describe