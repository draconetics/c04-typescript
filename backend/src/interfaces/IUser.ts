import {Document} from 'mongoose'
export interface IUser extends Document{
    name:string,
    email:string,
    password:string,
    tokens:{token:string}[]
}

export interface IUserValidator extends Document{
    name:string,
    email:string,
    password:string,
}