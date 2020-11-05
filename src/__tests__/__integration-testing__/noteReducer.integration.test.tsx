import moxios from 'moxios';
import {store} from '../../config/createStore'
import { getNotes } from '../../actions/noteAction';


describe("#noteReducer integration testing", ()=>{
    describe('getNotes() action', () => {

        beforeEach(() => {
            moxios.install();
        });
    
        afterEach(() => {
            moxios.uninstall();
        });
    
        it('Store is updated correctly', () => {
    
            const expectedState = [{
                title: 'Example title 1',
                body: 'Some Text'
            },{
                title: 'Example title 2',
                body: 'Some Text'
            },{
                title: 'Example title 3',
                body: 'Some Text'
            }];
            
    
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                })
            });
    
            
            store.dispatch<any>(getNotes())
                            .then(() => {
                                const newState = store.getState()
                                //console.log(newState)
                                expect(newState.noteReducer.notes).toBe(expectedState);
                            }) 
            
        });//ent It
    
    });//end describe
}) //end describe