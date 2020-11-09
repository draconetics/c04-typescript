"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.validateLogin = void 0;
const HttpException_1 = require("../../common/HttpException");
const user_util_1 = require("./user.util");
const jwtConfig_1 = __importDefault(require("../../config/jwtConfig"));
const jwt = require('jsonwebtoken');
exports.validateLogin = (body) => {
    let errorEmail = user_util_1.validateUserEmail(body.email);
    let errorPassword = user_util_1.validateUserPassword(body.password);
    if (errorEmail)
        throw new HttpException_1.HttpException(422, errorEmail);
    if (errorPassword)
        throw new HttpException_1.HttpException(422, errorPassword);
};
exports.generateToken = (user, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("generate toke method");
    //console.log(user)
    //check this --> const token = jwt.sign({user}, process.env.JWT_KEY)
    try {
        const token = yield jwt.sign({ _id: user._id }, jwtConfig_1.default.jwtSecret);
        //console.log(token);
        user.tokens = user.tokens.concat({ token: token });
        yield user.save();
        //console.log(user)
        return token;
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
