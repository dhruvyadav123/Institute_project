const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/multer");
const {
  applyAdmission,
  getMyAdmission,
  generatePDF
} = require("../controllers/admissionController");

// APPLY ADMISSION
router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "tenthMarksheet", maxCount: 1 },
    { name: "twelfthMarksheet", maxCount: 1 },
    { name: "idProof", maxCount: 1 }
  ]),
  applyAdmission
);

// GET MY ADMISSION
router.get("/my", verifyToken, getMyAdmission);

// ✅ USER PDF DOWNLOAD (FIX)
router.get(
  "/letter/:id",
  verifyToken,
  generatePDF
);

module.exports = router;
