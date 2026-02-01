import React, { useState } from "react";
import axios from "axios";

const Admission = () => {
  const [step, setStep] = useState(1);
  const [admissionId, setAdmissionId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    course: "",
  });

  const [files, setFiles] = useState({
    tenthMarksheet: null,
    twelfthMarksheet: null,
    idProof: null,
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const token = localStorage.getItem("token");

  /* ===== STEP 1 SUBMIT ===== */
  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in!");

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    Object.entries(files).forEach(([k, v]) => v && data.append(k, v));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admission/apply",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmissionId(res.data.admission._id);
      alert("Form submitted successfully");
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Make sure you are logged in!");
    }
  };

  /* ===== STEP 2 PAYMENT ===== */
  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }
    alert(`Payment successful via ${paymentMethod}`);
    setStep(3);
  };

  /* ===== STEP 3 PDF DOWNLOAD ===== */
  const downloadPDF = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admission/letter/${admissionId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "admission_letter.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("PDF download failed");
    }
  };

  /* ================= UI ================= */
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">
            Admission <span className="text-blue-400">Portal</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Complete the steps below to secure your admission
          </p>
        </div>

        {/* Step Bar */}
        <div className="flex justify-between mb-14">
          {["Fill Form", "Payment", "Confirmation"].map((label, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className={`w-11 h-11 mx-auto rounded-full flex items-center justify-center font-bold
                  ${step >= i + 1 ? "bg-blue-600" : "bg-slate-700"}`}
              >
                {i + 1}
              </div>
              <p className="mt-2 text-sm text-gray-300">{label}</p>
            </div>
          ))}
        </div>

        {/* Step 1 Form */}
        {step === 1 && (
          <form
            onSubmit={handleSubmitStep1}
            className="bg-slate-900 p-10 rounded-2xl shadow-2xl space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {["name", "email", "phone", "address"].map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field.toUpperCase()}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="bg-slate-800 px-4 py-3 rounded-lg w-full"
                />
              ))}

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="md:col-span-2 bg-slate-800 px-4 py-3 rounded-lg w-full"
              >
                <option value="">Select Course</option>
                <option>B.Sc Physics</option>
                <option>B.Tech Computer Engineering</option>
                <option>B.A English Literature</option>
              </select>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {["tenthMarksheet", "twelfthMarksheet", "idProof"].map((f) => (
                <div key={f} className="flex flex-col">
                  <label className="text-gray-300 mb-1">
                    {f.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="file"
                    name={f}
                    onChange={handleFileChange}
                    required
                    className="bg-indigo-800 text-white px-4 py-2 rounded-lg block w-full"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 py-4 rounded-xl hover:bg-blue-700 transition"
            >
              Continue to Payment →
            </button>
          </form>
        )}

        {/* Step 2 Payment */}
        {step === 2 && (
          <div className="bg-slate-900 p-10 rounded-2xl text-center space-y-6">
            <h2 className="text-2xl font-bold">Select Payment Method</h2>
            <div className="flex justify-center flex-wrap gap-4">
              {["UPI", "Card", "Net Banking"].map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`px-6 py-3 rounded ${
                    paymentMethod === m
                      ? "bg-green-600"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <button
              onClick={handlePayment}
              className="bg-green-600 px-10 py-4 rounded-xl hover:bg-green-700 transition mt-4"
            >
              Pay & Confirm
            </button>
          </div>
        )}

        {/* Step 3 PDF */}
        {step === 3 && (
          <div className="bg-slate-900 p-14 rounded-2xl text-center space-y-6">
            <h2 className="text-4xl text-green-400 font-bold">
              Admission Confirmed 🎉
            </h2>
            <p className="text-gray-300">
              Your admission letter is ready to download
            </p>
            <button
              onClick={downloadPDF}
              className="bg-blue-600 px-8 py-4 rounded-xl hover:bg-blue-700 transition"
            >
              Download Admission Letter PDF
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Admission;
