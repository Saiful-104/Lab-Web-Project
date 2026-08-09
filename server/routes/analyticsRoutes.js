const express = require("express");
const router = express.Router();
const { getAnalytics } = require("../controllers/analyticsController");
const { verifyJWT, verifyAdmin } = require("../middleware/auth");

router.get("/", verifyJWT, verifyAdmin, getAnalytics);

module.exports = router;