const Admission = require("../models/Admission");
const PDFDocument = require("pdfkit");

/* APPLY ADMISSION */
exports.applyAdmission = async (req, res) => {
  try {
    const admission = await Admission.create({
      ...req.body,
      email: req.user.email, // use logged in user's email
      documents: {
        tenthMarksheet: req.files?.tenthMarksheet?.[0]?.filename,
        twelfthMarksheet: req.files?.twelfthMarksheet?.[0]?.filename,
        idProof: req.files?.idProof?.[0]?.filename,
      },
      admissionStatus: "Pending",
      paymentStatus: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Admission form submitted",
      admission,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Admission failed" });
  }
};

/* GET ALL ADMISSIONS (ADMIN) */
exports.getAdmissions = async (req, res) => {
  const admissions = await Admission.find().sort({ createdAt: -1 });
  res.json(admissions);
};

/* UPDATE ADMISSION STATUS (ADMIN) */
exports.updateStatus = async (req, res) => {
  const admission = await Admission.findByIdAndUpdate(
    req.params.id,
    {
      admissionStatus: req.body.status,
      paymentStatus: "Paid",
      approvedAt: new Date(),
    },
    { new: true }
  );

  res.json({ message: "Admission updated", admission });
};

/* GENERATE PDF */
exports.generatePDF = async (req, res) => {
  const admission = await Admission.findById(req.params.id);

  if (!admission || admission.admissionStatus !== "Approved") {
    return res.status(400).json({ msg: "Admission not approved" });
  }

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=admission_${admission.name}.pdf`
  );

  doc.pipe(res);
  doc.fontSize(18).text("OFFICIAL ADMISSION LETTER", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Name: ${admission.name}`);
  doc.text(`Email: ${admission.email}`);
  doc.text(`Course: ${admission.course}`);
  doc.text(`Status: ${admission.admissionStatus}`);
  doc.text(`Date: ${new Date().toDateString()}`);
  doc.moveDown();
  doc.text("Congratulations! Your admission has been approved.");
  doc.moveDown();
  doc.text("Authorized Signatory");
  doc.text("Admin Office");
  doc.end();
};

/* GET MY ADMISSION */
exports.getMyAdmission = async (req, res) => {
  try {
    const admission = await Admission.findOne({ email: req.user.email });
    if (!admission)
      return res.status(404).json({ message: "Admission not found" });

    res.json(admission);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
