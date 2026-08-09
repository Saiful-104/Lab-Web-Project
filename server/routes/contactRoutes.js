const express = require("express");
const router = express.Router();
const { submitContact, getAllContacts } = require("../controllers/contactController");
const { verifyJWT, verifyAdmin } = require("../middleware/auth");


router.post("/", submitContact);


router.get("/admin", verifyJWT, verifyAdmin, getAllContacts);

module.exports = router;