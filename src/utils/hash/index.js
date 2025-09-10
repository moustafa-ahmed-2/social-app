"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.generateHash = void 0;
var bcryptjs_1 = require("bcryptjs");
var generateHash = function (plantext) {
    return bcryptjs_1.default.hashSync(plantext, 10);
};
exports.generateHash = generateHash;
var compareHash = function (password, hashpassword) {
    return bcryptjs_1.default.compareSync(password, hashpassword);
};
exports.compareHash = compareHash;
