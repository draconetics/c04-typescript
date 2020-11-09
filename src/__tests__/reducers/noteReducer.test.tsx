import {noteReducer} from '../../reducers/noteReducer'
import * as actionTypes from '../../actions/types'

describe('#notesReducer', ()=>{
    describe('Get Reducer', () => {

        it('Should return default state', () => {
            const initialState = {
                notes:[],
                loading:true,
                error:""
            }
            const newState = noteReducer(undefined, {type:"",value:[]});
            expect(newState).toEqual(initialState);
        });
    
        it('Should return new state if receiving type', () => {
            
            const noteList = [{_id:"123456acdfa",text:"this is a sample",complete:false},{_id:"b123456acdfa",text:"go to the hell",complete:false}]
            const resultState = {
                notes:noteList,
                loading:false,
                error:""
            }
            const newState = noteReducer(undefined, {
                type: actionTypes.SET_NOTES,
                value: noteList
            });
            expect(newState).toEqual(resultState);
    
        });
    
    });
})