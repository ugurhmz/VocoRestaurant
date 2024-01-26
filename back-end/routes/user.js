import express from 'express'
import { registerUserController } from '../controller/UserController'
import validate from '../middleware/validation.js'
import { registerValidation } from "../validations/UserValidate.js";

const router = express.Router()

router.post("/register",validate(registerValidation) ,registerUserController)

export default router;