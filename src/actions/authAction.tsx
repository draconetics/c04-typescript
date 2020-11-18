import * as actionTypes from '../actions/types'
import authService from '../services/AuthService'

export const loginUser = (data:IAuthUser) =>(dispatch:AppDispatch) =>{
        dispatch({
            type: actionTypes.SET_AUTH_LOADING,
            value: true
        });
        return authService.login(data)
            .then(resp => {
                // dispatch
                //console.log(resp.data.data)
                dispatch({type: actionTypes.SET_LOGGED_USER,value: resp.data.data.user});
                dispatch({type: actionTypes.SET_TOKEN,value: resp.data.data.token});
                dispatch({type: actionTypes.SET_AUTH_LOADING,value: false});
                dispatch({type: actionTypes.SET_LOGGED_ERROR,value: ""});
                
                saveUserLocally(resp.data.data);
            }).catch((e)=>{
                dispatch({
                    type: actionTypes.SET_AUTH_LOADING,
                    value: false
                });
                //console.log("catching error")
                
                dispatch({
                    type: actionTypes.SET_LOGGED_ERROR,
                    value: "Failing conneting to server: " + e.message
                });
                
            });
    };//end getNotes
  
const saveUserLocally = (data:{user:string,token:string})=>{
    localStorage.setItem('loggedUser',JSON.stringify(data.user));
    localStorage.setItem('token',data.token)
}

export const logOut = () =>(dispatch:AppDispatch) =>{
    dispatch({
        type: actionTypes.SET_AUTH_LOADING,
        value: true
    });
    //console.log("logout action");
    const token = localStorage.getItem('token') || "";
    return authService.logout(token)
                  .then((resp)=>{
                      //console.log("token deleted")
                      dispatch({type:actionTypes.SET_LOGGED_USER,value:null});
                      dispatch({type:actionTypes.SET_TOKEN,value:""});
                      dispatch({type:actionTypes.SET_AUTH_LOADING,value:false});
                      dispatch({type: actionTypes.SET_LOGGED_ERROR,value: ""});
                        
                      deleteUserLocally();
                  })
                  .catch(e=>{
                    dispatch({type: actionTypes.SET_LOGGED_ERROR,value: "Error:" + e.message});
                    dispatch({type:actionTypes.SET_AUTH_LOADING,value:false});
                  })
}

const deleteUserLocally = ()=>{
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
}