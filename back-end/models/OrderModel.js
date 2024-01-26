import mongoose from "mongoose"

const { Schema } = mongoose

const OrderSchema = new Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
  items: [{ name: String, quantity: Number }],
  date: { type: Date, default: Date.now },
})

const OrderModel = mongoose.model("Order", OrderSchema)
export default OrderModel