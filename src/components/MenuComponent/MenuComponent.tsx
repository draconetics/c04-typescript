import React from 'react'
import {NavLink} from 'react-router-dom'


interface IPropsMenuComponent {
    authLoading: boolean,
    token: string,
    logout: ()=> Promise<void>
}


const MenuComponent:React.FC<IPropsMenuComponent> = (props)=>{
    console.log(props.token);
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
                
                {(props.token)?
                        (<>
                        <li><button className="btn btn-primary" onClick={()=>props.logout()}>Logout</button></li>
                        </>)
                    :(<>
                    <li><NavLink activeClassName="active" to="/register">Sign Up</NavLink></li>
                    <li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
                    </>
                    )}
            </ul>
        </div>
    </nav>)
}

export default MenuComponent;