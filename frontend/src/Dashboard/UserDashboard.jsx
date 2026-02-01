import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchAdmission = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admission/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAdmission(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load admission data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdmission();
  }, [token]);

  const downloadPDF = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admission/letter/${admission._id}`,
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
    } catch {
      alert("Admission not approved yet");
    }
  };

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-900">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        {error}
      </div>
    );
  }

  if (!admission) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        No admission data found
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-red-50 p-4 md:p-8">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-red-900">
            👤 User Dashboard
          </h1>
          <p className="text-red-700 mt-1">
            Welcome, <b>{admission.name}</b>
          </p>
        </div>

        <span
          className={`mt-4 md:mt-0 px-5 py-2 rounded-full text-sm font-semibold
            ${
              admission.admissionStatus === "Approved"
                ? "bg-green-100 text-green-800"
                : admission.admissionStatus === "Rejected"
                ? "bg-red-200 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
        >
          {admission.admissionStatus}
        </span>
      </div>

      {/* ===== CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card title="🎓 Admission" value={admission.admissionStatus} />
        <Card title="📘 Course" value={admission.course} />
        <Card title="💰 Payment" value={admission.paymentStatus} />
        <Card
          title="📄 Documents"
          value={
            admission.documents &&
            (admission.documents.tenthMarksheet ||
              admission.documents.twelfthMarksheet ||
              admission.documents.idProof)
              ? "Uploaded"
              : "Pending"
          }
        />
      </div>

      {/* ===== DETAILS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* PROFILE INFO */}
        <div className="bg-white rounded-xl shadow p-6 space-y-2">
          <h2 className="font-bold text-lg mb-3 text-red-900">
            👤 Profile Information
          </h2>
          <p><b>Name:</b> {admission.name}</p>
          <p><b>Email:</b> {admission.email}</p>
          <p><b>Phone:</b> {admission.phone}</p>
          <p><b>Address:</b> {admission.address}</p>
          <p><b>Course:</b> {admission.course}</p>
        </div>

        {/* TIMELINE */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <h2 className="font-bold text-lg mb-4 text-red-900">
            📌 Admission Timeline
          </h2>

          <ul className="space-y-3 text-red-900">
            <li>📝 Form Submitted: {new Date(admission.createdAt).toLocaleDateString()}</li>
            <li>📄 Documents: {admission.documents ? "Uploaded" : "Pending"}</li>
            <li>💳 Payment: <b>{admission.paymentStatus}</b></li>
            <li>✅ Status: <b>{admission.admissionStatus}</b></li>
          </ul>

          {admission.admissionStatus === "Approved" && (
            <button
              onClick={downloadPDF}
              className="mt-6 w-full md:w-auto px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition"
            >
              📄 Download Admission Letter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ===== CARD COMPONENT ===== */
const Card = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
    <h3 className="text-red-900 font-semibold">{title}</h3>
    <p className="mt-3 text-xl font-bold text-red-900">{value}</p>
  </div>
);

export default UserDashboard;
