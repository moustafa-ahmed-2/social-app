"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("./../../DB/model/user/user.repository");
const error_1 = require("../../utils/error");
const factory_1 = require("./factory");
class AuthService {
    constructor() { }
    UserRepository = new user_repository_1.UserRepository();
    authFactoryService = new factory_1.AuthFactorySercice();
    register = async (req, res, next) => {
        const registerDTO = req.body;
        const userExist = await this.UserRepository.exist({
            email: registerDTO.email
        });
        if (userExist) {
            throw new error_1.ConflictException("user Already Exist");
        }
        const user = this.authFactoryService.register(registerDTO);
        const createUser = await this.UserRepository.create(user);
        return res.status(201).json({
            message: "user created successfully",
            success: true,
            data: createUser
        });
    };
}
exports.default = new AuthService();
