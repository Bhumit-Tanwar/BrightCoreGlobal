const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { protect } = require('../middleware/authMiddleware');

// 1. Get All Students (Table mein data dikhane ke liye)
router.get('/', protect, async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// 2. Add New Student (Ye API 404 de rahi thi)
router.post('/add', protect, async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {

    if(err.code === 11000) {
      return res.status(400).json({message: "Roll Number or Enrollment Number is already exists!"})
    }
  
    res.status(400).json({ message: 'Error adding student', error: err.message });
  }
});

router.get('/:identifier', protect, async (req, res) => {
  try {
    const identifier = req.params.identifier.toUpperCase();
    
    const student = await Student.findOne({ 
      $or: [
        { rollNumber: identifier }, 
        { enrollmentNumber: identifier }
      ] 
    });

    if (student) res.json(student);
    else res.status(404).json({ message: 'Student not found' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// 4. Delete Student
router.delete('/:id', protect, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;