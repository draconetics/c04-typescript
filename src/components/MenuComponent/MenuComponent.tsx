import React from 'react'
import {NavLink} from 'react-router-dom'


interface IPropsMenuComponent {
    authLoading: boolean;
    token: string;
    logout: ()=> Promise<void>;
}


const MenuComponent:React.FC<IPropsMenuComponent> = ({authLoading, token, logout})=>{
    
    const AuthMenuButtons = ()=>{
        return <>
            <li>
                <NavLink to="/blog" activeClassName="active" >Blog</NavLink>         
            </li>
            <li>
                <NavLink to="/notelist" activeClassName="active" >NoteList</NavLink>         
            </li>
            <li>
                <NavLink to="/todolist" activeClassName="active" >TodoList</NavLink>         
            </li>
        </>;
    }

    //console.log(props.token);
    return (<nav data-test="MenuComponent">
        <div className="main-nav container">
            <div className="logo">TodoWeb</div>
            <ul className="main-menu">
                <li><NavLink to="/" activeClassName="active" exact={true}>Home</NavLink>         
                </li>
                {(token)?<AuthMenuButtons/>:null}
            </ul>
            <ul className="right-menu">
                
                {(token)?
                        (<>
                        <li><a href="/#" className="btn btn-logout" onClick={()=>logout()}>Logout</a></li>
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