import mongoose from 'mongoose'

const { Schema } = mongoose

const MenuSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String ,default: 'menu_default.png'},
})

const MenuModel = mongoose.model('Menu', MenuSchema)

export default MenuModel