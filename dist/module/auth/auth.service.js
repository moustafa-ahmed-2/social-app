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
    register = async (req, res, next) => {
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
}
exports.default = new AuthService();
