const User = require("../models/User");
const Admission = require("../models/Admission");
const fs = require("fs");
const path = require("path");

// ===== Users =====
exports.getUsers = async (req, res) => {
  const users = await User.find({}, "_id name email role");
  res.json(users);
};

// ===== Admin Profile =====
exports.getAdminProfile = async (req, res) => {
  // sample admin
  res.json({ name: "Dhruv Yadav", email: "admin@gmail.com", dp: "" });
};

// ===== Admissions =====
exports.getAllAdmissions = async (req, res) => {
  const admissions = await Admission.find({});
  res.json(admissions);
};

// ===== Toggle Status =====
exports.toggleStatus = async (req, res) => {
  const { id } = req.params;
  const { admissionStatus } = req.body;
  const admission = await Admission.findByIdAndUpdate(id, { admissionStatus }, { new: true });
  res.json({ message: `Admission ${admissionStatus}`, admission });
};

// ===== Download PDF =====
exports.downloadAdmissionPDF = async (req, res) => {
  const admission = await Admission.findById(req.params.id);

  if (!admission) {
    return res.status(404).json({ message: "Admission not found" });
  }

  const filePath = path.join(
    __dirname,
    `../uploads/admission_${admission._id}.pdf`
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "PDF not generated yet" });
  }

  res.download(filePath);
};


// ===== Analytics / Stats =====
exports.getAnalytics = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalAdmissions = await Admission.countDocuments();
  const approved = await Admission.countDocuments({ admissionStatus: "Approved" });
  const pending = await Admission.countDocuments({ admissionStatus: "Pending" });
  res.json({ totalUsers, totalAdmissions, approved, pending });
};
