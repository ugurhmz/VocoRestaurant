import mongoose from "mongoose"

const { Schema } = mongoose

const AddressSchema = new Schema(
  {
    city: { type: String, required: true },
    district: { type: String, required: true },
    openAddress: { type: String, required: true },
  },
  { _id: false }
);

const AddressModel = mongoose.model("Address", AddressSchema)
export default AddressModel
