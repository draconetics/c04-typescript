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
exports.deleteNoteById = exports.getNoteById = exports.createNote = exports.getNoteList = void 0;
const note_1 = __importDefault(require("../models/note"));
const HttpException_1 = require("../common/HttpException");
const note_util_1 = require("./utils/note.util");
const mongoose_1 = __importDefault(require("mongoose"));
exports.getNoteList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield note_1.default.find({});
        let resp = {
            status: 200,
            message: "success",
            data: notes
        };
        res.status(200).json(resp);
    }
    catch (e) {
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        note_util_1.validate(req.body);
        const newNote = new note_1.default(req.body);
        yield newNote.save();
        res.status(201).json({ status: 201, message: "success", data: newNote });
    }
    catch (e) {
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.getNoteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        note_util_1.validateParamId(req.params.id, next);
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        const noteFound = yield note_1.default.findOne({ _id: id });
        if (noteFound)
            res.status(200).json({ status: 200, message: "success", data: noteFound });
        next(new HttpException_1.HttpException(500, "Note not Found"));
    }
    catch (e) {
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
exports.deleteNoteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        note_util_1.validateParamId(req.params.id, next);
        let id = mongoose_1.default.Types.ObjectId(req.params.id);
        const noteFound = yield note_1.default.findByIdAndRemove(id);
        //console.log(noteFound)
        if (noteFound)
            res.status(200).json({ status: 200, message: "success", data: noteFound });
        next(new HttpException_1.HttpException(500, "Not found element to delete"));
    }
    catch (e) {
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException_1.HttpException(e.status, e.message));
    }
});
