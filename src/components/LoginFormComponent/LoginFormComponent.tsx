import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import LoadingComponent from '../LoadingComponent';

interface IProsLoginFrom {
    login:(data:IAuthUser)=>Promise<void>;
    authLoading:boolean;
    loggedError:string;
}

const LoginForm: React.FC<IProsLoginFrom> = (props)=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();


    const login = async (e:React.FormEvent)=>{

        e.preventDefault();
        if(email.trim() === "" || password.trim() === "")
            return;
        console.log("this is the user")
        const user = {
            email,password
        }
        console.log(user);
        await props.login(user)
        console.log("login")
        if(props.loggedError === ""){
            console.log("login and going to home!!!")
            history.push('/home');
        }
            

    }

    const showMessage = () =>{
        if(props.loggedError){
            return <div className="alert alert-danger">{props.loggedError}</div>
        }
    }

    return (<>
        <div className="container">
            {showMessage()}
        </div>
        {props.authLoading?<LoadingComponent/>:
        (<div className="container" data-test="LoginFormComponent">     
            <div className="login-container">
                
                
                <div className="login__logo"><img src="./assets/user02.jpg"  alt="login-logo"/></div>
                <form className="login__form">
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                                className="form-control"
                                type="email" 
                                value={email} 
                                onChange={(e)=>setEmail(e.target.value)}
                                required={true}/>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input 
                                className="form-control"
                                type="password" 
                                value={password} 
                                autoComplete="new-password"
                                onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-success" onClick={(e)=>login(e)}>Login</button>
                    </div>
                </form>
                
            </div>
        </div>)}
    </>);
}

export default LoginForm;