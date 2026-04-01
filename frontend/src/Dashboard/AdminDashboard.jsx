import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
<<<<<<< HEAD
import { FaUsers, FaGraduationCap, FaHome, FaUserCircle, FaBars } from "react-icons/fa";
import { buildApiUrl } from "../services/api";
=======
import {
  FaBars,
  FaEnvelope,
  FaFilePdf,
  FaGraduationCap,
  FaHome,
  FaPhoneAlt,
  FaSignOutAlt,
  FaTimes,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { API_BASE_URL } from "../services/api";

const tabs = [
  { name: "dashboard", label: "Dashboard", icon: FaHome },
  { name: "users", label: "Users", icon: FaUsers },
  { name: "admissions", label: "Admissions", icon: FaGraduationCap },
  { name: "profile", label: "Profile", icon: FaUserCircle },
];

const badgeClass = {
  Approved: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  Rejected: "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
  Pending: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
};

const panelClass =
  "rounded-[28px] border border-slate-200/80 bg-white/92 p-5 shadow-xl shadow-slate-950/10";

const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(value))
    : "N/A";

const readError = async (error, fallback) => {
  if (error.response?.data instanceof Blob) {
    try {
      const text = await error.response.data.text();
      const parsed = JSON.parse(text);
      return parsed.message || parsed.msg || fallback;
    } catch {
      return fallback;
    }
  }

  return error.response?.data?.message || error.response?.data?.msg || fallback;
};

const StatusBadge = ({ status }) => {
  const safeStatus = status || "Pending";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass[safeStatus] || badgeClass.Pending}`}
    >
      {safeStatus}
    </span>
  );
};
>>>>>>> new-feature

export default function AdminDashboard() {
  const token = localStorage.getItem("token");
  const authConfig = { headers: { Authorization: `Bearer ${token}` } };

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [screenError, setScreenError] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [statusLoadingId, setStatusLoadingId] = useState("");
  const [downloadingId, setDownloadingId] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmissions: 0,
    approved: 0,
    pending: 0,
  });
  const [users, setUsers] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [admin, setAdmin] = useState({ name: "Admin", email: "", dp: "" });

  useEffect(() => {
    refreshDashboard();
  }, []);

  const refreshDashboard = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setScreenError("");

    try {
<<<<<<< HEAD
      setLoading(true);
      const res = await axios.get(buildApiUrl("/admin/analytics"), {
        headers: { Authorization: `Bearer ${token}` },
=======
      const [statsRes, usersRes, admissionsRes, profileRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/analytics`, authConfig),
        axios.get(`${API_BASE_URL}/admin/users`, authConfig),
        axios.get(`${API_BASE_URL}/admin/admissions`, authConfig),
        axios.get(`${API_BASE_URL}/admin/profile`, authConfig),
      ]);

      setStats({
        totalUsers: statsRes.data?.totalUsers || 0,
        totalAdmissions: statsRes.data?.totalAdmissions || 0,
        approved: statsRes.data?.approved || 0,
        pending: statsRes.data?.pending || 0,
>>>>>>> new-feature
      });
      setUsers(
        [...(usersRes.data || [])].sort((a, b) =>
          String(a.name || "").localeCompare(String(b.name || ""))
        )
      );
      setAdmissions(
        [...(admissionsRes.data || [])].sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        )
      );
      setAdmin(profileRes.data || { name: "Admin", email: "", dp: "" });
    } catch (error) {
      console.error(error);
      setScreenError(await readError(error, "Could not load admin dashboard."));
    } finally {
      if (showLoader) setLoading(false);
    }
  };

<<<<<<< HEAD
  const loadAdmissions = async () => {
    try {
      const res = await axios.get(buildApiUrl("/admin/admissions"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmissions(res.data);
    } catch (error) {
      console.error("Failed to load admissions:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await axios.get(buildApiUrl("/admin/users"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(
        res.data.map((u) => ({
          name: u.name,
          email: u.email,
          role: u.role,
          _id: u._id,
        }))
      );
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const loadAdminProfile = async () => {
    try {
      const res = await axios.get(buildApiUrl("/admin/profile"), {
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
        buildApiUrl(`/admin/admissions/${id}/status`),
        { admissionStatus: status },
        { headers: { Authorization: `Bearer ${token}` } }
=======
  const updateStatus = async (admissionId, admissionStatus) => {
    const actionKey = `${admissionId}:${admissionStatus}`;
    setStatusLoadingId(actionKey);

    try {
      const res = await axios.put(
        `${API_BASE_URL}/admin/admissions/${admissionId}/status`,
        { admissionStatus },
        authConfig
>>>>>>> new-feature
      );
      setFeedback({
        type: "success",
        message: res.data?.message || `Admission marked as ${admissionStatus}.`,
      });
      await refreshDashboard(false);
    } catch (error) {
      console.error(error);
      setFeedback({
        type: "error",
        message: await readError(error, "Failed to update admission status."),
      });
    } finally {
      setStatusLoadingId("");
    }
  };

<<<<<<< HEAD
  const downloadPDF = async (id) => {
  try {
    const response = await axios.get(
      buildApiUrl(`/admin/admissions/${id}/download`),
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "admission.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error(error);
    alert("Admin PDF download failed");
  }
};

=======
  const downloadPDF = async (admission) => {
    setDownloadingId(admission._id);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/admissions/${admission._id}/download`,
        { ...authConfig, responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${String(admission.name || "admission").replace(/\s+/g, "_")}_record.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setFeedback({
        type: "success",
        message: `PDF downloaded for ${admission.name || "the selected admission"}.`,
      });
    } catch (error) {
      console.error(error);
      setFeedback({
        type: "error",
        message: await readError(error, "PDF download failed."),
      });
    } finally {
      setDownloadingId("");
    }
  };
>>>>>>> new-feature

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

<<<<<<< HEAD
  // ===== Dashboard Chart Data =====
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
=======
  const summaryCards = [
    { label: "Users", value: stats.totalUsers, tone: "from-sky-500 to-cyan-500" },
    { label: "Admissions", value: stats.totalAdmissions, tone: "from-violet-500 to-fuchsia-500" },
    { label: "Approved", value: stats.approved, tone: "from-emerald-500 to-teal-500" },
    { label: "Pending", value: stats.pending, tone: "from-amber-400 to-orange-500" },
>>>>>>> new-feature
  ];

  // ===== RENDER =====
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-teal-500/18 blur-3xl" />
        <div className="absolute right-0 top-36 h-96 w-96 rounded-full bg-cyan-500/12 blur-3xl" />
      </div>
      {sidebarOpen && <button type="button" className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="relative flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform transition duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex h-full flex-col border-r border-white/10 bg-slate-950/85 p-4 backdrop-blur-xl">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-300">Admin Suite</p>
              <h1 className="mt-3 text-2xl font-semibold text-white">Campus Panel</h1>
              <p className="mt-2 text-sm text-slate-300">Responsive admissions workspace for approvals, exports, and user monitoring.</p>
            </div>
            <div className="mt-5 rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">{admin.dp ? <img src={admin.dp} alt="Admin" className="h-full w-full object-cover" /> : <FaUserCircle className="h-full w-full text-slate-400" />}</div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-white">{admin.name || "Admin"}</p>
                  <p className="truncate text-sm text-slate-300">{admin.email || "admin@gmail.com"}</p>
                </div>
              </div>
            </div>
            <nav className="mt-5 flex flex-1 flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.name;
                return (
                  <button key={tab.name} type="button" onClick={() => { setActiveTab(tab.name); setSidebarOpen(false); }} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active ? "bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950" : "text-slate-300 hover:bg-white/6 hover:text-white"}`}>
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${active ? "bg-slate-950/10" : "bg-white/6 text-teal-300"}`}><Icon /></span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
              <button type="button" onClick={logout} className="mt-auto flex items-center gap-3 rounded-2xl border border-rose-400/20 bg-rose-500/8 px-4 py-3 text-rose-200 transition hover:bg-rose-500/16"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10"><FaSignOutAlt /></span><span className="font-medium">Logout</span></button>
            </nav>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 lg:hidden" onClick={() => setSidebarOpen((value) => !value)}>{sidebarOpen ? <FaTimes /> : <FaBars />}</button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-300">Admissions Office</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">{activeTab === "dashboard" ? "Admin Control Center" : activeTab === "users" ? "User Directory" : activeTab === "admissions" ? "Admissions Queue" : "Admin Profile"}</h2>
                  <p className="mt-1 text-sm text-slate-400">{activeTab === "dashboard" ? "Analytics, decisions, and exports in one polished admin view." : activeTab === "users" ? "Review registered accounts and roles across the portal." : activeTab === "admissions" ? "Approve, reject, and download records from a single queue." : "Core contact details for the dashboard owner."}</p>
                </div>
              </div>
              <button type="button" onClick={() => refreshDashboard(true)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-white/10">Refresh</button>
            </div>
          </header>

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
              {feedback && <div className={`rounded-3xl border px-5 py-4 text-sm ${feedback.type === "success" ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100" : "border-rose-400/30 bg-rose-500/10 text-rose-100"}`}>{feedback.message}</div>}
              {screenError && <div className="rounded-3xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-100">{screenError}</div>}
              {loading ? (
                <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-12 text-center text-slate-300">Loading dashboard data...</div>
              ) : (
                <>
                  {activeTab === "dashboard" && (
                    <>
                      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 p-6 shadow-2xl shadow-slate-950/40">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">Ready for the day</p>
                        <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Admissions, analytics, and exports in one responsive workspace.</h3>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{summaryCards.map((card) => <div key={card.label} className={`rounded-2xl bg-gradient-to-br ${card.tone} p-[1px]`}><div className="rounded-2xl bg-slate-950/80 px-4 py-5"><p className="text-sm text-slate-300">{card.label}</p><p className="mt-3 text-3xl font-semibold text-white">{card.value}</p></div></div>)}</div>
                      </div>
                      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.85fr)]">
                        <div className={`${panelClass} min-w-0`}>
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">Performance snapshot</p>
                          <h3 className="mt-2 text-xl font-semibold text-slate-900">Approval trends</h3>
                          <div className="mt-6 h-[320px] min-w-0 w-full">
                            <ResponsiveContainer width="100%" height="100%" minWidth={280}>
                              <BarChart data={summaryCards.map(({ label, value }) => ({ name: label, value }))} barCategoryGap={22}>
                                <CartesianGrid stroke="#e2e8f0" vertical={false} strokeDasharray="4 4" />
                                <XAxis dataKey="name" stroke="#475569" tickLine={false} axisLine={false} />
                                <YAxis stroke="#475569" tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: "rgba(15, 118, 110, 0.08)" }} contentStyle={{ borderRadius: "16px", border: "1px solid #cbd5e1" }} />
                                <Bar dataKey="value" fill="#0f766e" radius={[10, 10, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div className={panelClass}>
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">Latest submissions</p>
                              <h3 className="mt-2 text-xl font-semibold text-slate-900">Fresh activity</h3>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{admissions.slice(0, 4).length} shown</span>
                          </div>
                          <div className="mt-5 space-y-4">{admissions.slice(0, 4).length === 0 ? <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">New applications will show up here as soon as students submit them.</div> : admissions.slice(0, 4).map((admission) => <div key={admission._id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-base font-semibold text-slate-900">{admission.name || "Unnamed student"}</p><p className="mt-1 truncate text-sm text-slate-500">{admission.course || "Course not set"}</p></div><StatusBadge status={admission.admissionStatus} /></div><p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-400">Submitted {formatDate(admission.createdAt)}</p></div>)}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "users" && (
                    <section className="space-y-4">
                      <div className={panelClass}><p className="text-sm text-slate-500">Registered users</p><p className="mt-2 text-3xl font-semibold text-slate-900">{users.length}</p></div>
                      <div className="grid gap-4 lg:hidden">{users.map((user) => <article key={user._id} className={panelClass}><div className="flex items-start gap-4"><div className="rounded-2xl bg-slate-100 p-3 text-slate-500"><FaUserCircle className="text-3xl" /></div><div className="min-w-0 flex-1"><p className="truncate text-lg font-semibold text-slate-900">{user.name || "N/A"}</p><p className="mt-1 truncate text-sm text-slate-500">{user.email || "N/A"}</p><p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-400">Role: {user.role || "user"}</p></div></div></article>)}</div>
                      <div className={`hidden overflow-hidden ${panelClass} lg:block`}><div className="overflow-x-auto"><table className="min-w-full text-left"><thead className="bg-slate-100/80 text-sm uppercase tracking-[0.2em] text-slate-500"><tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Role</th></tr></thead><tbody>{users.map((user) => <tr key={user._id} className="border-t border-slate-200 text-slate-700 hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-900">{user.name || "N/A"}</td><td className="px-6 py-4">{user.email || "N/A"}</td><td className="px-6 py-4 capitalize">{user.role || "user"}</td></tr>)}</tbody></table></div></div>
                    </section>
                  )}

                  {activeTab === "admissions" && (
                    <section className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-3">{["Pending", "Approved", "Rejected"].map((label) => <div key={label} className={panelClass}><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-semibold text-slate-900">{label === "Pending" ? stats.pending : label === "Approved" ? stats.approved : admissions.filter((item) => item.admissionStatus === "Rejected").length}</p></div>)}</div>
                      <div className="grid gap-4 xl:hidden">{admissions.map((admission) => <article key={admission._id} className={panelClass}><div className="flex items-start justify-between gap-3"><div><p className="text-lg font-semibold text-slate-900">{admission.name || "Unnamed student"}</p><p className="mt-1 text-sm text-slate-500">{admission.course || "Course not set"}</p></div><StatusBadge status={admission.admissionStatus} /></div><div className="mt-4 space-y-2 text-sm text-slate-600"><div className="flex items-center gap-2"><FaEnvelope className="text-teal-600" /><span className="truncate">{admission.email || "No email"}</span></div><div className="flex items-center gap-2"><FaPhoneAlt className="text-teal-600" /><span>{admission.phone || "No phone"}</span></div><p className="text-xs uppercase tracking-[0.22em] text-slate-400">Submitted {formatDate(admission.createdAt)}</p></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><button type="button" onClick={() => updateStatus(admission._id, "Approved")} disabled={statusLoadingId === `${admission._id}:Approved`} className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-70">{statusLoadingId === `${admission._id}:Approved` ? "Saving..." : "Approve"}</button><button type="button" onClick={() => updateStatus(admission._id, "Rejected")} disabled={statusLoadingId === `${admission._id}:Rejected`} className="rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-70">{statusLoadingId === `${admission._id}:Rejected` ? "Saving..." : "Reject"}</button><button type="button" onClick={() => downloadPDF(admission)} disabled={downloadingId === admission._id} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-70"><FaFilePdf />{downloadingId === admission._id ? "Preparing..." : "Download PDF"}</button></div></article>)}</div>
                      <div className={`hidden overflow-hidden ${panelClass} xl:block`}><div className="overflow-x-auto"><table className="min-w-full text-left"><thead className="bg-slate-100/80 text-sm uppercase tracking-[0.2em] text-slate-500"><tr><th className="px-6 py-4">Candidate</th><th className="px-6 py-4">Course</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Submitted</th><th className="px-6 py-4">Action</th></tr></thead><tbody>{admissions.map((admission) => <tr key={admission._id} className="border-t border-slate-200 align-top text-slate-700 hover:bg-slate-50"><td className="px-6 py-5"><p className="font-semibold text-slate-900">{admission.name || "Unnamed student"}</p><p className="mt-1 text-sm text-slate-500">{admission.email || "No email"}</p></td><td className="px-6 py-5">{admission.course || "N/A"}</td><td className="px-6 py-5"><StatusBadge status={admission.admissionStatus} /></td><td className="px-6 py-5 text-sm text-slate-500">{formatDate(admission.createdAt)}</td><td className="px-6 py-5"><div className="flex flex-wrap gap-2"><button type="button" onClick={() => updateStatus(admission._id, "Approved")} disabled={statusLoadingId === `${admission._id}:Approved`} className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-70">{statusLoadingId === `${admission._id}:Approved` ? "Saving..." : "Approve"}</button><button type="button" onClick={() => updateStatus(admission._id, "Rejected")} disabled={statusLoadingId === `${admission._id}:Rejected`} className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-70">{statusLoadingId === `${admission._id}:Rejected` ? "Saving..." : "Reject"}</button><button type="button" onClick={() => downloadPDF(admission)} disabled={downloadingId === admission._id} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:opacity-70"><FaFilePdf />{downloadingId === admission._id ? "Preparing..." : "Download PDF"}</button></div></td></tr>)}</tbody></table></div></div>
                    </section>
                  )}

                  {activeTab === "profile" && (
                    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
                      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl shadow-slate-950/35">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                          <div className="h-28 w-28 overflow-hidden rounded-[28px] border border-white/10 bg-white/5">{admin.dp ? <img src={admin.dp} alt="Admin profile" className="h-full w-full object-cover" /> : <FaUserCircle className="h-full w-full text-slate-400" />}</div>
                          <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Dashboard owner</p><h3 className="mt-2 truncate text-3xl font-semibold text-white">{admin.name || "Admin"}</h3><p className="mt-2 truncate text-base text-slate-300">{admin.email || "admin@gmail.com"}</p></div>
                        </div>
                      </div>
                      <div className={panelClass}><div className="space-y-4"><div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Name</p><p className="mt-2 text-lg font-semibold text-slate-900">{admin.name || "Admin"}</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Email</p><p className="mt-2 text-lg font-semibold text-slate-900">{admin.email || "admin@gmail.com"}</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Managed records</p><p className="mt-2 text-lg font-semibold text-slate-900">{stats.totalAdmissions} admissions</p></div></div></div>
                    </section>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
