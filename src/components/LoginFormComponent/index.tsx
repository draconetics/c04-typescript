import LoginFormComponent from './LoginFormComponent'
import {loginUser} from '../../actions/authAction'
import { connect } from 'react-redux';

const mapStateToProps = (state:any) =>{
    return {
        authLoading: state.authReducer.authLoading
    }
}

const mapDispatchToProps = (dispatch: AppDispatch)=>{
  
  return {
    login: (data:IAuthUser) => dispatch(loginUser(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);