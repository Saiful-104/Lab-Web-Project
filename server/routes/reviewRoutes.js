const express = require("express");
const router = express.Router();
const {
  createReview,
  getMyReviews,
  updateReview,
  deleteReview,
  getReviewsByScholarship,
  getAllReviews,
  deleteReviewModerator,
} = require("../controllers/reviewController");
const { verifyJWT, verifyModerator } = require("../middleware/auth");

// Public routes
router.get("/scholarship/:scholarshipId", getReviewsByScholarship);

// User routes
router.post("/", verifyJWT, createReview);
router.get("/my", verifyJWT, getMyReviews);
router.put("/:id", verifyJWT, updateReview);
router.delete("/:id", verifyJWT, deleteReview);

// Moderator routes
router.get("/moderator/all", verifyJWT, verifyModerator, getAllReviews);
router.delete("/moderator/:id", verifyJWT, verifyModerator, deleteReviewModerator);

module.exports = router;