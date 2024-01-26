import AddressModel from '../models/AddressModel.js'
import httpStatus from 'http-status'

export const createAddressController = async (req, res) => {
  try {
    const userId = req.user._id
    const { city, district, street, location, isDefault } = req.body

    if (isDefault) {
      await AddressModel.updateMany({ user: userId }, { $set: { isDefault: false } })
    }

    const newAddress = new AddressModel({
      city,
      district,
      street,
      location,
      isDefault,
      user: userId,
    })

    const savedAddress = await newAddress.save()

    return res.status(httpStatus.CREATED).json({
      message: 'Address created successfully',
      address: savedAddress,
    })
  } catch (error) {
    console.error('createAddressController error:', error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    })
  }
}

export default createAddressController
