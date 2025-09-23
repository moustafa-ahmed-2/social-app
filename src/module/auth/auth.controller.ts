import { registerSchema } from './auth.validation';

import { Router } from "express";
import authService from "./auth.service";
import { isValid } from "../../middleware/validation.middleware";
import * as authValidation from "./auth.validation"; 



const router = Router();

router.post("/register" ,   isValid(authValidation.registerSchema) ,   authService.register )
router.post("/verify-acount" ,   authService.verifyAccount )





export default router;

