const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const dns = require("dns");

// Override DNS servers to handle MongoDB Atlas SRV record resolution issues in container environments
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config({ path: path.join(__dirname, ".env") });

// Disable Mongoose command buffering so queries fail immediately if not connected, preventing hangs
mongoose.set("bufferCommands", false);

const app = express();

// ================= MIDDLEWARE =================

// Enable robust CORS support: reflect request origin, support credentials, and set options success status
app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());

// ================= ROUTES =================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ================= DATABASE CONNECTION =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

