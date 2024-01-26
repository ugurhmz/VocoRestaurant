import mongoose from "mongoose"
import AddressModel from "./AddressModel.js"

const { Schema } = mongoose

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: [
      {
        menu: {
          type: Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    addresses: {
      type: [AddressModel.schema],
      required: true,
    },
    comment: { type: String, default: "" },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const OrderModel = mongoose.model("Order", OrderSchema)
export default OrderModel
