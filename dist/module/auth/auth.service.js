"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("./../../DB/model/user/user.repository");
const error_1 = require("../../utils/error");
const factory_1 = require("./factory");
const auth_provider_1 = require("./provider/auth.provider");
const hash_1 = require("../../utils/hash");
const token_1 = require("../../utils/token");
class AuthService {
    constructor() { }
    userRepository = new user_repository_1.UserRepository();
    authFactoryService = new factory_1.AuthFactorySercice();
    register = async (req, res) => {
        const registerDTO = req.body;
        const userExist = await this.userRepository.exist({
            email: registerDTO.email
        });
        if (userExist) {
            throw new error_1.ConflictException("user Already Exist");
        }
        const user = await this.authFactoryService.createUser(registerDTO);
        const createUser = await this.userRepository.create(user);
        delete user.password;
        delete user.otp;
        delete user.otpExpiryAt;
        return res.status(201).json({
            message: "user created successfully",
            success: true,
            data: createUser
        });
    };
    verifyAccount = async (req, res) => {
        const verifyAccountDTO = req.body;
        await auth_provider_1.authProvider.checkOTP(verifyAccountDTO);
        await this.userRepository.update({ email: verifyAccountDTO.email }, { isVerified: true,
            $unset: { otp: "", otpExpiryAt: " " }
        });
        return res.status(204).json({ message: "done", success: true });
    };
    login = async (req, res) => {
        const loginDTO = req.body;
        const userExist = await this.userRepository.exist({ email: loginDTO.email });
        if (!userExist) {
            throw new error_1.ForBiddenException("invalid credential");
        }
        if (!loginDTO.password || !userExist.password) {
            throw new error_1.ForBiddenException("invalid credential");
        }
        const isMatch = await (0, hash_1.compareHash)(loginDTO.password, userExist.password);
        if (!isMatch) {
            throw new error_1.ForBiddenException("invalid credential");
        }
        const accessToken = (0, token_1.generateToken)({
            payload: { _id: userExist._id.toString(), role: userExist.role },
            options: { expiresIn: "1d" },
        });
        return res.status(200).json({ message: "login successfully", success: true, data: accessToken });
    };
    updatePassword = async (req, res) => {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            throw new error_1.ForBiddenException("Please provide current and new password");
        }
        if (!req.user || !req.user._id) {
            throw new error_1.ForBiddenException("User not authenticated");
        }
        const userExist = await this.userRepository.findOne({ _id: req.user._id });
        if (!userExist)
            throw new error_1.ForBiddenException("User not found");
        const isMatch = await (0, hash_1.compareHash)(currentPassword, userExist.password);
        if (!isMatch)
            throw new error_1.ForBiddenException("Current password is incorrect");
        const hashedPassword = await (0, hash_1.hashPassword)(newPassword);
        await this.userRepository.updateById(req.user._id, { password: hashedPassword });
        return res.status(200).json({
            message: "Password updated successfully",
            success: true
        });
    };
    updateEmail = async (req, res) => {
        const { newEmail } = req.body;
        if (!req.user?._id)
            throw new error_1.ForBiddenException("User not authenticated");
        const userExist = await this.userRepository.exist({ _id: req.user._id });
        if (!userExist)
            throw new error_1.NotFoundException("User not found");
        const emailTaken = await this.userRepository.exist({ email: newEmail });
        if (emailTaken)
            throw new error_1.ConflictException("Email already in use");
        await this.userRepository.update({ _id: req.user._id }, { password: hash_1.hashPassword });
        return res.status(200).json({ message: "Email updated successfully", success: true });
    };
}
exports.default = new AuthService();
