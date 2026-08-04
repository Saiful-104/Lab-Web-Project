const admin = require("firebase-admin");
const { getCollection } = require("../config/database");

const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).send({ message: "Unauthorized Access!" });
  }
  
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.tokenEmail = decoded.email;
    req.tokenName = decoded.name;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized Access!" });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const usersCollection = getCollection("users");
    const email = req.tokenEmail;
    const user = await usersCollection.findOne({ email });

    if (user?.role !== "admin") {
      return res.status(403).send({ message: "Forbidden Access - Admin only" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: "Error verifying admin status" });
  }
};

const verifyModerator = async (req, res, next) => {
  try {
    const usersCollection = getCollection("users");
    const email = req.tokenEmail;
    const user = await usersCollection.findOne({ email });

    if (user?.role !== "moderator") {
      return res.status(403).send({ message: "Forbidden Access - Moderator only" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: "Error verifying moderator status" });
  }
};

const verifyAdminOrModerator = async (req, res, next) => {
  try {
    const usersCollection = getCollection("users");
    const email = req.tokenEmail;
    const user = await usersCollection.findOne({ email });

    if (user?.role !== "admin" && user?.role !== "moderator") {
      return res.status(403).send({ message: "Forbidden Access" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: "Error verifying user status" });
  }
};

module.exports = { verifyJWT, verifyAdmin, verifyModerator, verifyAdminOrModerator };