import express from 'express'
import createOrderController from '../controller/OrderController.js'
import {checkAuthenticated} from '../middleware/checkUserLoggedIn.js'

const router = express.Router()

router.post('/create-order', checkAuthenticated, createOrderController)
export default router
