import React from "react";

import TodoComponent from "./components/TodoComponent";
import NoteListComponent from "./components/NoteListComponent/";
import MenuComponent from "./components/MenuComponent"
import LoginFormComponent from "./components/LoginFormComponent"
import RegisterFormComponent from "./components/RegisterFormComponent"
import NotFoundPageComponent from "./components/NotFoundPageComponent"
import HomePage from "./pages/Home"



import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <MenuComponent></MenuComponent>
        <Switch>
            <Route exact path={["/","/home"]} component={HomePage}></Route>
            <Route path="/notelist" component={NoteListComponent}></Route>
            <Route path="/todolist" component={TodoComponent}></Route>
            <Route path="/login" component={LoginFormComponent}></Route>
            <Route path="/register" component={RegisterFormComponent}></Route>
            <Route path='/404' component={NotFoundPageComponent} />
            <Redirect from='*' to='/404' />
        </Switch>
      </BrowserRouter>
      
    </React.Fragment>
  );
};
export default App;