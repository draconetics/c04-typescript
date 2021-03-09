import * as actionTypes from '../actions/types'
import authService from '../services/AuthService'

const auth = {
    setLoading: (flag:boolean) => ({ type: actionTypes.SET_AUTH_LOADING, value: flag }),
    setUser: (user:object) => ({type: actionTypes.SET_LOGGED_USER,value: user}),
    setToken: (token:string) => ({type: actionTypes.SET_AUTH_TOKEN,value: token}),
    setError: (error:string) => ({type: actionTypes.SET_LOGGED_ERROR, value: error}),
}

export const loginUser = (data:IAuthUser) =>(dispatch:AppDispatch) =>{
        
    dispatch(auth.setLoading(false));
    return authService.login(data)
        .then(resp => {
            dispatch(auth.setUser(resp.data.data.user));
            dispatch(auth.setToken(resp.data.data.token));
            dispatch(auth.setLoading(false));
            dispatch(auth.setError(''));
            
            saveUserLocally(resp.data.data);
        }).catch((e)=>{
            let defaultError = "Failing conneting to server: " + e.message;
            if(e.response && e.response.data){
                const data = e.response.data;
                if(data.message){
                    defaultError = data.message;
                }
            }
            dispatch(auth.setError(defaultError));
            dispatch(auth.setLoading(false));
            dispatch(auth.setToken(''));
            dispatch(auth.setUser({}))
        });
        
};//end getNotes

  
const saveUserLocally = (data:{user:string,token:string})=>{
    localStorage.setItem('loggedUser',JSON.stringify(data.user));
    localStorage.setItem('token',data.token)
}

export const logOut = () =>(dispatch:AppDispatch) =>{
    dispatch(auth.setLoading(false));
    //console.log("logout action");
    const token = localStorage.getItem('token') || "";
    return authService.logout(token)
        .then((resp)=>{
            //console.log("token deleted")
            dispatch(auth.setUser({}));
            dispatch(auth.setToken(''));
            dispatch(auth.setLoading(false));
            dispatch(auth.setError(''));
            
            deleteUserLocally();
        })
        .catch(e=>{
        dispatch(auth.setError(e.message));
        dispatch(auth.setLoading(false));
        })
}

const deleteUserLocally = ()=>{
    console.log('deleting user!!.')
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
}