const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/database");

// Save application
const saveApplication = async (req, res) => {
  try {
    const applicationsCollection = getCollection("applications");
    const scholarshipsCollection = getCollection("scholarships");
    const applicationData = req.body;

    // Check if application already exists
    const existingApp = await applicationsCollection.findOne({
      scholarshipId: new ObjectId(applicationData.scholarshipId),
      userEmail: applicationData.userEmail,
    });

    if (existingApp) {
      return res.send({
        success: true,
        message: "Application already exists",
        data: existingApp,
      });
    }

    // Get scholarship details
    const scholarship = await scholarshipsCollection.findOne({
      _id: new ObjectId(applicationData.scholarshipId),
    });

    if (!scholarship) {
      return res.status(404).send({
        success: false,
        message: "Scholarship not found",
      });
    }

    const application = {
      scholarshipId: new ObjectId(applicationData.scholarshipId),
      userId: applicationData.userId,
      userName: applicationData.userName,
      userEmail: applicationData.userEmail,
      universityName: applicationData.universityName,
      universityAddress: `${scholarship.universityCity || ""}, ${
        scholarship.universityCountry || ""
      }`.trim(),
      subjectCategory: scholarship.subjectCategory,
      scholarshipCategory: scholarship.scholarshipCategory || "Unknown",
      degree: applicationData.degree,
      applicationFees: applicationData.applicationFees,
      serviceCharge: applicationData.serviceCharge || 0,
      applicationStatus: "pending",
      paymentStatus: applicationData.paymentStatus || "unpaid",
      applicationDate: new Date(),
      feedback: "",
      contactNumber: "",
      address: "",
      additionalInfo: "",
      updatedAt: null,
    };

    const result = await applicationsCollection.insertOne(application);

    res.send({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Save application error:", err);
    res.status(500).send({
      success: false,
      message: "Error saving application",
    });
  }
};

// Update free application
const updateFreeApplication = async (req, res) => {
  try {
    const applicationsCollection = getCollection("applications");
    const { scholarshipId, userEmail } = req.body;

    const result = await applicationsCollection.updateOne(
      {
        scholarshipId: new ObjectId(scholarshipId),
        userEmail: userEmail,
      },
      {
        $set: {
          paymentStatus: "paid",
          applicationDate: new Date(),
        },
      }
    );

    res.send({ success: true, data: result });
  } catch (err) {
    console.error("Update free application error:", err);
    res.status(500).send({
      success: false,
      message: "Error updating application",
    });
  }
};

// Get user's applications
const getMyApplications = async (req, res) => {
  try {
    const applicationsCollection = getCollection("applications");
    const { email } = req.params;

    if (req.tokenEmail !== email) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized",
      });
    }

    const applications = await applicationsCollection
      .find({ userEmail: email })
      .sort({ applicationDate: -1 })
      .toArray();

    res.send({
      success: true,
      data: applications,
    });
  } catch (err) {
    console.error("Get my applications error:", err);
    res.status(500).send({
      success: false,
      message: "Error fetching applications",
    });
  }
};

// Get application details
const getApplicationDetails = async (req, res) => {
  try {
    const applicationsCollection = getCollection("applications");
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await applicationsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!application) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    if (application.userEmail !== req.tokenEmail) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized",
      });
    }

    res.send({
      success: true,
      data: application,
    });
  } catch (err) {
    console.error("Get application details error:", err);
    res.status(500).send({
      success: false,
      message: "Error fetching application details",
    });
  }
};

// Delete application
const deleteApplication = async (req, res) => {
  try {
    const applicationsCollection = getCollection("applications");
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await applicationsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!application) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    if (application.userEmail !== req.tokenEmail) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized",
      });
    }

    if (application.applicationStatus !== "pending") {
      return res.status(400).send({
        success: false,
        message: "Cannot delete completed application",
      });
    }

    const result = await applicationsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.send({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Delete application error:", err);
    res.status(500).send({
      success: false,
      message: "Error deleting application",
    });
  }
};

// Update application
const updateApplication = async (req, res) => {
  try {
    const applicationsCollection = getCollection("applications");
    const { id } = req.params;
    const updateData = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await applicationsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!application) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    if (application.userEmail !== req.tokenEmail) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized",
      });
    }

    if (application.applicationStatus !== "pending") {
      return res.status(400).send({
        success: false,
        message: "Cannot edit completed application",
      });
    }

    const allowedUpdates = {
      contactNumber: updateData.contactNumber || application.contactNumber,
      address: updateData.address || application.address,
      additionalInfo: updateData.additionalInfo || application.additionalInfo,
      updatedAt: new Date(),
    };

    const result = await applicationsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: allowedUpdates }
    );

    res.send({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Update application error:", err);
    res.status(500).send({
      success: false,
      message: "Error updating application",
    });
  }
};

// Get all applications (Moderator)
const getAllApplicationsModerator = async (req, res) => {
  try {
    const applicationsCollection = getCollection("applications");

    const applications = await applicationsCollection
      .find({})
      .sort({ applicationDate: -1 })
      .toArray();

    res.send({
      success: true,
      data: applications,
    });
  } catch (err) {
    console.error("Get all applications moderator error:", err);
    res.status(500).send({
      success: false,
      message: "Error fetching applications",
    });
  }
};

// Update application feedback (Moderator)
const updateApplicationFeedback = async (req, res) => {
  try {
    const applicationsCollection = getCollection("applications");
    const { id } = req.params;
    const { feedback } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid application ID",
      });
    }

    const result = await applicationsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          feedback: feedback,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    res.send({
      success: true,
      message: "Feedback updated",
      data: result,
    });
  } catch (err) {
    console.error("Update application feedback error:", err);
    res.status(500).send({
      success: false,
      message: "Error updating feedback",
    });
  }
};

// Update application status (Moderator)
const updateApplicationStatus = async (req, res) => {
  try {
    const applicationsCollection = getCollection("applications");
    const { id } = req.params;
    const { applicationStatus } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid application ID",
      });
    }

    const result = await applicationsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          applicationStatus: applicationStatus,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    res.send({
      success: true,
      message: "Status updated",
      data: result,
    });
  } catch (err) {
    console.error("Update application status error:", err);
    res.status(500).send({
      success: false,
      message: "Error updating status",
    });
  }
};


const rejectApplication = async (req, res) => {
  try {
    const applicationsCollection = getCollection("applications");
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid application ID",
      });
    }

    const result = await applicationsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          applicationStatus: "rejected",
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Application not found",
      });
    }

    res.send({
      success: true,
      message: "Application rejected",
      data: result,
    });
  } catch (err) {
    console.error("Reject application error:", err);
    res.status(500).send({
      success: false,
      message: "Error rejecting application",
    });
  }
};

module.exports = {
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
};