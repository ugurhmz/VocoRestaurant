import httpStatus from 'http-status';
import RestaurantModel from '../models/RestaurantModel.js';

// Create Restaurant Controller
export const createRestaurantController = async (req, res) => {
  try {
    const { name, description, logo = 'restaurant_default.png', address, menus = [], types = [], branches = [] } = req.body;

    if (!name || !description || !address) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Name, description, and address are required fields.' });
    }

    const newRestaurant = new RestaurantModel({
      name,
      description,
      logo,
      address,
      menus,
      types,
      branches,
    });

    const savedRestaurant = await newRestaurant.save();

    res.status(httpStatus.CREATED).json(savedRestaurant);
  } catch (error) {
    console.error('Error in createRestaurantController:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

// ?searchQ=kebap&latitude=39.93&longitude=32.85

// Find Restaurants by Search Query Controller
export const findRestaurantsBySearchController = async (req, res) => {
  try {
    const { searchQ } = req.query

    if (!searchQ) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Search query is required.' })
    }

    const filter = { description: { $regex: new RegExp(searchQ, 'i') } }

    const result = await RestaurantModel.find(filter)

    if (result.length === 0) {
      return res.status(httpStatus.OK).json({ message: 'No results found.' })
    }

    res.status(httpStatus.OK).json(result)
  } catch (error) {
    console.error('Error in findRestaurantsBySearchController:', error.message)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
  }
}