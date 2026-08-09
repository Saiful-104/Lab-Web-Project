const express = require("express");
const router = express.Router();
const {
  getScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  getTopScholarships,
  getFilterOptions,
  getRecommendationsByCategory,
  getRecommendationsById,
  getAllScholarshipsAdmin,
} = require("../controllers/scholarshipController");
const { verifyJWT, verifyAdmin } = require("../middleware/auth");

// Public routes
router.get("/", getScholarships);
router.get("/filters", getFilterOptions);
router.get("/top", getTopScholarships);
router.get("/recommendations/category/:category", getRecommendationsByCategory);
router.get("/recommendations/:id", getRecommendationsById);
router.get("/:id", getScholarshipById);

// Admin routes
router.get("/admin/all", verifyJWT, verifyAdmin, getAllScholarshipsAdmin);
router.post("/", verifyJWT, verifyAdmin, createScholarship);
router.put("/:id", verifyJWT, verifyAdmin, updateScholarship);
router.delete("/:id", verifyJWT, verifyAdmin, deleteScholarship);

module.exports = router;