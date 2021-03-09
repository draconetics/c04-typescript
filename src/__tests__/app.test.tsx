import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import App from '../App';
import HomeComponent from '../pages/Home/Home';
import { NoteListComponent } from '../components/NoteListComponent/NoteListComponent';
import TodoComponent from '../components/TodoComponent';
import LoadingComponent from '../components/LoadingComponent';
import LoginForm from '../pages/LoginForm/LoginForm';
import RegisterFormComponent from '../pages/RegisterForm';

let pathMap:any = {};

describe('routes using array of routers', () => {
  beforeAll(() => {
    localStorage.removeItem('token')
    //console.log(localStorage.getItem('token'))
    const component = shallow(<App/>);
    pathMap = component.find(Route).reduce((pathMap:any, route) => {
        const routeProps:any = route.props();
        pathMap[routeProps.path] = routeProps.component;
        return pathMap;
      }, {});
      //console.log(pathMap)
      
  })
  it('should show Home component for / router (getting array of routes)', () => {

    expect(pathMap['/,/home'].WrappedComponent).toBe(HomeComponent);
  })
  it('should show News Feed component for /news router', () => {
    expect(pathMap['/notelist'].WrappedComponent).toBe(NoteListComponent);
  })
  it('should show News Feed component techdomain for /news router', () => {
    expect(pathMap['/todolist']).toBe(TodoComponent);
  })
  it('should show News Feed component techdomain for /news router', () => {
      // or directly reset the storage
    
    expect(pathMap['/login'].WrappedComponent).toBe(LoginForm);

  })
  it('should show News Feed component techdomain for /news router', () => {
    expect(pathMap['/register']).toBe(RegisterFormComponent);
  })
  it('should show No match component for route not defined', ()=>{
      expect(pathMap['/404']).toBe(LoadingComponent);
  })
})

describe('should redirect to home because token exists', () => {
    beforeAll(() => {
      localStorage.setItem('token','213123123213')
      const component = shallow(<App/>);
      pathMap = component.find(Route).reduce((pathMap:any, route) => {
          const routeProps:any = route.props();
          pathMap[routeProps.path] = routeProps.component;
          return pathMap;
        }, {});
        
    })
    
    it('should show News Feed component techdomain for /news router', () => {
        // or directly reset the storage
      //console.log(window.localStorage);
      expect(pathMap['/login'].WrappedComponent).toBe(HomeComponent);
  
    })
    it('should show News Feed component techdomain for /news router', () => {
      expect(pathMap['/register'].WrappedComponent).toBe(HomeComponent);
    })
    
  })