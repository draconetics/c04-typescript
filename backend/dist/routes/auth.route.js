"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.Router();
router.post('/api/login', auth_controller_1.loginUser);
router.post('/api/logout', auth_middleware_1.auth, auth_controller_1.logoutUser);
exports.default = router;
