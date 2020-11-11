import RegisterFormComponent from './RegisterFormComponent'
import {createUser} from '../../actions/registerAction'
import { connect } from 'react-redux';

const mapStateToProps = (state:any) =>{
    return {
        status: state.registerReducer.status,
        loading: state.registerReducer.loading,
        isLogged: state.authReducer.isLogged
    }
}

const mapDispatchToProps = (dispatch: AppDispatch)=>{
  
  return {
    createUser: (data:IRegisterUser) => dispatch(createUser(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFormComponent);