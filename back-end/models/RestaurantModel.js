import mongoose from 'mongoose'

const { Schema } = mongoose

const RestaurantSchema = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      logo: { type: String, default: "restaurant_default.png" },
      address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
      menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
      types: [{ type: String }],
      branches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    },
    { timestamps: true }
  )

const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema)

export default RestaurantModel
