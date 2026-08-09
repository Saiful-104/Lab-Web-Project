const express = require("express");
const router = express.Router();
const {
  saveApplication,
  updateFreeApplication,
  getMyApplications,
  getApplicationDetails,
  deleteApplication,
  updateApplication,
  getAllApplicationsModerator,
  updateApplicationFeedback,
  updateApplicationStatus,
  rejectApplication,
} = require("../controllers/applicationController");
const { verifyJWT, verifyModerator } = require("../middleware/auth");

// User routes
router.post("/save", verifyJWT, saveApplication);
router.post("/update-free", verifyJWT, updateFreeApplication);
router.get("/my/:email", verifyJWT, getMyApplications);
router.get("/details/:id", verifyJWT, getApplicationDetails);
router.delete("/:id", verifyJWT, deleteApplication);
router.put("/:id", verifyJWT, updateApplication);

// Moderator routes
router.get("/moderator/all", verifyJWT, verifyModerator, getAllApplicationsModerator);
router.put("/moderator/:id/feedback", verifyJWT, verifyModerator, updateApplicationFeedback);
router.put("/moderator/:id/status", verifyJWT, verifyModerator, updateApplicationStatus);
router.put("/moderator/:id/reject", verifyJWT, verifyModerator, rejectApplication);

module.exports = router;