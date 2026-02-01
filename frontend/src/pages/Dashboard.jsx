import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState("User");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Get role and name from localStorage
    const storedRole = localStorage.getItem("role") || "User";
    const storedName = localStorage.getItem("name") || "User";

    setRole(storedRole);
    setUserName(storedName);
  }, []);

  // Role-based sidebar navigation
  const navItems =
    role === "Admin"
      ? [
          { icon: <LayoutDashboard size={20} />, label: "Overview", active: true },
          { icon: <Users size={20} />, label: "Team Members", active: false },
          { icon: <BarChart3 size={20} />, label: "Analytics", active: false },
          { icon: <Settings size={20} />, label: "Settings", active: false },
        ]
      : [
          { icon: <LayoutDashboard size={20} />, label: "Overview", active: true },
          { icon: <Settings size={20} />, label: "Profile", active: false },
        ];

  // Dummy stats for Admin/User
  const stats =
    role === "Admin"
      ? [
          { title: "Total Users", value: "1,284", change: "+12%", type: "positive" },
          { title: "Revenue", value: "$42,500", change: "+8%", type: "positive" },
          { title: "Active Sessions", value: "452", change: "-3%", type: "negative" },
          { title: "Support Tickets", value: "12", change: "Stable", type: "neutral" },
        ]
      : [
          { title: "Completed Tasks", value: "34", change: "+5%", type: "positive" },
          { title: "Pending Tasks", value: "5", change: "-1%", type: "negative" },
        ];

  // Dummy transactions table
  const transactions =
    role === "Admin"
      ? [
          { name: "John Doe", status: "Completed", amount: "$250.00", date: "Oct 24, 2025" },
          { name: "Sarah Smith", status: "Pending", amount: "$120.50", date: "Oct 23, 2025" },
          { name: "Mike Ross", status: "Cancelled", amount: "$89.00", date: "Oct 22, 2025" },
        ]
      : [
          { name: "Project A", status: "Completed", amount: "-", date: "Jan 30, 2026" },
          { name: "Project B", status: "Pending", amount: "-", date: "Jan 29, 2026" },
        ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <span className="text-xl font-bold tracking-wider text-blue-400">DASHBOARD</span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                item.active ? "bg-blue-600" : "hover:bg-slate-800"
              }`}
            >
              {item.icon}
              <span className="ml-3 font-medium">{item.label}</span>
            </button>
          ))}

          <button className="flex items-center w-full p-3 mt-10 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <div className="flex items-center">
            <button className="lg:hidden mr-4 text-gray-600" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
            </button>

            <div className="flex items-center space-x-3 border-l pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900 leading-none">{userName}</p>
                <p className="text-xs text-gray-500 mt-1 capitalize">{role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-gray-50">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <StatCard
                key={idx}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.type}
              />
            ))}
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-700">
                Recent {role === "Admin" ? "Transactions" : "Projects"}
              </h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((tx, idx) => (
                    <TableRow
                      key={idx}
                      name={tx.name}
                      status={tx.status}
                      amount={tx.amount}
                      date={tx.date}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---
const StatCard = ({ title, value, change, changeType }) => {
  let changeColor = "bg-gray-100 text-gray-600";
  if (changeType === "positive") changeColor = "bg-green-100 text-green-600";
  if (changeType === "negative") changeColor = "bg-red-100 text-red-600";
  if (changeType === "neutral") changeColor = "bg-yellow-100 text-yellow-600";

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${changeColor}`}>{change}</span>
      </div>
      <div className="h-1 w-full mt-4 rounded-full bg-gray-300 opacity-20"></div>
    </div>
  );
};

const TableRow = ({ name, status, amount, date }) => {
  let statusColor = "bg-gray-100 text-gray-600";
  if (status === "Completed") statusColor = "bg-green-100 text-green-700";
  if (status === "Pending") statusColor = "bg-yellow-100 text-yellow-700";
  if (status === "Cancelled") statusColor = "bg-red-100 text-red-700";

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 font-medium text-gray-900">{name}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${statusColor}`}>{status}</span>
      </td>
      <td className="px-6 py-4 text-gray-600">{amount}</td>
      <td className="px-6 py-4 text-right text-gray-500">{date}</td>
    </tr>
  );
};

export default Dashboard;
