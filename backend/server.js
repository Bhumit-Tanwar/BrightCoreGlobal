const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

// ================= ROUTES =================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));

// ================= DATABASE CONNECTION =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });
