"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const Post_service_1 = __importDefault(require("./Post.service"));
const comment_controller_1 = __importDefault(require("../Comment/comment.controller"));
const router = (0, express_1.Router)();
router.use("/:postId/comment", comment_controller_1.default);
router.post("/", (0, auth_middleware_1.isAuthenticated)(), Post_service_1.default.create);
router.patch("/:id", (0, auth_middleware_1.isAuthenticated)(), Post_service_1.default.addReaction);
router.get("/:id", Post_service_1.default.getSpecific);
router.delete("/:id", (0, auth_middleware_1.isAuthenticated)(), Post_service_1.default.deletePost);
exports.default = router;
