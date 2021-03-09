import LoginForm from './LoginForm'
import {loginUser} from '../../actions/authAction'
import { connect } from 'react-redux';

export const mapStateToProps = (state:any) =>{
  return {
    authLoading: state.authReducer.authLoading,
    loggedError: state.authReducer.loggedError,
    loggedUser: state.authReducer.loggedUser,
  }
}

export const mapDispatchToProps = (dispatch: AppDispatch)=>{
  
  return {
    login: (data:IAuthUser) => dispatch(loginUser(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);