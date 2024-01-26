import RestaurantModel from '../models/RestaurantModel.js'
import httpStatus from 'http-status'

// CREATE Restaurant
export const createRestaurantController = async (req, res) => {
  try {
    const {
      name,
      description,
      logo,
      address = [],
      locations,
      menus = [],
      types,
      branches = [],
    } = req.body

    const newRestaurant = new RestaurantModel({
      name,
      description,
      logo,
      address,
      locations,
      menus,
      types,
      branches,
    })

    const savedRestaurant = await newRestaurant.save()

    return res.status(httpStatus.CREATED).json({
      message: 'Restaurant created successfully',
      restaurant: savedRestaurant,
    })
  } catch (error) {
    console.error('createRestaurantController error:', error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    })
  }
}
