
import { HttpException } from "../../common/HttpException"
import { USER_NAME_MINIMUM, USER_PASSWORD_MINIMUM } from "../../config/util";
import { IUserValidator } from "../../interfaces/IUser";
//import bcrypt from 'bcrypt'

export const validate = (body:IUserValidator):void=>{
    let errorName = validateUserName(body.name);
    let errorEmail = validateUserEmail(body.email);
    let errorPassword = validateUserPassword(body.password);
    if(errorName)
        throw new HttpException(422,errorName)
    if(errorEmail)
        throw new HttpException(422,errorEmail)
    if(errorPassword)
        throw new HttpException(422,errorPassword)
}

export const validateUserName = (name:string)=>{
    if(name === undefined || typeof name !== 'string' || String(name).trim().length <= USER_NAME_MINIMUM)
        return "Minimum length of name is " + USER_NAME_MINIMUM;
    else 
        return "";
}

export const validateUserEmail = (email:string)=>{
    if(email === undefined || typeof email !== 'string' || !emailAcepted(email))
        return "email is wrong"  
    else
        return ""
}

export const validateUserPassword = (password:string)=>{
    if(password === undefined || typeof password !== 'string' || String(password).trim().length <= USER_PASSWORD_MINIMUM)
        return "Mimimum password length is " + USER_PASSWORD_MINIMUM  
    else
        return ""
}

const emailAcepted = (email:string)=>{
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))    
        return true;
    else
        return false;
}

/*
export const hidePassword = async (user:IUser) =>{
    try{
            user.password = await bcrypt.hash(user.password, 8)
            return user;
    }catch(e){
        throw(new HttpException(e.status,e.message));
    }
}*/