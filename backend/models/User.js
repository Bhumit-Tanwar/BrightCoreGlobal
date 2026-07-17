const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'superadmin' }
});

// Password hash karne ke liye save hone se pehle (Updated for Mongoose 7/8)
userSchema.pre('save', async function () {
  // Agar password modify nahi hua hai toh aage badh jao
  if (!this.isModified('password')) return;
  
  // Password ko hash karo
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);