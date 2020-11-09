"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserPassword = exports.validateUserEmail = exports.validateUserName = exports.validate = void 0;
const HttpException_1 = require("../../common/HttpException");
const util_1 = require("../../config/util");
//import bcrypt from 'bcrypt'
exports.validate = (body) => {
    let errorName = exports.validateUserName(body.name);
    let errorEmail = exports.validateUserEmail(body.email);
    let errorPassword = exports.validateUserPassword(body.password);
    if (errorName)
        throw new HttpException_1.HttpException(422, errorName);
    if (errorEmail)
        throw new HttpException_1.HttpException(422, errorEmail);
    if (errorPassword)
        throw new HttpException_1.HttpException(422, errorPassword);
};
exports.validateUserName = (name) => {
    if (name === undefined || typeof name !== 'string' || String(name).trim().length <= util_1.USER_NAME_MINIMUM)
        return "Minimum length of name is " + util_1.USER_NAME_MINIMUM;
    else
        return "";
};
exports.validateUserEmail = (email) => {
    if (email === undefined || typeof email !== 'string' || !emailAcepted(email))
        return "email is wrong";
    else
        return "";
};
exports.validateUserPassword = (password) => {
    if (password === undefined || typeof password !== 'string' || String(password).trim().length <= util_1.USER_PASSWORD_MINIMUM)
        return "Mimimum password length is " + util_1.USER_PASSWORD_MINIMUM;
    else
        return "";
};
const emailAcepted = (email) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return true;
    else
        return false;
};
/*
export const hidePassword = async (user:IUser) =>{
    try{
            user.password = await bcrypt.hash(user.password, 8)
            return user;
    }catch(e){
        throw(new HttpException(e.status,e.message));
    }
}*/ 
