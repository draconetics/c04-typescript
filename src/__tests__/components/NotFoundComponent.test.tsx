import { shallow } from 'enzyme';
import React from 'react';
import NotFoundPageComponent from '../../components/NotFoundPageComponent';

describe("#NotFoundComponent",()=>{
    describe("rendering properly", ()=>{
        it('should render main div',()=>{
            const appWrapper = shallow(<NotFoundPageComponent/>)
            expect(appWrapper.find('[data-test="NotFoundComponent"]')).toHaveLength(1);            
        })

    })
})
        