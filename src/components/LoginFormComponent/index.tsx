import LoginFormComponent from './LoginFormComponent'
import {loginUser} from '../../actions/authAction'
import { connect } from 'react-redux';

export const mapStateToProps = (state:any) =>{
    return {
        authLoading: state.authReducer.authLoading,
        loggedError: state.authReducer.loggedError
    }
}

export const mapDispatchToProps = (dispatch: AppDispatch)=>{
  
  return {
    login: (data:IAuthUser) => dispatch(loginUser(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);