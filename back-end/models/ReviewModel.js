import mongoose from "mongoose"

const { Schema } = mongoose

const ReviewSchema = new Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
  comment: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  date: { type: Date, default: Date.now },
})

const ReviewModel = mongoose.model("Review", ReviewSchema)
export default ReviewModel