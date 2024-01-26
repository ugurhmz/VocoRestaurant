import express from 'express'
import { createRestaurantController, findRestaurantsBySearchController} from '../controller/RestaurantController.js'
import validate from '../middleware/validation.js'
import {  menuValidation } from '../validations/RestaurantValidate.js'
import { createMenuController } from '../controller/MenuController.js'

const router = express.Router()

router.post('/create',createRestaurantController)
router.post('/create-menu',validate(menuValidation) ,createMenuController)
router.get('/get-restaurant', findRestaurantsBySearchController)

export default router
