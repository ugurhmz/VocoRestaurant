import httpStatus from 'http-status'
import RestaurantModel from '../models/RestaurantModel.js'

// Create Restaurant Controller
export const createRestaurantController = async (req, res) => {
  try {
    const {
      name,
      description,
      logo = 'restaurant_default.png',
      address,
      menus = [],
      types = [],
      branches = [],
    } = req.body

    if (!name || !description || !address) {
      return res.status(httpStatus[400]).json({ error: 'Name, description, and address are required fields.' })
    }

    const newRestaurant = new RestaurantModel({
      name,
      description,
      logo,
      address,
      menus,
      types,
      branches,
    })

    
    const savedRestaurant = await newRestaurant.save()

    res.status(httpStatus.CREATED).json(savedRestaurant)
  } catch (error) {
    console.error('Error in createRestaurantController:', error.message)
    res.status(httpStatus[500]).json({ error: 'Internal Server Error' })
  }
}
