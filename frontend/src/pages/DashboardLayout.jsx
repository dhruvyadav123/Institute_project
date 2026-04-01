// pages/DashboardLayout.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaGraduationCap, FaHome, FaUserCircle, FaBars, FaFilePdf } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { buildApiUrl } from "../services/api";

export default function DashboardLayout() {
  const token = localStorage.getItem("token");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [role, setRole] = useState(""); // "admin" or "user"
  const [loading, setLoading] = useState(false);

  // Admin state
  const [stats, setStats] = useState({});
  const [admissions, setAdmissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState({ name: "Admin", email: "", dp: "" });

  // User state
  const [user, setUser] = useState({ name: "", email: "" });
  const [myAdmission, setMyAdmission] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: "" });
  const [files, setFiles] = useState({ tenthMarksheet: null, twelfthMarksheet: null, idProof: null });

  useEffect(() => {
    checkRoleAndLoadData();
  }, []);

  // ===== Detect Role =====
  const checkRoleAndLoadData = async () => {
    try {
      const res = await axios.get(buildApiUrl("/auth/me"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRole(res.data.role);
      if (res.data.role === "admin") loadAdminData();
      else loadUserData(res.data);
    } catch (error) {
      console.error("Failed to detect role:", error);
    }
  };

  // ===== Load Admin Data =====
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, admissionsRes, profileRes] = await Promise.all([
        axios.get(buildApiUrl("/admin/analytics"), { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(buildApiUrl("/admin/users"), { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(buildApiUrl("/admin/admissions"), { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(buildApiUrl("/admin/profile"), { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setAdmissions(admissionsRes.data);
      setAdmin(profileRes.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // ===== Load User Data =====
  const loadUserData = async (userProfile) => {
    setUser(userProfile);
    setFormData({ ...formData, name: userProfile.name, email: userProfile.email });
    try {
      const res = await axios.get(buildApiUrl("/admission/my"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyAdmission(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ===== Admin Actions =====
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        buildApiUrl(`/admin/admissions/${id}/status`),
        { admissionStatus: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "Status updated");
      loadAdminData();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const downloadPDF = async (id) => {
    const admissionId = id || myAdmission?._id;
    const endpoint = id
      ? buildApiUrl(`/admin/admissions/${admissionId}/download`)
      : buildApiUrl(`/admission/letter/${admissionId}`);

    try {
      const response = await axios.get(endpoint, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "admission.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert("PDF download failed");
    }
  };

  // ===== User Actions =====
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.keys(formData).forEach(key => form.append(key, formData[key]));
      Object.keys(files).forEach(key => files[key] && form.append(key, files[key]));

      const res = await axios.post(buildApiUrl("/admission"), form, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message || "Admission applied!");
      const myRes = await axios.get(buildApiUrl("/admission/my"), { headers: { Authorization: `Bearer ${token}` } });
      setMyAdmission(myRes.data);
    } catch (error) {
      console.error(error);
      alert("Failed to apply admission");
    }
  };

  // ===== Logout =====
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // ===== Sidebar Items =====
  const adminTabs = [
    { name: "dashboard", icon: <FaHome />, label: "Dashboard" },
    { name: "users", icon: <FaUsers />, label: "Users" },
    { name: "admissions", icon: <FaGraduationCap />, label: "Admissions" },
    { name: "profile", icon: <FaUserCircle />, label: "Profile" },
  ];

  const userTabs = [
    { name: "myAdmission", icon: <FaGraduationCap />, label: "My Admission" },
    { name: "applyAdmission", icon: <FaFilePdf />, label: "Apply Admission" },
  ];

  // ===== Render =====
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className={`fixed z-20 inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 w-64 bg-gradient-to-b from-purple-700 to-purple-900 text-white shadow-lg`}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-6 flex flex-col items-center border-b border-white/20">
            {role === "admin" ? (
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-white shadow-md">
                {admin.dp ? <img src={admin.dp} alt="Profile" className="w-full h-full object-cover" /> : <FaUserCircle className="w-full h-full text-gray-200" />}
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-white shadow-md">
                <FaUserCircle className="w-full h-full text-gray-200" />
              </div>
            )}
            <h2 className="text-lg font-bold">{role === "admin" ? admin.name : user.name}</h2>
            <p className="text-sm">{role === "admin" ? admin.email : user.email}</p>
          </div>

          <nav className="mt-6 flex flex-col gap-2 px-2 pb-4 flex-1">
            {(role === "admin" ? adminTabs : userTabs).map(tab => (
              <button key={tab.name} className={`flex items-center gap-3 px-4 py-3 w-full hover:bg-purple-600 transition rounded-r-full ${activeTab === tab.name ? "bg-purple-600 font-bold" : ""}`} onClick={() => setActiveTab(tab.name)}>
                {tab.icon} {tab.label}
              </button>
            ))}
            <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-500 hover:text-white transition rounded-r-full mt-auto">Logout</button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 p-6 md:p-8 space-y-6">
        {loading && <p className="text-gray-500">Loading...</p>}

        {/* ===== Admin Views ===== */}
        {role === "admin" && activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 Admin Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Users", value: stats.totalUsers || 0 },
                { name: "Admissions", value: stats.totalAdmissions || 0 },
                { name: "Approved", value: stats.approved || 0 },
                { name: "Pending", value: stats.pending || 0 },
              ].map((d, idx) => (
                <div key={idx} className={`p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 bg-gradient-to-r text-white ${["from-pink-400 to-pink-500","from-indigo-400 to-indigo-500","from-green-400 to-green-500","from-yellow-400 to-yellow-500"][idx]}`}>
                  <p className="text-sm">{d.name}</p>
                  <h2 className="text-2xl font-bold mt-2">{d.value}</h2>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Users */}
        {role === "admin" && activeTab === "users" && (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>
            <table className="min-w-full text-left border">
              <thead className="bg-purple-100">
                <tr><th className="p-3 border">Name</th><th className="p-3 border">Email</th><th className="p-3 border">Role</th></tr>
              </thead>
              <tbody>
                {users.map(u => <tr key={u._id} className="text-gray-700 hover:bg-gray-50"><td className="p-3 border">{u.name}</td><td className="p-3 border">{u.email}</td><td className="p-3 border">{u.role}</td></tr>)}
              </tbody>
            </table>
          </div>
        )}

        {/* Admin Admissions */}
        {role === "admin" && activeTab === "admissions" && (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-4">🎓 Admissions</h2>
            <table className="min-w-full text-left border">
              <thead className="bg-purple-100">
                <tr><th className="p-3 border">Name</th><th className="p-3 border">Course</th><th className="p-3 border">Status</th><th className="p-3 border">Action</th></tr>
              </thead>
              <tbody>
                {admissions.map(adm => (
                  <tr key={adm._id} className="text-gray-700 hover:bg-gray-50">
                    <td className="p-3 border">{adm.name}</td>
                    <td className="p-3 border">{adm.course}</td>
                    <td className="p-3 border">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        adm.admissionStatus === "Approved" ? "bg-green-100 text-green-700" :
                        adm.admissionStatus === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                      }`}>{adm.admissionStatus || "Pending"}</span>
                    </td>
                    <td className="p-3 border flex gap-2">
                      <button onClick={() => updateStatus(adm._id, "Approved")} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Approve</button>
                      <button onClick={() => updateStatus(adm._id, "Rejected")} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Reject</button>
                      <button onClick={() => downloadPDF(adm._id)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1"><FaFilePdf /> PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Admin Profile */}
        {role === "admin" && activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">👤 Admin Profile</h2>
            <p><strong>Name:</strong> {admin.name}</p>
            <p><strong>Email:</strong> {admin.email}</p>
          </div>
        )}

        {/* ===== User Views ===== */}
        {role === "user" && activeTab === "myAdmission" && myAdmission && (
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold">🎓 My Admission</h2>
            <p><strong>Name:</strong> {myAdmission.name}</p>
            <p><strong>Email:</strong> {myAdmission.email}</p>
            <p><strong>Phone:</strong> {myAdmission.phone}</p>
            <p><strong>Course:</strong> {myAdmission.course}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                myAdmission.admissionStatus === "Approved" ? "bg-green-100 text-green-700" :
                myAdmission.admissionStatus === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
              }`}>{myAdmission.admissionStatus || "Pending"}</span>
            </p>
            <button onClick={downloadPDF} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <FaFilePdf /> Download PDF
            </button>
          </div>
        )}

        {role === "user" && activeTab === "applyAdmission" && !myAdmission && (
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">📝 Apply Admission</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded-lg" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded-lg" required />
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded-lg" required />
              <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="Course" className="w-full border p-2 rounded-lg" required />
              <input type="file" name="tenthMarksheet" onChange={handleFileChange} required />
              <input type="file" name="twelfthMarksheet" onChange={handleFileChange} required />
              <input type="file" name="idProof" onChange={handleFileChange} required />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">Submit Admission</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
