import { NextFunction, Request, Response } from "express"
import { HttpException } from "../common/HttpException"
import  jwtConfig  from "../config/jwtConfig"
import User from "../models/user"
const jwt = require('jsonwebtoken')


export const auth = async(req:Request, res:Response, next:NextFunction) => {
    try 
    {
        console.log("entering to authentication")
        const auth = req.header('Authorization') || "";
        if(auth === ""){
            next(new HttpException(403,'auth - User NO Authenticated'))
        }
        const token = auth.replace('Bearer ', '')
        const data = jwt.verify(token, jwtConfig.jwtSecret)
        console.log(data)
        //data={_id:<id>}
        const foundUser = await User.findOne( {_id:data._id} );
        console.log(foundUser);
        if (foundUser) {
            res.locals.jwtPayload = foundUser;
            res.locals.token = token

            next();
        }else{
            next(new HttpException(500,"you are already logout"))
        }
        
        
    } catch (e) {
        next(new HttpException(e.status, e.message))
    }
}
