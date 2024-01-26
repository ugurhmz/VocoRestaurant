import express from 'express'
import { registerUserController, userActivationController, userLoginController } from '../controller/UserController.js'
import validate from '../middleware/validation.js'
import { loginValidation, registerValidation } from "../validations/UserValidate.js"

const router = express.Router()

router.post("/register",validate(registerValidation) ,registerUserController)
router.get("/activation/:token", userActivationController)
router.post("/login",validate(loginValidation) ,userLoginController)

export default router