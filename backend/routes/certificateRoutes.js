const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const { protect } = require('../middleware/authMiddleware');

// 1. VERIFY CERTIFICATE (Public API)
router.get('/verify/:id', async (req, res) => {
  try {
    const certificateId = req.params.id.trim().toUpperCase();
    const certificate = await Certificate.findOne({ certificateId });

    if (certificate) {
      res.json(certificate);
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 2. GET ALL CERTIFICATES
router.get('/', protect, async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// 3. UPLOAD/ADD CERTIFICATE (Protected API)
router.post('/add', protect, async (req, res) => {
  const { certificateId, rollNumber, studentName, studentEmail, courseName, issueDate, certificateUrl } = req.body;

  try {
    const existingCert = await Certificate.findOne({ certificateId: certificateId.toUpperCase() });
    if (existingCert) {
      return res.status(400).json({ message: 'Certificate ID already exists' });
    }

    const certificate = await Certificate.create({
      certificateId: certificateId.toUpperCase(),
      rollNumber,
      studentName,
      studentEmail,
      courseName,
      issueDate,
      certificateUrl // Cloudinary URL
    });

    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Error adding certificate', error: error.message });
  }
});

// 4. Delete Certificate
router.delete('/:id', protect, async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certificate deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// 5. Update Certificate
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedCert = await Certificate.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedCert);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;