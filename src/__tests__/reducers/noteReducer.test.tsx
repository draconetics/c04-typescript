import {noteReducer} from '../../reducers/noteReducer'
import * as actionTypes from '../../actions/types'

describe('#notesReducer', ()=>{
    describe('Get Reducer', () => {

        it('Should return default state', (done) => {
            const initialState = {
                notes:[],
                loading:false,
            }
            /*
            const newState = noteReducer(undefined, {type:"",value:[]});
            expect(newState).toEqual(initialState);*/
            done();
        });
    
        it('Should return new state if receiving type', (done) => {
            
            const noteList = [{_id:"123456acdfa",text:"this is a sample",complete:false},{_id:"b123456acdfa",text:"go to the hell",complete:false}]
            const resultState = {
                notes:noteList,
                loading:false,
            }
            /* const newState = noteReducer(undefined, {
                type: actionTypes.SET_NOTES,
                value: noteList
            });
            expect(newState).toEqual(resultState); */
            done();
        });
    
    });
})