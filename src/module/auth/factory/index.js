"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactorySercice = void 0;
var user_model_1 = require("../../../DB/model/user/user.model");
var enum_1 = require("../../../utils/common/enum");
var hash_1 = require("../../../utils/hash");
var OTP_1 = require("../../../utils/OTP");
var AuthFactorySercice = /** @class */ (function () {
    function AuthFactorySercice() {
    }
    AuthFactorySercice.prototype.register = function (registerDTO) {
        var user = new user_model_1.User();
        user.fullName = registerDTO.fullName;
        user.email = registerDTO.email;
        user.password = (0, hash_1.generateHash)(registerDTO.password);
        user.phoneNumber = registerDTO.phoneNumber;
        user.otp = (0, OTP_1.generateOTP)();
        user.otpExpiryAt = (0, OTP_1.generateExpireDate)(5 * 60 * 60 * 1000);
        user.credentialUpdatedAt = Date.now();
        user.gender = registerDTO.Gender;
        user.role = enum_1.SYS_ROLE.user;
        user.userAgent = enum_1.USER_AGENT.local;
        return user;
    };
    return AuthFactorySercice;
}());
exports.AuthFactorySercice = AuthFactorySercice;
