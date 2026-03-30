const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const { verifyAdmin } = require("../middleware/adminMiddleware");

const {
  getUsers,
  toggleStatus,
  getAllAdmissions,
  downloadAdmissionPDF,
  getAdminProfile,
  getAnalytics,
} = require("../controllers/adminController");

router.get("/users", verifyToken, verifyAdmin, getUsers);
router.put("/admissions/:id/status", verifyToken, verifyAdmin, toggleStatus);
router.get("/admissions", verifyToken, verifyAdmin, getAllAdmissions);
router.get(
  "/admissions/:id/download",
  verifyToken,
  verifyAdmin,
  downloadAdmissionPDF
);
router.get("/profile", verifyToken, verifyAdmin, getAdminProfile);
router.get("/analytics", verifyToken, verifyAdmin, getAnalytics);

module.exports = router;
