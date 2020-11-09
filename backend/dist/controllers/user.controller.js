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
exports.getUserById = exports.createUser = exports.getUserList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HttpException_1 = require("../common/HttpException");
const user_1 = __importDefault(require("../models/user"));
const note_util_1 = require("./utils/note.util");
const user_util_1 = require("./utils/user.util");
exports.getUserList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({});
        let resp = {
            status: 200,
            message: "success",
            data: users
        };
        res.status(200).json(resp);
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user_util_1.validate(req.body);
        let newUser = new user_1.default(req.body);
        yield newUser.save();
        res.status(201).json({ status: 201, message: "success", data: newUser });
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        note_util_1.validateParamId(req.params.id, next);
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        const userFound = yield user_1.default.findOne({ _id: id });
        if (userFound)
            res.status(200).json({ status: 200, message: "success", data: userFound });
        next(new HttpException_1.HttpException(500, "User not Found"));
    }
    catch (e) {
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
