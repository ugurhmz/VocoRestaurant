import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    date: { type: Date, default: Date.now },
  }, 
  { timestamps: true }
)

const ReviewModel = mongoose.model('Review', ReviewSchema)
export default ReviewModel
