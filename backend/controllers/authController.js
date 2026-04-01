const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* USER SIGNUP ONLY */
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user", // 🔒 FIXED
  });

  res.json({ message: "Signup successful" });
};

/* ADMIN + USER LOGIN */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  

  /*  ADMIN LOGIN */
  if (email === process.env.ADMIN_EMAIL) {
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token, role: "admin" });
  }

  
  /*  USER LOGIN */
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
};

exports.getMe = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.json({
        name: process.env.ADMIN_NAME || "Admin",
        email: process.env.ADMIN_EMAIL || "",
        role: "admin",
      });
    }

    const user = await User.findById(req.user.id).select("_id name email role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load user profile" });
  }
};


