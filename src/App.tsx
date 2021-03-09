import React, { Component, useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TodoComponent from "./components/TodoComponent";
import NoteListComponent from "./components/NoteListComponent/";
import MenuComponent from "./components/MenuComponent"
import LoginForm from "./pages/LoginForm"
import RegisterForm from "./pages/RegisterForm"

import Home from "./pages/Home"
import NotFoundPageComponent from "./pages/NotFoundPageComponent";

const  PrivateRoute: React.FC<{
  component: any;
  path: string;
  exact: boolean;
}> = ({path, exact, component,...rest}) => {
  console.log('private route');
  const data = {
    pathname: "/home",
    state: { 
      message: 'You should login or Register.',
      type:'alert-info'
    }
  }
  const condition = localStorage.getItem('token')!==null;
  return  condition ? (<Route {...rest} path={path} exact={exact} component={component} />) : 
    (<Redirect  to={data}  />);
};

const App: React.FC = () => {

  return (
    <React.Fragment>
      <BrowserRouter>
        <MenuComponent></MenuComponent>
        <Switch>
            <Route exact path={["/","/home"]} component={Home}></Route>
            <PrivateRoute path={"/notelist"} component={NoteListComponent} exact />
            <PrivateRoute path={"/todolist"} component={TodoComponent} exact />
            <Route path="/login" component={(localStorage.getItem('token')===null)?LoginForm:Home}></Route>
            <Route path="/register" component={(localStorage.getItem('token')===null)?RegisterForm:Home}></Route>
            <Route path='/404' component={NotFoundPageComponent} />
            <Redirect from='*' to='/404' />
        </Switch>
      </BrowserRouter>
      
    </React.Fragment>
  );
};
export default App;