const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const {
  applyAdmission,
  getAdmissions,
  updateStatus,
  generatePDF,
  getMyAdmission,
} = require("../controllers/admissionController");

// ===== MULTER CONFIG =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ===== USER ROUTES =====
router.post(
  "/apply",
  auth,
  upload.fields([
    { name: "tenthMarksheet" },
    { name: "twelfthMarksheet" },
    { name: "idProof" },
  ]),
  applyAdmission
);
router.get("/my", auth, getMyAdmission);

// ===== ADMIN ROUTES =====
router.get("/all", auth, getAdmissions);
router.put("/:id", auth, updateStatus);

// ===== PDF ROUTE =====
router.get("/letter/:id", auth, generatePDF);

module.exports = router;
