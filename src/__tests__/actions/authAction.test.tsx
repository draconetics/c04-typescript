
import {store} from '../../config/createStore'
import { loginUser, logOut } from '../../actions/authAction';
const {http} = require('../../config/http-common')
var MockAdapter = require("axios-mock-adapter");
 
// This sets the mock adapter on the default instance
var mock = new MockAdapter(http);
 


describe("#authAction testing", ()=>{
    describe('loginUser() action', () => {

        it('should login a user', async() => {
                const resp = {user:{
                    _id:"sdflsadfjsadf1212",
                    name:"pedro poveda",
                    password: "dsfalsjdfiower",
                    email:"pedro@gmail.com"
                    },
                    token:"4234234lkjlsdf"
                }
                mock.onPost("/api/login").reply(200, {
                        data: resp
                }); 

                await store.dispatch<any>(loginUser({email:"pedro",password:"pedro"}))
                const newState:any = store.getState()
                //console.log(newState);
                expect(newState.authReducer.loggedUser).toEqual(resp.user)
                expect(newState.authReducer.token).toEqual(resp.token)
                expect(newState.authReducer.loggedError).toEqual("")
                expect(newState.authReducer.authLoading).toEqual(false)
                
        });//ent It

        it('should logout an user', async() => {
            
            mock.onPost("/api/logout").reply(200, {
                    data: {status:200,message:"logout operation made successfully"}
            }); 

            await store.dispatch<any>(logOut())
            const newState:any = store.getState()
            //console.log(newState);
            expect(newState.authReducer.loggedUser).toEqual(null)
            expect(newState.authReducer.token).toEqual("")
            expect(newState.authReducer.loggedError).toEqual("")
            expect(newState.authReducer.authLoading).toEqual(false)
            
    });//ent It
    

        it('should not login', async() => {
            //reset handlers
            mock.resetHandlers();
            
            mock.onPost("/api/login").reply(422, {
            data: "error",
            }); 
            await store.dispatch<any>(loginUser({email:"pedro",password:"pedro"}))
            const newState:any = store.getState()
            //console.log(newState);
            expect(newState.authReducer.loggedUser).toEqual(null)
            expect(newState.authReducer.token).toEqual("")
            expect(newState.authReducer.loggedError).not.toEqual("")
            expect(newState.authReducer.authLoading).toEqual(false)
        });//ent It

        it('should not logout an user', async() => {
            //reset handlers
            mock.resetHandlers();

            mock.onPost("/api/logout").reply(500, {
                    data: {status:500,message:"logout operation has not been excecuted"}            }); 

            await store.dispatch<any>(logOut())
            const newState:any = store.getState()
            //console.log(newState);
            expect(newState.authReducer.loggedUser).toEqual(null)
            expect(newState.authReducer.token).toEqual("")
            expect(newState.authReducer.loggedError).not.toEqual("")
            expect(newState.authReducer.authLoading).toEqual(false)
            
    });//ent It
    
    });//end describe
}) //end describe