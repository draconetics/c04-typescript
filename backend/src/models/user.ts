import mongoose from 'mongoose';
import { NextFunction } from "express";
import {IUser} from '../interfaces/IUser';
import { errorHandler } from '../middleware/error.middleware';
import { HttpException } from '../common/HttpException';
import { USER_NAME_MINIMUM, USER_PASSWORD_MINIMUM } from '../config/util';
//const validator = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: USER_NAME_MINIMUM
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: USER_PASSWORD_MINIMUM
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {  timestamps: true })


userSchema.pre<IUser>('save', async function(next){
    // Hash the password before saving the user model
    
    try{
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 8)
        }
        next()
    }catch(e){
        next(new HttpException(e.status, e.message))
    }
    
})
/*

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    console.log("generate toke method")
    const user = this
    //console.log(user)
    //check this --> const token = jwt.sign({user}, process.env.JWT_KEY)
    const token = await jwt.sign({_id:user._id}, 'secret')
   
    user.tokens = user.tokens.concat({token})
    await user.save()
    console.log(token)
    return token

}
*/





export = mongoose.model<IUser>('User', userSchema)
