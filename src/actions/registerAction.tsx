import userService from '../services/UserService'
import * as actionTypes from './types'

export const createUser = (data:IRegisterUser) => (dispatch:AppDispatch) =>{
    return userService.createUser(data)
        .then(resp => {
            // dispatch
            console.log(resp)
            dispatch([
                {type: actionTypes.REG_SET_STATUS, value: "success"},
                {type: actionTypes.REG_SET_LOADING, value: false},
            ]);
            
        }).catch((e)=>{
            console.log("catching error")
            console.log(e.message)
            dispatch({
                type: actionTypes.REG_SET_STATUS,
                value: e.message
            })
        });
};//end getNotes
