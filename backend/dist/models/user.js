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
const mongoose_1 = __importDefault(require("mongoose"));
const HttpException_1 = require("../common/HttpException");
const util_1 = require("../config/util");
//const validator = require('validator')
const bcrypt = require('bcryptjs');
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: util_1.USER_NAME_MINIMUM
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
        minLength: util_1.USER_PASSWORD_MINIMUM
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
}, { timestamps: true });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Hash the password before saving the user model
        try {
            if (this.isModified('password')) {
                this.password = yield bcrypt.hash(this.password, 8);
            }
            next();
        }
        catch (e) {
            next(new HttpException_1.HttpException(e.status, e.message));
        }
    });
});
module.exports = mongoose_1.default.model('User', userSchema);
