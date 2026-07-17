const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Bcrypt yahan se hata diya hai kyunki model khud hash karega
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    console.log('MongoDB Connected');

    // 1. DELETE OLD ADMIN FIRST
    await User.deleteOne({
      email: 'admin@brightcore.com'
    });

    // 2. CREATE NEW ADMIN (Bina manual hash kiye)
    await User.create({
      email: 'admin@brightcore.com',
      password: 'Br1ghtC0re@2026#Admin$', // Plain text password!
      role: 'superadmin'
    });

    console.log('✅ Super Admin Seeded Successfully (Single Hashed)!');

    process.exit();

  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });