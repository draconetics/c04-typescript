import { NextFunction } from "express";
import { nextTick } from "process";
import { HttpException } from "../../common/HttpException";
import { ILogin } from "../../interfaces/IAuth";
import { IUser } from "../../interfaces/IUser";
import { validateUserEmail, validateUserPassword } from "./user.util";
import jwtConfig from '../../config/jwtConfig'
const jwt = require('jsonwebtoken')

export const validateLogin = (body:ILogin):void=>{
    let errorEmail = validateUserEmail(body.email);
    let errorPassword = validateUserPassword(body.password);
    
    if(errorEmail)
        throw new HttpException(422,errorEmail)
    if(errorPassword)
        throw new HttpException(422,errorPassword)
}

export const generateToken = async(user:IUser, next:NextFunction) => {
    console.log("generate toke method")
    
    //console.log(user)
    //check this --> const token = jwt.sign({user}, process.env.JWT_KEY)
    try{
        const token = await jwt.sign(
                                    {_id:user._id}, 
                                    jwtConfig.jwtSecret);
        //console.log(token);
        user.tokens = user.tokens.concat({token:token})
        await user.save()
        //console.log(user)
        return token
    }catch(e){
        next(new HttpException(e.status, e.message))
    }
}