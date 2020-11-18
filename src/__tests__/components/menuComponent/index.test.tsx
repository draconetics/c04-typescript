import { mapStateToProps, mapDispatchToProps} from '../../../components/MenuComponent/index';

describe('#index - MenuComponent', () => {
    it('should map state:object to props', () => {
        const initialState = {
            authReducer:{
                token: "",
                authLoading: false
            }
        };

        // Just call the method directly passing in sample data
        // to make sure it does what it's supposed to
        expect(mapStateToProps(initialState).token).toEqual("");
        expect(mapStateToProps(initialState).authLoading).toEqual(false);
    });

    it('should map dispatch:function to props', () => {
        const dispatch = jest.fn();

        // For the `mapDispatchToProps`, call it directly but pass in
        // a mock function and check the arguments passed in are as expected
        mapDispatchToProps(dispatch).logout();
        expect(typeof dispatch.mock.calls[0][0]).toBe('function');
        
    });

});