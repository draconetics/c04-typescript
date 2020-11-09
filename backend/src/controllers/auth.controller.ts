import { NextFunction, Request, Response } from "express";
import { generateToken, validateLogin } from "./utils/auth.util";
import User from "../models/user"
import { HttpException } from "../common/HttpException";
import bcrypt from 'bcryptjs'

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  
    try{
        //console.log(req)
        validateLogin( req.body )
        console.log("service login")
        const userFound = await User.findOne({ email:req.body.email } )
        if(userFound){
            const isPasswordMatch = await bcrypt.compare(req.body.password, userFound.password);
            //await User.saveAuthToken(userFound)
           if(!isPasswordMatch)
                next(new HttpException(422,"invalid credentials"))
            
            const userToken = await generateToken(userFound,next) || "";
            
            if(userToken === "")
                next(new HttpException(500,"No token generated"))

            let resp = {
                status: 200,
                message: "success",
                data: {
                    user:userFound,
                    token:userToken
                }
              }
            res.status(200).json(resp);
        }else{
            next(new HttpException(500,"user not found"))
        }
          
    }catch(e){
        next(new HttpException(e.status, e.message))
    }       
    
  };


  export const logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  
    try{
        //req.user, req.token 
        const foundUser = res.locals.jwtPayload;
        const tokenUser = res.locals.token;

        foundUser.tokens = foundUser.tokens.filter((item:any) => {
            return item.token !== tokenUser
        })
        await foundUser.save()
        const resp = {
            status: 200,
            message: "success",
            data: foundUser
        }
        res.status(200).json(resp)
    }catch(e){
        next(new HttpException(e.status, e.message))
    }       
    
  };
