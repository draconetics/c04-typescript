"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const noteSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        required: true
    }
});
exports.default = mongoose_1.model("Note", noteSchema);
