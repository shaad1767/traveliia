import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";
import {protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Review
router.post("/:hotelId", protect, addReview);

// Get Reviews
router.get("/:hotelId", getReviews);

export default router;