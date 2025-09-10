"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
var enum_1 = require("../../../utils/common/enum");
exports.userSchema = new mongoose_1.Schema({
    firstName: { type: String, minLength: 2, maxLength: 20, required: true, trim: true },
    lastName: { type: String, minLength: 2, maxLength: 20, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: function () {
            if (this.userAgent == enum_1.USER_AGENT.google)
                return false;
            return true;
        } },
    credentialUpdatedAt: Date,
    phoneNumber: String,
    role: {
        type: String,
        enum: enum_1.SYS_ROLE,
        default: enum_1.SYS_ROLE.user
    },
    gender: {
        type: String,
        enum: enum_1.GENDER,
        default: enum_1.GENDER.male
    },
    userAgent: {
        type: String,
        enum: enum_1.USER_AGENT,
        default: enum_1.USER_AGENT.local
    },
    otp: { type: String },
    otpExpiryAt: { type: String }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
exports.userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
}).set(function (value) {
    var _a = value.split(" "), fName = _a[0], lName = _a[1];
    this.firstName = fName;
    this.lastName = lName;
});
