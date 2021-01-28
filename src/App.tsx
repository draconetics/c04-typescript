import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent";
import TodoComponent from "./components/TodoComponent";
import NoteListComponent from "./components/NoteListComponent/";
import MenuComponent from "./components/MenuComponent"
import LoginFormComponent from "./components/LoginFormComponent"
import RegisterFormComponent from "./components/RegisterFormComponent"

import HomeComponent from "./components/HomeComponent"
import NotFoundPageComponent from "./components/NotFoundPageComponent";





const App: React.FC = () => {

  
  return (
    <React.Fragment>
      <BrowserRouter>
        <MenuComponent></MenuComponent>
        <Switch>
            <Route exact path={["/","/home"]} component={HomeComponent}></Route>
            <Route path="/notelist" component={NoteListComponent}></Route>
            <Route path="/todolist" component={TodoComponent}></Route>
            <Route path="/login" component={(localStorage.getItem('token')===null)?LoginFormComponent:HomeComponent}></Route>
            <Route path="/register" component={(localStorage.getItem('token')===null)?RegisterFormComponent:HomeComponent}></Route>
            <Route path='/404' component={NotFoundPageComponent} />
            <Redirect from='*' to='/404' />
        </Switch>
      </BrowserRouter>
      
    </React.Fragment>
  );
};
export default App;