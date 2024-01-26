import mongoose from "mongoose"
import AddressModel from "./AddressModel.js"
import OrderModel from "./OrderModel.js"
import ReviewModel from "./ReviewModel.js"

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 75 },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 18 },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    profile_img: { type: String },
    addresses: [AddressModel.schema],
    orders: [OrderModel.schema],
    reviews: [ReviewModel.schema],
    activationToken: { type: String },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
  },
  { timestamps: true }
)

const UserModel = mongoose.model("User", UserSchema)
export default UserModel