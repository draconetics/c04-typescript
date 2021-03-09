import RegisterForm from './RegisterForm'
import {createUser} from '../../actions/registerAction'
import { connect } from 'react-redux';

export const mapStateToProps = (state:any) =>{
    return {
      redirect: state.registerReducer.registerRedirectUrl,
      loading: state.registerReducer.registerLoading,
      error: state.registerReducer.registerError,
    }
}

export const mapDispatchToProps = (dispatch: AppDispatch)=>{
  return {
    createUser: (data:IRegisterUser) => dispatch(createUser(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);