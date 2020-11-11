import { mount, shallow } from 'enzyme';
import React from 'react';
import TodoListComponent from '../../components/TodoListComponent';
import Home from '../../components/HomeComponent/HomeComponent'

describe("#Home",()=>{
    describe("checking PropTypes", ()=>{
        let routeComponentPropsMock:any;
        let appWrapper:any;
        beforeAll((done)=>{
            routeComponentPropsMock = {
                history: {} as any,
                location: {} as any,
                match: {} as any,
              }
            appWrapper = shallow(<Home {...routeComponentPropsMock}/>)
            done();
        })
        it("should render correctly",(done)=>{
            
            const addTodoComponent = appWrapper.find(`[data-test='HomePage']`);
            expect(addTodoComponent).toHaveLength(1);
            expect(appWrapper.find('.alert')).toHaveLength(0)
            expect(appWrapper.text().includes('succesfully created')).toBe(false);
            done();
        })

        it("should render correctly",(done)=>{
            routeComponentPropsMock.location = {state:{type:"alert-primary",message:"succesfully created"}}

            appWrapper = shallow(<Home {...routeComponentPropsMock}/>)
            expect(appWrapper.find('.alert.alert-primary')).toHaveLength(1)
            expect(appWrapper.text().includes('succesfully created')).toBe(true);
            done()
        })
    });
});