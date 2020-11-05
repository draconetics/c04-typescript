import React from 'react'
import {NavLink} from 'react-router-dom'

const MenuComponent = () =>{
    return (<nav>
        <div className="main-nav container">
            <div className="logo">TodoWeb</div>
            <ul className="main-menu">
                <li><NavLink to="/" activeClassName="active" exact={true}>Home</NavLink>         
                </li>
                <li>
                    <NavLink to="/blog" activeClassName="active" >Blog</NavLink>         
                </li>
                <li>
                    <NavLink to="/notelist" activeClassName="active" >NoteList</NavLink>         
                </li>
                <li>
                    <NavLink to="/todolist" activeClassName="active" >TodoList</NavLink>         
                </li>
            </ul>
            <ul className="right-menu">
                
                <li><NavLink activeClassName="active" to="/register">Sign Up</NavLink></li>
                <li><NavLink activeClassName="active" to="/login">Login</NavLink></li>

            </ul>
        </div>
    </nav>)
}

export default MenuComponent;