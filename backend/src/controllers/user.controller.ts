import mongoose from 'mongoose'
import { NextFunction, Response, Request} from 'express'
import { HttpException } from '../common/HttpException';
import { IUser } from '../interfaces/IUser';
import { IUsers } from '../interfaces/IUsers';
import User from '../models/user'
import { validateParamId } from './utils/note.util';
import { validate } from './utils/user.util';

export const getUserList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  
    try{
        const users:IUsers = await User.find({});
        let resp = {
          status: 200,
          message: "success",
          data: users
        }
        res.status(200).json(resp);
    }catch(e){
        next(new HttpException(e.status,e.message));
    } 
    
  };

  export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  
    try{
        validate(req.body);
        console.log(req.body.email);
        const doesUserExit = await User.exists({ email: req.body.email });
        console.log(doesUserExit);
        if(doesUserExit){
          res.status(400).json({status:400,message:"Email already in use."});
        } else {
          let newUser:IUser = new User(req.body);
          await newUser.save();
          res.status(201).json({status:201,message:"success",data:newUser});
        }
    }catch(e){
        next(new HttpException(e.status,e.message));
    } 
    
  };

  export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id,next)
        let id = mongoose.Types.ObjectId(req.params.id);
        const userFound:IUser|null = await User.findOne({_id: id})
        if(userFound)
            res.status(200).json({status:200, message:"success", data:userFound});
        next(new HttpException(500,"User not Found"));
      }catch(e){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  };