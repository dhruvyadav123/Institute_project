require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const adminRoutes = require("./routes/adminRoutes"); // ✅ ADMIN ROUTES
const admissionRoutes = require("./routes/admissionRoutes");

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/admin", adminRoutes); // ✅ IMPORTANT LINE

app.get("/", (req, res) => {
  res.send("MERN Backend is Live 🚀");
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
