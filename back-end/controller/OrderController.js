import OrderModel from '../models/OrderModel.js'
import AddressModel from '../models/AddressModel.js'
import httpStatus from 'http-status'

export const createOrderController = async (req, res) => {
  try {
    const userId = req.user._id

    const {
      restaurantId,
      items,
      addressIds,
      comment,
      rating,
    } = req.body

    if (!addressIds || addressIds.length === 0) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: 'Address is required',
      })
    }

    let selectedAddress = await AddressModel.findOne({ _id: { $in: addressIds }, isDefault: true })

    if (!selectedAddress) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: 'Please select your current address from the My addresses section!',
      })
    }

    const newOrder = new OrderModel({
      user: userId,
      restaurant: restaurantId,
      items,
      addresses: [selectedAddress],
      comment,
      rating,
    })

    const savedOrder = await newOrder.save()

    return res.status(httpStatus.CREATED).json({
      message: 'Order created successfully',
      order: savedOrder,
    })
  } catch (error) {
    console.error('createOrderController error:', error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    })
  }
}

export default createOrderController
