const { getCollection } = require("../config/database");


const getAnalytics = async (req, res) => {
  try {
    const usersCollection = getCollection("users");
    const scholarshipsCollection = getCollection("scholarships");
    const applicationsCollection = getCollection("applications");

    const totalUsers = await usersCollection.countDocuments();
    const totalScholarShips = await scholarshipsCollection.countDocuments();

    const paidApplications = await applicationsCollection
      .find({ paymentStatus: "paid" })
      .toArray();

    const totalFees = paidApplications.reduce((sum, app) => {
      return sum + (app.applicationFees || 0);
    }, 0);

    const appsPerUniversity = await applicationsCollection
      .aggregate([
        { $group: { _id: "$universityName", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ])
      .toArray();

    const appsPerCategory = await applicationsCollection
      .aggregate([
        { $group: { _id: "$scholarshipCategory", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray();

    res.send({
      success: true,
      data: {
        totalUsers,
        totalScholarShips,
        totalFees,
        appsPerUniversity,
        appsPerCategory,
      },
    });
  } catch (err) {
    console.error("Get analytics error:", err);
    res.status(500).send({
      success: false,
      message: "Error fetching analytics",
    });
  }
};

module.exports = {
  getAnalytics,
};