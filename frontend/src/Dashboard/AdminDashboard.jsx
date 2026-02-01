// pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUsers, FaGraduationCap, FaHome, FaUserCircle, FaBars } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [admissions, setAdmissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState({
    name: "DHRUV YADAV",
    email: "admin@gmail.com",
    dp: "",
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadStats();
    loadAdmissions();
    loadUsers();
    loadAdminProfile();
  }, []);

  // ===== Load Data =====
  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load stats:", error);
      setLoading(false);
    }
  };

  const loadAdmissions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admission/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmissions(res.data);
    } catch (error) {
      console.error("Failed to load admissions:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.map(u => ({ name: u.name, email: u.email, role: u.role, _id: u._id })));
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const loadAdminProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmin(res.data);
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  // ===== Actions =====
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admission/${id}/status`,
        { admissionStatus: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "Status updated");
      loadAdmissions();
      loadStats();
    } catch (error) {
      console.error(error.response || error);
      alert("Failed to update status");
    }
  };

  const downloadPDF = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admission/letter/${id}`,
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

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const data = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Admissions", value: stats.totalAdmissions || 0 },
    { name: "Approved", value: stats.approved || 0 },
    { name: "Pending", value: stats.pending || 0 },
  ];

  
  const cardColors = [
    "from-pink-400 to-pink-500",
    "from-indigo-400 to-indigo-500",
    "from-green-400 to-green-500",
    "from-yellow-400 to-yellow-500",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-64 bg-gradient-to-b from-purple-700 to-purple-900 text-white shadow-lg`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Profile */}
          <div className="p-6 flex flex-col items-center border-b border-white/20">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-white shadow-md">
              {admin.dp ? (
                <img src={admin.dp} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-200" />
              )}
            </div>
            <h2 className="text-lg font-bold">{admin.name}</h2>
            <p className="text-sm">{admin.email}</p>
          </div>

          {/* Navigation */}
          <nav className="mt-6 flex flex-col gap-2 px-2 pb-4 flex-1">
            {[
              { name: "dashboard", icon: <FaHome />, label: "Dashboard" },
              { name: "users", icon: <FaUsers />, label: "Users" },
              { name: "admissions", icon: <FaGraduationCap />, label: "Admissions" },
              { name: "profile", icon: <FaUserCircle />, label: "Profile" },
            ].map((tab) => (
              <button
                key={tab.name}
                className={`flex items-center gap-3 px-4 py-3 w-full hover:bg-purple-600 transition rounded-r-full ${
                  activeTab === tab.name ? "bg-purple-600 font-bold" : ""
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}

            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-500 hover:text-white transition rounded-r-full mt-auto"
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <div className="md:hidden flex items-center justify-between bg-white shadow p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars className="text-2xl text-gray-800" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {loading && <p className="text-gray-500">Loading...</p>}

          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 Dashboard Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {data.map((d, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 bg-gradient-to-r text-white ${cardColors[idx]}`}
                  >
                    <p className="text-sm">{d.name}</p>
                    <h2 className="text-2xl font-bold mt-2">{d.value}</h2>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-700">📈 Overview</h2>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <XAxis dataKey="name" stroke="#4B5563" />
                      <YAxis stroke="#4B5563" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[5, 5, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Users */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">👥 All Users</h2>
              <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4">
                <table className="min-w-full text-left border">
                  <thead className="bg-purple-100 rounded-t-2xl">
                    <tr>
                      <th className="p-3 border">Name</th>
                      <th className="p-3 border">Email</th>
                      <th className="p-3 border">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="text-gray-700 hover:bg-gray-50 transition-colors">
                        <td className="p-3 border">{u.name || "N/A"}</td>
                        <td className="p-3 border">{u.email || "N/A"}</td>
                        <td className="p-3 border">{u.role || "user"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Admissions */}
          {activeTab === "admissions" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">🎓 Admissions</h2>
              <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4">
                <table className="min-w-full text-left border">
                  <thead className="bg-purple-100 rounded-t-2xl">
                    <tr>
                      <th className="p-3 border">Name</th>
                      <th className="p-3 border">Course</th>
                      <th className="p-3 border">Status</th>
                      <th className="p-3 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admissions.map((adm) => (
                      <tr key={adm._id} className="text-gray-700 hover:bg-gray-50 transition-colors">
                        <td className="p-3 border">{adm.name}</td>
                        <td className="p-3 border">{adm.course}</td>
                        <td className="p-3 border">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              adm.admissionStatus === "Approved"
                                ? "bg-green-100 text-green-700"
                                : adm.admissionStatus === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {adm.admissionStatus || "Pending"}
                          </span>
                        </td>
                        <td className="p-3 border flex flex-wrap justify-center gap-2">
                          <button
                            onClick={() => updateStatus(adm._id, "Approved")}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(adm._id, "Rejected")}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => downloadPDF(adm._id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Profile */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">👤 Admin Profile</h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
                  {admin.dp ? (
                    <img src={admin.dp} alt="DP" className="w-full h-full object-cover" />
                  ) : (
                    <FaUserCircle className="w-full h-full text-gray-400" />
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 font-semibold">Name: {admin.name}</p>
                  <p className="text-gray-700 font-semibold">Email: {admin.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
