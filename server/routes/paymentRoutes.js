const express = require("express");
const router = express.Router();
const {
  createSession,
  handlePaymentSuccess,
} = require("../controllers/paymentController");

router.post("/create-checkout-session", createSession);
router.post("/payment-success", handlePaymentSuccess);

module.exports = router;