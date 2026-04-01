const User = require("../models/User");
const Admission = require("../models/Admission");
const { pipeAdmissionPdf } = require("../utils/admissionPdf");

exports.getUsers = async (req, res) => {
  const users = await User.find({}, "_id name email role");
  res.json(users);
};

exports.getAdminProfile = async (req, res) => {
  res.json({ name: "Dhruv Yadav", email: "admin@gmail.com", dp: "" });
};

exports.getAllAdmissions = async (req, res) => {
  const admissions = await Admission.find({});
  res.json(admissions);
};

exports.toggleStatus = async (req, res) => {
  const { id } = req.params;
  const { admissionStatus } = req.body;
  const update = {
    admissionStatus,
    approvedAt: admissionStatus === "Approved" ? new Date() : null,
  };

  if (admissionStatus === "Approved") {
    update.paymentStatus = "Paid";
  }

  const admission = await Admission.findByIdAndUpdate(id, update, { new: true });
  res.json({ message: `Admission ${admissionStatus}`, admission });
};

exports.downloadAdmissionPDF = async (req, res) => {
  const admission = await Admission.findById(req.params.id);

  if (!admission) {
    return res.status(404).json({ message: "Admission not found" });
  }

  pipeAdmissionPdf(res, admission, {
    institutionName: "Global Tech Institute",
    title:
      admission.admissionStatus === "Approved"
        ? "Official Admission Letter"
        : "Admission Status Report",
    subtitle: "Admin Download Copy | Global Tech Institute",
    bodyIntro:
      admission.admissionStatus === "Approved"
        ? `This certified copy confirms that ${admission.name || "the student"} has been admitted to ${admission.course || "the selected program"} at Global Tech Institute.`
        : `This report summarizes the current admission status, submitted details, and verification records for ${admission.name || "the student"}.`,
    note: "Use this summary while reviewing documents, course choice, and approval status.",
  });
};

exports.getAnalytics = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalAdmissions = await Admission.countDocuments();
  const approved = await Admission.countDocuments({ admissionStatus: "Approved" });
  const pending = await Admission.countDocuments({ admissionStatus: "Pending" });
  res.json({ totalUsers, totalAdmissions, approved, pending });
};
