import MenuComponent from './MenuComponent'
import { logOut} from '../../actions/authAction'
import { connect } from 'react-redux';

const mapStateToProps = (state:any) =>{
    return {
        token: state.authReducer.token,
        authLoading: state.authReducer.authLoading
    }
}

const mapDispatchToProps = (dispatch: AppDispatch)=>{
  
  return {
    logout: () => dispatch(logOut()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
