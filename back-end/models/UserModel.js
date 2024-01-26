import mongoose from "mongoose";
import AddressModel from "./AddressModel";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String,required: true,unique: true, min: 8},
    username: { type: String, required: true, min: 3, max: 75 },
    age: { type: Number, required: true, min: 4 },
    gender: { type: String },
    password: { type: String, required: true, min: 6 },
    firstName: { type: String, required: true, min: 2, max: 100 },
    lastName: { type: String, required: true, min: 2, max: 100 },
    activationToken: { type: String },
    isVerified: { type: Boolean, default: false },
    profile_img: { type: String, default: "default.png" },
    addresses: [AddressModel.schema],
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
