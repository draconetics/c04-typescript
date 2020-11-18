import { shallow } from 'enzyme';
import React from 'react';
import RegisterFormComponent from '../../../components/RegisterFormComponent/RegisterFormComponent';


describe("#MenuComponent",()=>{
    describe("rendering properly", ()=>{
        
        it('should render all menus',()=>{
            const properties = {
                status: "",
                loading: false,
                createUser: jest.fn(async(data):Promise<void>=>{} )
            }
            
            /* const appWrapper = shallow(<RegisterFormComponent {...properties}/>)
            expect(appWrapper.find('[data-test="MenuComponent"]')).toHaveLength(1); */
        })

    });
})