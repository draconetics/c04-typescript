import { NextFunction } from "express";
import { HttpException } from "../../common/HttpException"
import { INoteValidator} from "../../interfaces/INote"

export const validate = (body:INoteValidator):void=>{
    let message = "";
    if(body.text === undefined || typeof body.text !== "string")
        message = "Text is not type string and it is required"
    else if(body.text === "")
        message = "Text is empty"
    else if(body.complete === undefined || typeof body.complete !== "boolean")
        message = "Complete is not type boolean and it is required"
          
    if(message.length > 0)
        throw new HttpException(422,message)
}

export const validateParamId = (param:string, next: NextFunction)=>{
    let idFilter: RegExp = /[0-9a-f]{24}/;
    if(!idFilter.test(param))
        next();
}