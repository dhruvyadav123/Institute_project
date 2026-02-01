import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminDashboard from "../Dashboard/AdminDashboard";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ===== TOP BAR ===== */}
      <div className="flex items-center justify-between bg-white shadow p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>

        <button onClick={() => setOpen(!open)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* ===== DASHBOARD OPEN/CLOSE ===== */}
      {open && (
        <div className="p-6">
          <AdminDashboard />
        </div>
      )}
    </div>
  );
}
