const express = require('express');
const router = express.Router(); // MISTAKE FIXED: yahan Router() aayega
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Login Route
router.post('/login', async (req, res) => {
  // LOG 1: Frontend ne kya data bheja?
  console.log("👉 1. Request Body:", req.body); 

  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    // LOG 2: Kya DB mein admin@brightcore.com mila?
    console.log("👉 2. User DB se mila?:", user ? user.email : "Nahi mila null aaya");

    if (user && (await bcrypt.compare(password, user.password))) {
      // LOG 3: Match success!
      console.log("👉 3. Password Match Successful!");

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token, email: user.email, role: user.role });
    } else {
      // LOG 4: Match fail
      console.log("👉 4. Failed: Ya toh user nahi mila ya password galat hai");
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error("👉 5. Server Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;