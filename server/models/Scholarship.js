

const ScholarshipSchema = new mongoose.Schema({
  scholarshipName: { type: String, required: true },
  universityName: { type: String, required: true },
  universityCountry: { type: String, required: true },
  universityCity: { type: String, required: true },
  universityRank: Number,
  subjectCategory: String,
  scholarshipCategory: String,
  degree: String,
  tuitionFees: Number,
  applicationFees: Number,
  serviceCharge: Number,
  scholarshipPostDate: Date,
  applicationDeadline: Date,
  avgRating: Number,
  totalReviews: Number,
  lastReviewDate: Date,

});

module.exports = ScholarshipSchema;