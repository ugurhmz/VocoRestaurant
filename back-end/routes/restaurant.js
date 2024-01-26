import express from 'express'
import { createRestaurantController } from '../controller/RestaurantController.js'
import validate from '../middleware/validation.js'
import { createRestaurantValidation } from '../validations/RestaurantValidate.js'

const router = express.Router()

router.post('/create', validate(createRestaurantValidation), createRestaurantController)

export default router
