"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.Router();
router.get('/api/user', user_controller_1.getUserList);
router.get('/api/user/:id', user_controller_1.getUserById);
router.post('/api/user', user_controller_1.createUser);
exports.default = router;
