
import { mapStateToProps} from '../../../components/HomeComponent/index';

describe('#index - HomeComponent', () => {
    it('should map state:object to props', () => {
        const initialState = {
            authReducer:{
                loggedUser:null,
                token:""
            }
        };

        // Just call the method directly passing in sample data
        // to make sure it does what it's supposed to
        expect(mapStateToProps(initialState).loggedUser).toEqual(null);
        expect(mapStateToProps(initialState).token).toEqual("");
    });

});