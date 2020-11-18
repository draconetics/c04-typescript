import { shallow } from 'enzyme';
import React from 'react';
import MenuComponent from '../../../components/MenuComponent/MenuComponent';


describe("#MenuComponent",()=>{
    describe("rendering properly", ()=>{
        
        it('should render all menus',()=>{
            const properties = {
                authLoading: false,
                token: "",
                logout: jest.fn(async():Promise<void>=>{} )
            }
            
            const appWrapper = shallow(<MenuComponent {...properties}/>)
            expect(appWrapper.find('[data-test="MenuComponent"]')).toHaveLength(1);
        })

        it('should call logout method',()=>{
            const spyLogout = jest.fn(async():Promise<void>=>{} );
            const properties = {
                authLoading: false,
                token: "123123123l12j3l12j3",
                logout: spyLogout,
            }
            
            const appWrapper = shallow(<MenuComponent {...properties}/>)
            appWrapper.find('button').simulate('click')
            expect(spyLogout).toHaveBeenCalledTimes(1);
        })

    })
})
        