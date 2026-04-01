// pages/UserDashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle, FaFilePdf } from "react-icons/fa";
import { buildApiUrl } from "../services/api";

export default function UserDashboard() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({ name: "", email: "" });
  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [files, setFiles] = useState({
    tenthMarksheet: null,
    twelfthMarksheet: null,
    idProof: null,
  });

  const [step, setStep] = useState(1);

  useEffect(() => {
    loadUserProfile();
    loadMyAdmission();
  }, []);

  // ===== Load User Profile =====
  const loadUserProfile = async () => {
    try {
      const res = await axios.get(buildApiUrl("/auth/me"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setFormData({
        ...formData,
        name: res.data.name,
        email: res.data.email,
      });
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  // ===== Load My Admission =====
  const loadMyAdmission = async () => {
    try {
      const res = await axios.get(buildApiUrl("/admission/my"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmission(res.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setAdmission(null);
        return;
      }

      console.error("Failed to load admission:", error);
    }
  };

  // ===== Handle Form Input =====
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // ===== Submit Admission =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("course", formData.course);
      if (files.tenthMarksheet) form.append("tenthMarksheet", files.tenthMarksheet);
      if (files.twelfthMarksheet) form.append("twelfthMarksheet", files.twelfthMarksheet);
      if (files.idProof) form.append("idProof", files.idProof);

      const res = await axios.post(buildApiUrl("/admission"), form, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message || "Admission applied successfully!");
      loadMyAdmission();
      setStep(2);
    } catch (error) {
      console.error(error.response || error);
      alert("Failed to apply admission");
    }
  };

  // ===== Download Admission PDF =====
  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        buildApiUrl(`/admission/letter/${admission._id}`),
        { responseType: "blob", headers: { Authorization: `Bearer ${token}` } }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "admission.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error.response || error);
      alert("PDF download failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">👋 Welcome, {user.name}</h1>

      {admission ? (
        // ===== My Admission Info =====
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-700">🎓 My Admission</h2>
          <p><strong>Name:</strong> {admission.name}</p>
          <p><strong>Email:</strong> {admission.email}</p>
          <p><strong>Phone:</strong> {admission.phone}</p>
          <p><strong>Course:</strong> {admission.course}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                admission.admissionStatus === "Approved"
                  ? "bg-green-100 text-green-700"
                  : admission.admissionStatus === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {admission.admissionStatus || "Pending"}
            </span>
          </p>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaFilePdf /> Download PDF
          </button>
        </div>
      ) : (
        // ===== Apply Admission Form =====
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-700">📝 Apply Admission</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1">10th Marksheet</label>
              <input
                type="file"
                name="tenthMarksheet"
                onChange={handleFileChange}
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">12th Marksheet</label>
              <input
                type="file"
                name="twelfthMarksheet"
                onChange={handleFileChange}
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">ID Proof</label>
              <input
                type="file"
                name="idProof"
                onChange={handleFileChange}
                className="w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Submit Admission
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
