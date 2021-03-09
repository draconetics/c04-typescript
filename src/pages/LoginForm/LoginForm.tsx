import React, {useState} from 'react'
import { Redirect, useHistory } from "react-router-dom";
import LoadingComponent from '../../components/LoadingComponent';
import { isEmptyObject } from '../../utils/operations';

interface IProsLoginFrom {
    login:(data:IAuthUser)=>Promise<void>;
    authLoading:boolean;
    loggedError:string;
    loggedUser:object;
    location:{state:{type:string,message:string}};
}

const LoginForm: React.FC<IProsLoginFrom> = (props)=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();


    const login = (e:React.FormEvent)=>{

        e.preventDefault();
        if(email.trim() === "" || password.trim() === "")
            return;
        console.log("this is the user")
        const user = {
            email,password
        }
        console.log(user);
        props.login(user);
    }

    const showMessage = () =>{
        
        if(!isEmptyObject(props.loggedUser)){
            return <Redirect to="/home" />;
        }

        if(props.loggedError){
            return <div className="alert alert-danger">{props.loggedError}</div>
        }
        
        if(props.location && props.location.state){
            if(props.location.state.type && props.location.state.message){
                let type = props.location.state.type;
                let message = props.location.state.message;
                return <div className={"alert " + type}>{message}</div>
            }
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
                            required={true}
                        />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input 
                            className="form-control"
                            type="password" 
                            value={password} 
                            autoComplete="new-password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
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