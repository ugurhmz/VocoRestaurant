import mongoose from 'mongoose'

const { Schema } = mongoose

const RestaurantSchema = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      logo: { type: String, default: "restaurant_default.png" },
      address: { type: mongoose.Schema.Types.ObjectId, ref: 'AddressModel', required: true },
      menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuModel' }],
      types: [{ type: String }],
      branches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddressModel' }],
    },
    { timestamps: true }
  )

const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema)

export default RestaurantModel
