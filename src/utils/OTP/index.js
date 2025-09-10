"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExpireDate = exports.generateOTP = void 0;
var generateOTP = function () {
    return Math.floor(Math.random() * 9999 + 10000);
};
exports.generateOTP = generateOTP;
var generateExpireDate = function (time) {
    return Date.now() + time;
};
exports.generateExpireDate = generateExpireDate;
