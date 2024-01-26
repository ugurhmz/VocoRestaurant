import RestaurantModel from '../models/RestaurantModel.js';
import AddressModel from '../models/AddressModel.js';
import MenuModel from '../models/MenuModel.js';
import httpStatus from 'http-status';

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
    } = req.body;

    // Adresler
    const addressDocs = await AddressModel.find({ _id: { $in: address } });

    // Menüler
    const menuDocs = await MenuModel.find({ _id: { $in: menus } });

    // Şubeler
    const branchDocs = await AddressModel.find({ _id: { $in: branches } });

    // Yeni restoranı oluştur
    const newRestaurant = new RestaurantModel({
      name,
      description,
      logo,
      address: addressDocs,
      locations,
      menus: menuDocs,
      types,
      branches: branchDocs,
    });

    // Veritabanına kaydet
    const savedRestaurant = await newRestaurant.save();

    return res.status(httpStatus.CREATED).json({
      message: 'Restaurant created successfully',
      restaurant: savedRestaurant,
    });
  } catch (error) {
    console.error('createRestaurantController error:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    });
  }
};
