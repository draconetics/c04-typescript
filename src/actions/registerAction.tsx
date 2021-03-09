import userService from '../services/UserService';
import * as actionTypes from './types';

export const createUser = (data:IRegisterUser) => (dispatch:AppDispatch) =>{
    const setLoadingTo = (flag:boolean) => ({type: actionTypes.SET_REG_LOADING, value: flag});
    const setErrorTo = (error:string) => ({type: actionTypes.SET_REG_ERROR, value: error});
    const setRedirectUrl = (url:object) => ({type: actionTypes.SET_REG_REDIRECT, value: url});

    dispatch(setLoadingTo(true));
    dispatch(setRedirectUrl({}));
    return userService.createUser(data)
        .then(resp => {
            // dispatch
            //console.log("register action")
            console.log(resp);
            dispatch(setLoadingTo(false));
            dispatch(setErrorTo(''));
            const urlObject = {
                pathname: '/login',    
                state: { type:"alert-success",message: "User successfully created." }
            } 
            dispatch(setRedirectUrl(urlObject));
            console.log('redirect');
        }).catch((e)=>{
            console.log(e.response.data);
            let defaultError = "Failing conneting to server: " + e.message;
            if(e.response && e.response.data){
                const data = e.response.data;
                if(data.message){
                    defaultError = data.message;
                }
            }
            dispatch(setErrorTo(defaultError));
            dispatch(setLoadingTo(false)); 
        });
};//end getNotes

