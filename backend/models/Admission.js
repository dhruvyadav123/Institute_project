const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    course: String,

    documents: {
      tenthMarksheet: String,
      twelfthMarksheet: String,
      idProof: String,
    },

    paymentMethod: String,
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    admissionStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    approvedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", admissionSchema);
