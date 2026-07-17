const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  courseName: { type: String, required: true },
  certificateUrl: { type: String },
  rollNumber: { type: String }, 
  issueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Certificate', certificateSchema);