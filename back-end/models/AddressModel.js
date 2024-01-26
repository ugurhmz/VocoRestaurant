import mongoose from 'mongoose'

const { Schema } = mongoose

const AddressSchema = new Schema(
  {
    city: { type: String },
    district: { type: String },
    street: { type: String },
    location: { type: String },
    isDefault: { type: Boolean, default: false },
    coordinates: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [32.8597, 39.9334], // [longitude, latitude]
      },
    },
  },
  { timestamps: true }
)

AddressSchema.pre('save', async function (next) {
  if (this.isDefault) {
    await mongoose.model('Address').updateMany(
      { _id: { $ne: this._id } },
      { $set: { isDefault: false } }
    )
  }
  next()
})

const AddressModel = mongoose.model('Address', AddressSchema)
export default AddressModel
