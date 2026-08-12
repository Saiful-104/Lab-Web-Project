const { getCollection } = require("../config/database");

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const contactCollection = getCollection("contacts");
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const contactData = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date(),
      status: "new",
      replied: false,
    };

    const result = await contactCollection.insertOne(contactData);

    res.send({
      success: true,
      message: "Your message has been received. We will contact you soon.",
      data: result,
    });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).send({
      success: false,
      message: "Error submitting contact form",
    });
  }
};

// Get all contacts (Admin)
const getAllContacts = async (req, res) => {
  try {
    const contactCollection = getCollection("contacts");

    const contacts = await contactCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.send({
      success: true,
      data: contacts,
    });
  } catch (err) {
    console.error("Get contacts error:", err);
    res.status(500).send({
      success: false,
      message: "Error fetching contacts",
    });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
};