import express from 'express'
import UserRouter from './routes/user.js'
import RestaurantRouter from './routes/restaurant.js'
import OrderRouter from './routes/order.js'

const router = express.Router()


router.use("/user", UserRouter)
router.use("/restaurant", RestaurantRouter)
router.use("/order", OrderRouter)

export default router