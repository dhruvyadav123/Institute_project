require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const adminRoutes = require("./routes/adminRoutes"); // ✅ ADMIN ROUTES
const admissionRoutes = require("./routes/admissionRoutes");

const app = express();

const normalizeOrigin = (origin = "") => origin.trim().replace(/\/$/, "");

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174"
].map(normalizeOrigin);

const allowedOrigins = new Set([
  ...defaultAllowedOrigins,
  ...[process.env.CORS_ORIGINS, process.env.FRONTEND_URL]
    .filter(Boolean)
    .flatMap((value) => value.split(","))
    .map(normalizeOrigin)
    .filter(Boolean)
]);

const previewHostSuffixes = [".vercel.app", ".netlify.app", ".onrender.com"];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  const normalizedOrigin = normalizeOrigin(origin);

  if (allowedOrigins.has(normalizedOrigin)) {
    return true;
  }

  try {
    const { hostname, protocol } = new URL(normalizedOrigin);
    return (
      protocol === "https:" &&
      previewHostSuffixes.some((suffix) => hostname.endsWith(suffix))
    );
  } catch {
    return false;
  }
};

app.use(cors({
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
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
