require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
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
app.use("/api/admission", admissionRoutes); // 🔥 VERY IMPORTANT

app.listen(5000, () =>
  console.log("Server running on port 5000")
);
