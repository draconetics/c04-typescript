"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });
module.exports = mongoose_1.default.model("Note", noteSchema);
