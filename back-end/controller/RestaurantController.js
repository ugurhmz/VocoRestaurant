import httpStatus from 'http-status';
import RestaurantModel from '../models/RestaurantModel.js';
import haversine from 'haversine'
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

export const findRestaurantsBySearchController = async (req, res) => {
  try {
    const { searchQ } = req.query;

    if (!searchQ) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Search query is required.' });
    }

    const filter = { description: { $regex: new RegExp(searchQ, 'i') } };

    const results = await RestaurantModel.find(filter).populate({
      path: 'address',
      select: '-createdAt -updatedAt -__v',
    });

    if (results.length === 0) {
      return res.status(httpStatus.OK).json({ message: 'No results found.' });
    }

    const start = {
      latitude: 39.93,
      longitude: 32.85,
    };

    const distances = [];

    for (const result of results) {
      const end = {
        latitude: result.address.coordinates.coordinates[0],
        longitude: result.address.coordinates.coordinates[1],
      };

      const distanceInMeters = haversine(start, end, { unit: 'meter' });
      const distanceInKilometers = distanceInMeters / 1000;

      distances.push({
        restaurant: result,
        distance: distanceInKilometers.toFixed(3),
      });
    }
    //console.log(distances)
    const filteredResults = distances.filter((item) => item.distance <= 1200).slice(0, 5);

    res.status(httpStatus.OK).json(filteredResults);
  } catch (error) {
    console.error('Error in findRestaurantsBySearchController:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};
