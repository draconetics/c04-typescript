import React,{useState, ChangeEvent, FocusEvent, useEffect} from 'react';
import { Redirect, RouteComponentProps  } from 'react-router-dom'
import { isEmptyObject } from '../../utils/operations';

interface IPropsRegisterFormComponent extends RouteComponentProps<any>{
    loading: boolean,
    redirect: object,
    error: string,
    createUser: (data:IRegisterUser)=> Promise<void>,
  }


const RegisterFormComponent:React.FC<IPropsRegisterFormComponent> = (props)=>{
    
    const inputInit = {
        value:"", 
        touched:false, 
        msg:"",
        isValidated:false
    };
    const [username, setUsername] = useState(inputInit);
    const [email, setEmail] = useState(inputInit);
    const [password1, setPassword1] = useState(inputInit);
    const [password2, setPassword2] = useState(inputInit);

    const validateUsername = (inputUsername:any)=>{
        let error = "";
        if (inputUsername.value.length <= 3)
            error = "First Name should be > 3 characters";
        else if (inputUsername.value.length > 10)
            error = "First Name should be <= 10 characters";

        let isValidated = false;
        if(error.length > 0){
            inputUsername.classList.add("required")
        }else{
            inputUsername.classList.remove("required")
            isValidated=true;
        }

        setUsername({...username, touched:true, value:inputUsername.value, msg:error, isValidated})
    }

    const validateRepeatPassword = (inputPassword2:any)=>{

        let error = "";
        if(password2.touched && password2.value.length <= 0)
            error = "please, repeat your password"
        if(password2.touched && password1.value !== inputPassword2.value)
            error = "Password does not match."
        
        let isValidated = false;
        if(error.length > 0){
            inputPassword2.classList.add("required")
        }else{
            inputPassword2.classList.remove("required")
            isValidated=true;
        }

        setPassword2({...password2, touched:true, value:inputPassword2.value, msg:error, isValidated})
    }


    const verifyEmail = (email:string) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
      

    const validateEmail = (inputEmail:any) =>{
        let error = "";
        if (verifyEmail(inputEmail.value) === false)
            error = 'Email does not accepted';
        
        let isValidated = false;
        if(error.length > 0){
            inputEmail.classList.add("required")
        }else{
            inputEmail.classList.remove("required")
            isValidated=true;
        }
        setEmail({...email, touched:true, value:inputEmail.value, msg:error, isValidated})
        
    }

    const validatePassword = (inputPassword1:any)=>{
        let error = "";
        if (password1.touched && inputPassword1.value.length <= 3)
            error = "Password should be > 3 characters";
        
        let isValidated = false;
        if(error.length > 0){
            inputPassword1.classList.add("required")
        }else{
            inputPassword1.classList.remove("required")
            isValidated=true;
        }
        setPassword1({...password1, touched:true, value:inputPassword1.value, msg:error, isValidated})
        
    }

    const createUser= async ()=>{
        //console.log("create user")
        const user = {
            name:username.value,
            email:email.value,
            password:password1.value
        }

        //console.log(user);
        await props.createUser(user);
       /*  console.log(props.error);
        if(props.error === ''){
            console.log("ok -> redirection")
            props.history.push({
                pathname: '/login',    
                state: { type:"alert-success",message: "User successfully created." }
              })
        } */
        
    }

    const handleOnChange = (e:ChangeEvent<HTMLInputElement>) =>{

        let input = e.target
        switch(input.name){
            case "username":
                validateUsername(input);
                break;
            case "email":
                validateEmail(input);
                break;
            case "password1":
                validatePassword(input);
                break;
            case "password2":
                validateRepeatPassword(input);
                break;
            default:
        }
    }

    const onBlur = (e: FocusEvent<HTMLInputElement>)=>{
        
        let msg = ""
        let input = e.target
        switch(input.name){
            case "username":
                if(username.isValidated===false && username.value.length===0)
                    input.classList.add("required")
                else
                    msg = username.msg
                setUsername({...username, touched:true, msg})
                break;
            case "email":
                if(email.isValidated===false && email.value.length===0)
                    input.classList.add("required")
                else
                    msg = email.msg
                setEmail({...email, touched:true, msg})
                break;
            case "password1":
                if(password1.isValidated===false && password1.value.length===0)
                    input.classList.add("required")
                else
                    msg = password1.msg
                setPassword1({...password1, touched:true, msg})
                break;
            case "password2":
                if(password2.isValidated===false && password2.value.length===0)
                    input.classList.add("required")
                else
                    msg = password2.msg
                setPassword2({...password2, touched:true, msg})
                break;
            default:
        }
    }



    const isDissabled = () =>{

        return (username.isValidated && email.isValidated && password1.isValidated && password2.isValidated)?"":"disabled"
    }

    const showAsterisk = (input:IRegisterInput) => {
        return <span className="text danger">{input.touched && input.isValidated === false?"(*)":""}</span>;
    }

    const showMessage = () => {
        if(!isEmptyObject(props.redirect)){
            return (<Redirect to={props.redirect} />);
        }
        if(props.error){
            return (<span className="alert alert-danger">{props.error}</span>);
        }
        return null;
    }


    return (<>
        {showMessage()}
        <div className="container">
            <div className="register-container">
                <div className="register__logo"><img src="./assets/register-icon.png"  alt="login-logo"/></div>
                <form className="register__form" autoComplete="off">
                    <div className="form-group">
                        <label >Username {showAsterisk(username)}</label>
                        <input 
                            className="form-control"
                            type="text" 
                            name="username" 
                            value={username.value} 
                            onChange={(e)=>handleOnChange(e) }
                            placeholder="Username"
                            onBlur={(e)=>onBlur(e)}>
                        </input>
                        <span className="text danger">{username.msg}</span>
                    </div>
                    <div className="form-group">
                        <label>Email {showAsterisk(email)}</label>
                        <input 
                            className="form-control"
                            type="text" 
                            name="email" 
                            value={email.value} 
                            onChange={(e)=>handleOnChange(e) }
                            placeholder="sample@gmail.com"
                            onBlur={(e)=>onBlur(e)}>
                        </input>
                        <span className="text danger">{email.msg}</span>
                    </div>
                    <div className="form-group">
                        <label >Password {showAsterisk(password1)}</label>
                        <input 
                            className="form-control"
                            type="password" 
                            autoComplete="new-password"
                            name="password1" 
                            value={password1.value} 
                            onChange={(e)=>handleOnChange(e) }
                            onBlur={(e)=>onBlur(e)}>
                        </input>
                        <span className="text danger">{password1.msg}</span>
                    </div>
                    <div className="form-group">
                        <label >Repeat your Password {showAsterisk(password2)}</label>
                        <input 
                            className="form-control"
                            type="password"
                            autoComplete="new-password"
                            name="password2" 
                            value={password2.value} 
                            onChange={(e)=>handleOnChange(e) }
                            onBlur={(e)=>onBlur(e)}>
                        </input>
                        <span className="text danger">{password2.msg}</span>
                    </div>
                    <div className="form-group">
                        <button 
                            type="button" 
                            className={"btn btn-success " + isDissabled()} 
                            onClick={()=>createUser()}
                            >
                                Sign Up
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </>);
}


export default RegisterFormComponent;