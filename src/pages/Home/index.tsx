import Home from './Home'
import { connect } from 'react-redux';


  export const mapStateToProps = (state:any) =>{
      return {
          loggedUser: state.authReducer.loggedUser,
          token: state.authReducer.token
      }
  }
 
  
  export default connect(mapStateToProps)(Home);