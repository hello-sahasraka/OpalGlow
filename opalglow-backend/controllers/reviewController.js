import Review from "../models/review.js";

export function createReview(req, res) {
  if (req.user == null) {
    res.status(403).json({
      message: "Please login before creating a review!...",
    });
    return;
  }

  const review = new Review({
    userId: req.user._id,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  review
    .save()
    .then(() => {
      res.status(201).json({
        message: "Review created successfully!",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Failed to create review!",
      });
    });
}

export function getReviews(req, res) {
  Review.find().populate("userId").then((reviews) => {
      res.json(reviews);
    })
    .catch(() => {
      res.status(500).json({
        message: "Failed to get reviews!",
      });
    });
}
