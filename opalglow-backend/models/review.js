import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  comment: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("review", reviewSchema);

export default Review;
