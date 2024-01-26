import express from 'express'
import { createRestaurantController } from '../controller/RestaurantController.js'
import validate from '../middleware/validation.js'
import { createRestaurantValidation, menuValidation } from '../validations/RestaurantValidate.js'
import { createMenuController } from '../controller/MenuController.js'

const router = express.Router()

router.post('/create', validate(createRestaurantValidation), createRestaurantController)
router.post('/create-menu',validate(menuValidation) ,createMenuController)

export default router
