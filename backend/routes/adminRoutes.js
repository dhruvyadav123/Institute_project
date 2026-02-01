const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const { verifyAdmin } = require("../middleware/adminMiddleware");

// Controllers
const {
  getUsers,
  toggleStatus,
  getAllAdmissions,
  downloadAdmissionPDF,
  getAdminProfile,
  getAnalytics
} = require("../controllers/adminController");

// ===== Users =====
router.get("/users", verifyToken, verifyAdmin, getUsers);
router.put("/admissions/:id/status", verifyToken, verifyAdmin, toggleStatus);

// ===== Admissions =====
router.get("/admissions", verifyToken, verifyAdmin, getAllAdmissions);
router.get("/admissions/:id/download", verifyToken, verifyAdmin, downloadAdmissionPDF);

// ===== Admin Profile =====
router.get("/profile", verifyToken, verifyAdmin, getAdminProfile);

// ===== Analytics / Stats =====
router.get("/analytics", verifyToken, verifyAdmin, getAnalytics);

module.exports = router;
