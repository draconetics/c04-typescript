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
exports.auth = void 0;
const HttpException_1 = require("../common/HttpException");
const jwtConfig_1 = __importDefault(require("../config/jwtConfig"));
const user_1 = __importDefault(require("../models/user"));
const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("entering to authentication");
        const auth = req.header('Authorization') || "";
        if (auth === "") {
            next(new HttpException_1.HttpException(403, 'auth - User NO Authenticated'));
        }
        const token = auth.replace('Bearer ', '');
        const data = jwt.verify(token, jwtConfig_1.default.jwtSecret);
        console.log(data);
        //data={_id:<id>}
        const foundUser = yield user_1.default.findOne({ _id: data._id });
        console.log(foundUser);
        if (foundUser) {
            res.locals.jwtPayload = foundUser;
            res.locals.token = token;
            next();
        }
        else {
            next(new HttpException_1.HttpException(500, "you are already logout"));
        }
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
