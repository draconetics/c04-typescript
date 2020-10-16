"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_controller_1 = require("../controllers/note.controller");
const router = express_1.Router();
router.get('/list', note_controller_1.getNoteList);
router.post('/new', note_controller_1.createNote);
exports.default = router;
