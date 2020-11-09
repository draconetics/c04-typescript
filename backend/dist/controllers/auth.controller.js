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
exports.logoutUser = exports.loginUser = void 0;
const auth_util_1 = require("./utils/auth.util");
const user_1 = __importDefault(require("../models/user"));
const HttpException_1 = require("../common/HttpException");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(req)
        auth_util_1.validateLogin(req.body);
        console.log("service login");
        const userFound = yield user_1.default.findOne({ email: req.body.email });
        if (userFound) {
            const isPasswordMatch = yield bcryptjs_1.default.compare(req.body.password, userFound.password);
            //await User.saveAuthToken(userFound)
            if (!isPasswordMatch)
                next(new HttpException_1.HttpException(422, "invalid credentials"));
            const userToken = (yield auth_util_1.generateToken(userFound, next)) || "";
            if (userToken === "")
                next(new HttpException_1.HttpException(500, "No token generated"));
            let resp = {
                status: 200,
                message: "success",
                data: {
                    user: userFound,
                    token: userToken
                }
            };
            res.status(200).json(resp);
        }
        else {
            next(new HttpException_1.HttpException(500, "user not found"));
        }
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //req.user, req.token 
        const foundUser = res.locals.jwtPayload;
        const tokenUser = res.locals.token;
        foundUser.tokens = foundUser.tokens.filter((item) => {
            return item.token !== tokenUser;
        });
        yield foundUser.save();
        const resp = {
            status: 200,
            message: "success",
            data: foundUser
        };
        res.status(200).json(resp);
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
