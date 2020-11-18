
import {store} from '../../config/createStore'
import { createUser } from '../../actions/registerAction';
const {http} = require('../../config/http-common')
var MockAdapter = require("axios-mock-adapter");
 
// This sets the mock adapter on the default instance
var mock = new MockAdapter(http);
 


describe("#registerAction testing", ()=>{
    describe('createUser() action', () => {
        it('should create an User',async()=>{
            const user = {
                name:"pedro poveda",
                password: "pedro",
                email:"pedro@gmail.com"
            }
            mock.onPost("/api/user").reply(200, {
                    data: {status:200,message:"success"}
            }); 
            await store.dispatch<any>(createUser(user))
            const newState = store.getState()
            //console.log(newState);
            expect(newState.registerReducer.status).toEqual("success");
            expect(newState.registerReducer.loading).toEqual(false);
        })

        it('should not create an User', async()=>{
            const user = {
                name:"pedro poveda",
                password: "pedro",
                email:"pedro@gmail.com"
            }
            //reset handlers
            mock.resetHandlers();
            mock.onPost("/api/user").reply(500, {
                data: {status:500,message:"error"}
            }); 
            await store.dispatch<any>(createUser(user))
            const newState = store.getState()
            //console.log(store.getState());
            
            expect(newState.registerReducer.status).not.toEqual("");
            expect(newState.registerReducer.status).not.toEqual("success");
            expect(newState.registerReducer.loading).toEqual(false);
        })
    })
});