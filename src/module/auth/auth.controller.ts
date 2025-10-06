import { registerSchema } from './auth.validation';

import { Router } from "express";
import authService from "./auth.service";
import { isValid } from "../../middleware/validation.middleware";
import * as authValidation from "./auth.validation"; 



const router = Router();

// router.post("/register" ,   isValid(authValidation.registerSchema) ,   authService.register )
// router.post("/verify-acount" ,   authService.verifyAccount )
// router.post("/login" ,   authService.login )





router.post("/register", isValid(authValidation.registerSchema), (req, res) => authService.register(req, res ));
router.post("/verify-account", (req, res) => authService.verifyAccount(req, res));
router.post("/login", (req, res) => authService.login(req, res));
router.post("/update-password", (req, res) => authService.updatePassword(req, res));
router.post("/update-email", (req, res) => authService.updateEmail(req, res));










export default router;

