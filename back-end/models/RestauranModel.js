import mongoose from 'mongoose'
import AddressModel from './AddressModel'
import MenuModel from './MenuModel'

const { Schema } = mongoose

const RestaurantSchema = new Schema(
    {
        name: { type: String, required: true},
        description: { type: String},
        logo: { type: String},
        address: [AddressModel.schema],
        locations: [ {type: String} ],
        menus: [MenuModel.schema],
        types: [{type: String}] //Turkish, fast food bla bla
    },
    { timestamps: true }
)

const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema)

export default RestaurantModel