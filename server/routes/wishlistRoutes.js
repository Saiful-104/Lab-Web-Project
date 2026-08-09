const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");
const { verifyJWT } = require("../middleware/auth");

router.post("/", addToWishlist);
router.get("/:email", verifyJWT, getWishlist);
router.delete("/:email/:scholarshipId", verifyJWT, removeFromWishlist);

module.exports = router;