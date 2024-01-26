import express from 'express'
import UserRouter from './routes/user.js'
import RestaurantRouter from './routes/restaurant.js'

const router = express.Router()


router.use("/user", UserRouter)
router.use("/restaurant", RestaurantRouter)

export default router