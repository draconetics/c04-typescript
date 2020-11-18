import MenuComponent from './MenuComponent'
import { logOut} from '../../actions/authAction'
import { connect } from 'react-redux';

export const mapStateToProps = (state:any) =>{
    return {
        token: state.authReducer.token,
        authLoading: state.authReducer.authLoading
    }
}

export const mapDispatchToProps = (dispatch: AppDispatch)=>{
  
  return {
    logout: () => dispatch(logOut()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
