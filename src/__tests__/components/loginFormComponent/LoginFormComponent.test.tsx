import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { match, Router, useHistory } from 'react-router-dom';
import {createMemoryHistory} from 'history'
import LoginFormComponent from '../../../pages/LoginForm/LoginForm';

import {http} from '../../../config/http-common'
import LoadingComponent from '../../../components/LoadingComponent';
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(http,{ delayResponse:0 });

describe("#LoginFormComponent",()=>{
    describe("checking Render", ()=>{
        it('should render correctly',()=>{
            const properties = {
                login:jest.fn(),
                authLoading:false,
                loggedError:"",
            }
            const appWrapper = shallow(<LoginFormComponent {...properties} />)
            const loginForm = appWrapper.find('[data-test="LoginFormComponent"]')
            expect(loginForm).toHaveLength(1);
            
            const logoImg:any = appWrapper.find('img')
            expect(logoImg.getElement(0).props.src).toEqual("./assets/user02.jpg")
            expect(appWrapper.find(".login-container")).toHaveLength(1);
            expect(appWrapper.find(".login__logo")).toHaveLength(1);
            expect(appWrapper.find(".login__form")).toHaveLength(1);
            expect(appWrapper.find('input').at(0).prop('type')).toBe("email");
            expect(appWrapper.find('input').at(1).prop('type')).toBe("password");
        
        })

        it('should call function login and redirect',()=>{
            /* const sample = jest.fn();
            jest.mock('react-router-dom', () => ({
                ...jest.requireActual('react-router-dom'),
                useHistory: () => ({ push: jest.fn() })
            })); 
              */
            
            //const history = createMemoryHistory()
            //const pushSpy = jest.spyOn(useHistory, 'push') // or 'replace', 'goBack', etc.
            const spyLogin = jest.fn()
            const properties = {
                login:spyLogin,
                authLoading:false,
                loggedError:"",
            }
            const appWrapper = shallow(<LoginFormComponent {...properties} />)

            appWrapper.find('input').at(0).simulate('change', {target: {value: 'mario@gmail.com'}});
            appWrapper.find('input').at(1).simulate('change', {target: {value: 'mario'}});
            
            //login
            appWrapper.find('button').simulate('click', {preventDefault: () => {}})
            
            expect(spyLogin).toHaveBeenCalledTimes(1);
            
            //expect(useHistory().push.mock).toBeTruthy();
            //expect(spyPush).toHaveBeenCalledWith('/home')
            //expect(historyMock.useHistory.push.mock.calls[0][0]).toEqual('/whatever');

        }) 

        it('should not login because login is incomplete or is empty',()=>{
            /* const sample = jest.fn();
            jest.mock('react-router-dom', () => ({
                ...jest.requireActual('react-router-dom'),
                useHistory: () => ({ push: jest.fn() })
            }));  */
             
            const spyLogin = jest.fn()
            const properties = {
                login:spyLogin,
                authLoading:false,
                loggedError:"",
            }
            const appWrapper = shallow(<LoginFormComponent {...properties} />)

            appWrapper.find('input').at(0).simulate('change', {target: {value: 'mario@gmail.com'}});
            appWrapper.find('input').at(1).simulate('change', {target: {value: '    '}});
            
            //login
            appWrapper.find('button').simulate('click', {preventDefault: () => {}})
            
            expect(spyLogin).toHaveBeenCalledTimes(0);
            
        }) 

        it('should show an error because do not connect to server',()=>{
            const properties = {
                login:jest.fn(),
                authLoading:false,
                loggedError:"Errot conecting to server",
            }
            const appWrapper = shallow(<LoginFormComponent {...properties} />)
            expect(appWrapper.find('.alert.alert-danger')).toHaveLength(1);
            
            
            
        })

        it('should show loading before connecting to server',()=>{
            const properties = {
                login:jest.fn(),
                authLoading:true,
                loggedError:"Errot conecting to server",
            }
            const appWrapper = shallow(<LoginFormComponent {...properties} />)
            expect(appWrapper.find(LoadingComponent)).toHaveLength(1);
            
        })

        /* it('should call function login and redirect',()=>{
            const spyPush = jest.fn();
            
            const historyMock:any = { push: jest.fn(), location: {}, listen: jest.fn() };
            const spyLogin = jest.fn()
            const properties = {
                login:spyLogin,
                authLoading:false,
                loggedError:"",
            }
            const appWrapper = mount(<Router history={historyMock}><LoginFormComponent {...properties} /></Router>)

            const emailInput:any = appWrapper.find('input').at(0);
            const passwordInput:any = appWrapper.find('input').at(1);
            const buttonSubmit:any = appWrapper.find('button');
            act(()=>{
                emailInput.prop('onChange')({target: {value: 'mario@gmail.com'}})
                passwordInput.prop('onChange')({target: {value: 'mario'}})
                buttonSubmit.prop('onClick')({preventDefault: () => {}})
            })
            console.log(historyMock.push.mock.calls);
            expect(historyMock.push.mock.calls[0][0]).toEqual('/home');
            //expect(spyLogin).toHaveBeenCalledTimes(1);
            //expect(spyPush).toHaveBeenCalled();

            //const submitButton = 
            //expect(spyPush).toHaveBeenCalledTimes(1);

        }) */

    })
})