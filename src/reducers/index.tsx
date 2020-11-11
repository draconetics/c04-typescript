import { combineReducers } from 'redux';
import {noteReducer} from './noteReducer';
import {registerReducer} from './registerReducer'
import {authReducer} from './authReducer'

export default combineReducers({
    noteReducer, registerReducer, authReducer
});