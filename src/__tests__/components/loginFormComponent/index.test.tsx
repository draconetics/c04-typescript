
import { mapStateToProps, mapDispatchToProps} from '../../../pages/LoginForm/index';

describe('#index - LoginFormComponent', () => {
    it('should map state:object to props', () => {
        const initialState = {
            authReducer:{
                authLoading:false,
                loggedError:""
            }
        };

        // Just call the method directly passing in sample data
        // to make sure it does what it's supposed to
        expect(mapStateToProps(initialState).authLoading).toEqual(false);
        expect(mapStateToProps(initialState).loggedError).toEqual("");
    });

    it('should map dispatch:function to props', () => {
        const dispatch = jest.fn();

        // For the `mapDispatchToProps`, call it directly but pass in
        // a mock function and check the arguments passed in are as expected
        const data = {email:"pedro@gmail.com", password:"pedro"}
        mapDispatchToProps(dispatch).login(data);
        expect(typeof dispatch.mock.calls[0][0]).toBe('function');
        
    });

});