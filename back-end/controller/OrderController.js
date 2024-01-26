import OrderModel from '../models/OrderModel.js'
import httpStatus from 'http-status'

export const createOrderController = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("order use", userId)
    console.log("req.body", req.body)
    const {
      restaurantId,
      items,
      addressId,
      comment,
      rating,
    } = req.body

    // new order
    const newOrder = new OrderModel({
      user: userId,
      restaurant: restaurantId,
      items,
      addresses: [addressId],
      comment,
      rating,
    })

    const savedOrder = await newOrder.save();

    return res.status(httpStatus.CREATED).json({
      message: 'Order created successfully',
      order: savedOrder,
    })
  } catch (error) {
    console.error('createOrderController error:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    })
  }
}

export default createOrderController
