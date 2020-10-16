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
exports.createNote = exports.getNoteList = void 0;
const note_1 = __importDefault(require("../models/note"));
exports.getNoteList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_1.default.find({});
    return res.status(200).json({ notes });
});
exports.createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = new note_1.default(req.body);
    yield newNote.save();
    return res.status(201).json(newNote);
});
