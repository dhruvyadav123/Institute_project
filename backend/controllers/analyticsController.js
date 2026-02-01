// controllers/analyticsController.js
const User = require("../models/User");

exports.getAnalytics = async (req, res) => {
  res.json({
    total: await User.countDocuments(),
    active: await User.countDocuments({ status: "active" }),
    inactive: await User.countDocuments({ status: "inactive" }),
    admins: await User.countDocuments({ role: "admin" })
  });
};
