import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import appRoutes from './AppRoutes.js'
import connectDB from './database/db.js'

// MongoDB
connectDB()

const app = express()
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// BASE_URL
app.use('/vocov1/api', appRoutes)



app.listen(process.env.PORT || 7500, () => {
    console.log(`Listening: ${process.env.PORT}`)
})