"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParamId = exports.validate = void 0;
const HttpException_1 = require("../../common/HttpException");
exports.validate = (body) => {
    let message = "";
    if (body.text === undefined || typeof body.text !== "string")
        message = "Text is not type string and it is required";
    else if (body.text === "")
        message = "Text is empty";
    else if (body.complete === undefined || typeof body.complete !== "boolean")
        message = "Complete is not type boolean and it is required";
    if (message.length > 0)
        throw new HttpException_1.HttpException(422, message);
};
exports.validateParamId = (param, next) => {
    let idFilter = /[0-9a-f]{24}/;
    if (!idFilter.test(param))
        next();
};
