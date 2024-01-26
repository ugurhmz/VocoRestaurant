import mongoose from 'mongoose'
import AddressModel from './AddressModel.js'
import MenuModel from './MenuModel.js'

const { Schema } = mongoose

const RestaurantSchema = new Schema(
    {
        name: { type: String, required: true},
        description: { type: String, required: true},
        logo: { type: String, default: "restaurant_default.png"},
        address: [AddressModel.schema],
        locations: [ {type: String} ],
        menus: [MenuModel.schema],
        types: [{type: String}], // Turkish, fast food bla bla
        branches: [AddressModel.schema],
    },
    { timestamps: true }
)

const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema)

export default RestaurantModel
