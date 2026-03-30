const PDFDocument = require("pdfkit");

const COLORS = {
  page: "#eef4ff",
  panel: "#ffffff",
  navy: "#0f172a",
  teal: "#0f766e",
  cyan: "#0891b2",
  pink: "#ec4899",
  amber: "#f59e0b",
  emerald: "#16a34a",
  rose: "#e11d48",
  slate: "#334155",
  muted: "#64748b",
  light: "#f8fafc",
  border: "#dbe5f1",
};

const STATUS_THEME = {
  Approved: { fill: "#dcfce7", text: "#166534", stamp: "#16a34a" },
  Pending: { fill: "#fef3c7", text: "#a16207", stamp: "#f59e0b" },
  Rejected: { fill: "#ffe4e6", text: "#be123c", stamp: "#e11d48" },
};

const formatDate = (value) => {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const sanitizeFilename = (value) =>
  String(value || "admission_record")
    .trim()
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const trimValue = (value, maxLength = 34) => {
  const text = String(value || "N/A");

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 3)}...`;
};

const drawInfoCard = (doc, x, y, width, height, label, value, accent) => {
  doc.roundedRect(x, y, width, height, 18).fill("#f8fbff");
  doc.roundedRect(x, y, width, 6, 18).fill(accent);

  doc
    .fillColor(COLORS.muted)
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(label.toUpperCase(), x + 14, y + 14, {
      width: width - 28,
    });

  doc
    .fillColor(COLORS.navy)
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(value || "N/A", x + 14, y + 31, {
      width: width - 28,
      lineGap: 2,
    });
};

const drawDetailCard = (doc, x, y, width, label, value, accent) => {
  doc.roundedRect(x, y, width, 64, 16).fill(COLORS.light);
  doc.roundedRect(x, y, 5, 64, 16).fill(accent);

  doc
    .fillColor(COLORS.muted)
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(label.toUpperCase(), x + 16, y + 12, {
      width: width - 28,
    });

  doc
    .fillColor(COLORS.navy)
    .font("Helvetica-Bold")
    .fontSize(11.5)
    .text(value || "N/A", x + 16, y + 28, {
      width: width - 28,
      lineGap: 2,
    });
};

const drawDocumentChip = (doc, x, y, width, title, value, accent) => {
  doc.roundedRect(x, y, width, 54, 16).fill(COLORS.light);

  doc
    .fillColor(accent)
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(title.toUpperCase(), x + 12, y + 11, { width: width - 24 });

  doc
    .fillColor(COLORS.slate)
    .font("Helvetica")
    .fontSize(10)
    .text(trimValue(value || "Not uploaded", 24), x + 12, y + 26, {
      width: width - 24,
    });
};

const drawStamp = (doc, x, y, text, color) => {
  doc.save();
  doc.circle(x, y, 38).lineWidth(3).strokeColor(color).stroke();
  doc.circle(x, y, 31).lineWidth(1).strokeColor(color).stroke();
  doc.rotate(-18, { origin: [x, y] });
  doc
    .fillColor(color)
    .font("Helvetica-Bold")
    .fontSize(14)
    .text(text, x - 42, y - 7, {
      width: 84,
      align: "center",
    });
  doc.restore();
};

const pipeAdmissionPdf = (res, admission, options = {}) => {
  const filename =
    options.filename ||
    `${sanitizeFilename(admission.name || admission._id)}_admission.pdf`;
  const institutionName = options.institutionName || "Global Tech Institute";
  const title = options.title || "Official Admission Letter";
  const subtitle =
    options.subtitle || "Admissions Office | Accredited Academic Institution";
  const status = admission.admissionStatus || "Pending";
  const documents = admission.documents || {};
  const statusTheme = STATUS_THEME[status] || STATUS_THEME.Pending;
  const referenceNumber = `GTI-ADM-${String(admission._id || "").slice(-6).toUpperCase()}`;
  const issueDate = formatDate(admission.approvedAt || admission.createdAt);
  const openingText = options.bodyIntro
    || `Dear ${admission.name || "Student"}, we are pleased to confirm your admission for the ${admission.course || "selected program"} program at ${institutionName}.`;
  const noteText =
    options.note ||
    "Please keep this letter safe and present it during document verification, onboarding, and fee submission.";
  const messageHeading =
    options.showApprovalMessage || status === "Approved"
      ? `Congratulations, ${admission.name || "Student"}!`
      : `${admission.name || "Student"} Admission Summary`;

  const doc = new PDFDocument({
    size: "A4",
    margin: 0,
  });

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const panelX = 26;
  const panelY = 24;
  const panelWidth = pageWidth - 52;
  const panelHeight = pageHeight - 48;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  doc.pipe(res);

  doc.rect(0, 0, pageWidth, pageHeight).fill(COLORS.page);
  doc.circle(88, 92, 72).fillOpacity(0.18).fill(COLORS.cyan).fillOpacity(1);
  doc.circle(pageWidth - 70, 118, 94).fillOpacity(0.12).fill(COLORS.pink).fillOpacity(1);
  doc.circle(pageWidth - 92, pageHeight - 86, 72).fillOpacity(0.12).fill(COLORS.amber).fillOpacity(1);

  doc.roundedRect(panelX, panelY, panelWidth, panelHeight, 28).fill(COLORS.panel);

  doc.roundedRect(panelX + 18, panelY + 18, panelWidth - 36, 138, 24).fill(COLORS.navy);
  doc.roundedRect(panelX + 18, panelY + 18, panelWidth - 36, 14, 24).fill(COLORS.pink);
  doc.roundedRect(panelX + panelWidth - 182, panelY + 44, 132, 34, 17).fill(statusTheme.fill);

  doc
    .fillColor(statusTheme.text)
    .font("Helvetica-Bold")
    .fontSize(13)
    .text(status.toUpperCase(), panelX + panelWidth - 182, panelY + 54, {
      width: 132,
      align: "center",
    });

  doc
    .fillColor("#d1fae5")
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("GLOBAL TECH INSTITUTE", panelX + 40, panelY + 44);

  doc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(27)
    .text(title, panelX + 40, panelY + 68, {
      width: panelWidth - 250,
    });

  doc
    .fillColor("#cbd5e1")
    .font("Helvetica")
    .fontSize(11)
    .text(subtitle, panelX + 40, panelY + 112, {
      width: panelWidth - 220,
    });

  doc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(34)
    .text("GTI", panelX + panelWidth - 138, panelY + 88, {
      width: 88,
      align: "center",
    });

  doc
    .fillOpacity(0.05)
    .fillColor(COLORS.navy)
    .font("Helvetica-Bold")
    .fontSize(96)
    .text("ADMIT", panelX + 170, panelY + 290, {
      width: 250,
      align: "center",
    })
    .fillOpacity(1);

  const cardY = panelY + 176;
  const cardGap = 12;
  const cardWidth = (panelWidth - 36 - cardGap * 3) / 4;

  drawInfoCard(doc, panelX + 18, cardY, cardWidth, 72, "Admission No", referenceNumber, COLORS.teal);
  drawInfoCard(doc, panelX + 18 + (cardWidth + cardGap), cardY, cardWidth, 72, "Issue Date", issueDate, COLORS.cyan);
  drawInfoCard(doc, panelX + 18 + (cardWidth + cardGap) * 2, cardY, cardWidth, 72, "Program", trimValue(admission.course, 20), COLORS.pink);
  drawInfoCard(doc, panelX + 18 + (cardWidth + cardGap) * 3, cardY, cardWidth, 72, "Payment", admission.paymentStatus || "Pending", COLORS.amber);

  doc.roundedRect(panelX + 18, cardY + 92, panelWidth - 36, 104, 24).fill("#ecfeff");
  doc.roundedRect(panelX + 18, cardY + 92, 10, 104, 24).fill(COLORS.teal);

  doc
    .fillColor(COLORS.navy)
    .font("Helvetica-Bold")
    .fontSize(22)
    .text(messageHeading, panelX + 38, cardY + 112);

  doc
    .fillColor(COLORS.slate)
    .font("Helvetica")
    .fontSize(11.5)
    .text(openingText, panelX + 38, cardY + 142, {
      width: panelWidth - 90,
      lineGap: 4,
    });

  doc
    .fillColor(statusTheme.stamp)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text(status === "Approved" ? "Verified and issued by the Admissions Office" : "Current status reflected from the admissions portal", panelX + 38, cardY + 176);

  const detailY = cardY + 220;
  const detailWidth = (panelWidth - 52) / 2;

  drawDetailCard(doc, panelX + 18, detailY, detailWidth, "Student Name", admission.name, COLORS.teal);
  drawDetailCard(doc, panelX + 34 + detailWidth, detailY, detailWidth, "Email Address", trimValue(admission.email, 30), COLORS.cyan);
  drawDetailCard(doc, panelX + 18, detailY + 78, detailWidth, "Phone Number", admission.phone, COLORS.pink);
  drawDetailCard(doc, panelX + 34 + detailWidth, detailY + 78, detailWidth, "Admission Status", status, statusTheme.stamp);
  drawDetailCard(doc, panelX + 18, detailY + 156, detailWidth, "Course / Program", admission.course, COLORS.amber);
  drawDetailCard(doc, panelX + 34 + detailWidth, detailY + 156, detailWidth, "Address", trimValue(admission.address, 38), COLORS.rose);

  const docsY = detailY + 242;
  doc
    .fillColor(COLORS.navy)
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Submitted Documents", panelX + 18, docsY);

  const docChipY = docsY + 22;
  const docChipWidth = (panelWidth - 48) / 3;

  drawDocumentChip(doc, panelX + 18, docChipY, docChipWidth, "10th Marksheet", documents.tenthMarksheet, COLORS.teal);
  drawDocumentChip(doc, panelX + 24 + docChipWidth, docChipY, docChipWidth, "12th Marksheet", documents.twelfthMarksheet, COLORS.pink);
  drawDocumentChip(doc, panelX + 30 + docChipWidth * 2, docChipY, docChipWidth, "ID Proof", documents.idProof, COLORS.amber);

  const footerY = panelY + panelHeight - 120;

  doc.roundedRect(panelX + 18, footerY, panelWidth - 36, 84, 24).fill("#fff7ed");

  doc
    .fillColor(COLORS.navy)
    .font("Helvetica-Bold")
    .fontSize(13)
    .text("Important Note", panelX + 34, footerY + 18);

  doc
    .fillColor(COLORS.slate)
    .font("Helvetica")
    .fontSize(10.5)
    .text(noteText, panelX + 34, footerY + 38, {
      width: panelWidth - 220,
      lineGap: 3,
    });

  doc
    .moveTo(panelX + panelWidth - 176, footerY + 56)
    .lineTo(panelX + panelWidth - 56, footerY + 56)
    .lineWidth(1)
    .strokeColor(COLORS.muted)
    .stroke();

  doc
    .fillColor(COLORS.navy)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("Admissions Director", panelX + panelWidth - 176, footerY + 62, {
      width: 120,
      align: "center",
    });

  doc
    .fillColor(COLORS.muted)
    .font("Helvetica")
    .fontSize(9.5)
    .text(institutionName, panelX + panelWidth - 176, footerY + 76, {
      width: 120,
      align: "center",
    });

  drawStamp(
    doc,
    panelX + panelWidth - 86,
    panelY + 314,
    status === "Approved" ? "ADMITTED" : status.toUpperCase(),
    statusTheme.stamp
  );

  doc
    .fillColor(COLORS.muted)
    .font("Helvetica")
    .fontSize(9)
    .text(
      `${institutionName} | Admissions Office | Reference ${referenceNumber}`,
      panelX + 24,
      pageHeight - 28,
      {
        width: panelWidth - 48,
        align: "center",
      }
    );

  doc.end();
};

module.exports = { pipeAdmissionPdf };
