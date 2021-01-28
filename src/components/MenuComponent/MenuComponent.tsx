import React from 'react'
import {NavLink, useHistory} from 'react-router-dom'


interface IPropsMenuComponent {
    authLoading: boolean;
    token: string;
    logout: ()=> Promise<void>;
}


const MenuComponent:React.FC<IPropsMenuComponent> = (props)=>{
    let history = useHistory();
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
                {(props.token)?<AuthMenuButtons/>:null}
            </ul>
            <ul className="right-menu">
                
                {(props.token)?
                        (<>
                        <li><a href="/#" className="btn btn-primary" onClick={()=>props.logout().then(()=>history.push("/home"))}>Logout</a></li>
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