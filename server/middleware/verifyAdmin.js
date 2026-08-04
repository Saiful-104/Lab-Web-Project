const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.tokenEmail });
    if (user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyAdmin;