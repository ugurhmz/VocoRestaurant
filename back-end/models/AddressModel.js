import mongoose from "mongoose"

const { Schema } = mongoose

const AddressSchema = new Schema(
  {
    city: { type: String},
    district: { type: String},
    street: { type: String },
    location: { type: String },
    isDefault: { type: Boolean, default: false },
  }
)

const AddressModel = mongoose.model("Address", AddressSchema)
export default AddressModel