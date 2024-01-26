import MenuModel from '../models/MenuModel.js'
import httpStatus from 'http-status'

export const createMenuController = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const newMenu = new MenuModel({
      name,
      price,
      description,
      image
    });

    const savedMenu = await newMenu.save();

    return res.status(httpStatus.CREATED).json({
      message: 'Menu created successfully',
      menu: savedMenu,
    });
  } catch (error) {
    console.error('createMenuController error:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    });
  }
};
