import mongoose from "mongoose"

const { Schema } = mongoose

const AddressSchema = new Schema({
  city: { type: String, required: true },
  district: { type: String, required: true },
  street: { type: String },
  location: { type: String },
})

const AddressModel = mongoose.model("Address", AddressSchema)
export default AddressModel