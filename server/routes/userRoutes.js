const express = require("express");
const router = express.Router();
const {
  saveUser,
  getUserRole,
  getUserRoleByEmail,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { verifyJWT, verifyAdmin } = require("../middleware/auth");

// Public routes
router.post("/", saveUser);
router.get("/role/:email", getUserRoleByEmail);

// Protected routes
router.get("/role", verifyJWT, getUserRole);

// Admin routes
router.get("/admin/all", verifyJWT, verifyAdmin, getAllUsers);
router.patch("/admin/:id/role", verifyJWT, verifyAdmin, updateUserRole);
router.delete("/admin/:id", verifyJWT, verifyAdmin, deleteUser);

module.exports = router;