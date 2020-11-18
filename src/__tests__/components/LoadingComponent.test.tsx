import { shallow } from 'enzyme';
import React from 'react';
import LoadingComponent from '../../components/LoadingComponent';

describe("#LoadingComponent",()=>{
    describe("rendering properly", ()=>{
        it('should render just a div',()=>{
            const appWrapper = shallow(<LoadingComponent/>)
            expect(appWrapper.find('[data-test="LoadingComponent"]')).toHaveLength(1);
            expect(appWrapper.find('.note-board__loading')).toHaveLength(1);
        })

    })
})
        