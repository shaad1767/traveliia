import Review from "../models/Review.js";

// ➕ Add Review
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = new Review({
      user: req.user.id,
      hotel: req.params.hotelId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

// 📥 Get Reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      hotel: req.params.hotelId,
    }).populate("user", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};