const admin = require("../config/firebase");

const verifyJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized Access!" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.tokenEmail = decoded.email;
    req.tokenName = decoded.name || null;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized Access!" });
  }
};

module.exports = verifyJWT;