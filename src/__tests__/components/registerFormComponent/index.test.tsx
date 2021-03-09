
import { mapStateToProps, mapDispatchToProps} from '../../../pages/RegisterForm/index';

describe('#index - RegisterFormComponent', () => {
    it('should map state:object to props', () => {
        const initialState = {
            registerReducer:{
                status:"",
                loading: false,
            }
        };

        // Just call the method directly passing in sample data
        // to make sure it does what it's supposed to
        expect(mapStateToProps(initialState).status).toEqual("");
        expect(mapStateToProps(initialState).loading).toEqual(false);
    });

    it('should map dispatch:function to props', () => {
        const dispatch = jest.fn();

        // For the `mapDispatchToProps`, call it directly but pass in
        // a mock function and check the arguments passed in are as expected
        const data = {name:"pedro poveda",email:"pedro@gmail.com", password:"pedro"}
        mapDispatchToProps(dispatch).createUser(data);
        expect(typeof dispatch.mock.calls[0][0]).toBe('function');
        
    });

});