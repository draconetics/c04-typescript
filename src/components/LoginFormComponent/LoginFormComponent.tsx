import React, {useState} from 'react'
import { Redirect, RouteComponentProps } from "react-router-dom";
import LoadingComponent from '../LoadingComponent';

interface IProsLoginFrom extends RouteComponentProps<any>{
    login:(data:IAuthUser)=>Promise<void>;
    authLoading:boolean;
}

const LoginForm: React.FC<IProsLoginFrom> = (props)=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const login = (e:React.FormEvent)=>{
        e.preventDefault();
        if(email.trim() === "" || password.trim() === "")
            return;
        const user = {
            email,password
        }
        //console.log(user);
        props.login(user).then((data)=>{
            console.log("this is the data")
            console.log(data);
            props.history.push('/home')
        }).catch((e)=>{
            if(e.response)
                setError(e.response.data.message);
            else
                setError("Failing conneting to server : " + e.message)
        });
        
    }

    const showMessage = () =>{
        if(error){
            return <div className="alert alert-danger">{error}</div>
        }
        return null;
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