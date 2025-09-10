"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_service_1 = require("./auth.service");
var router = (0, express_1.Router)();
router.post("/register", auth_service_1.default.register);
exports.default = router;
