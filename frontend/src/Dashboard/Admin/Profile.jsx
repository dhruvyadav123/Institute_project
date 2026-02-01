import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";

export default function Profile() {
  const [admin, setAdmin] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAdmin(res.data);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">👤 Admin Profile</h2>

      <div className="bg-white rounded-xl shadow p-6 flex gap-6 items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border">
          {admin.dp ? (
            <img src={admin.dp} alt="" className="w-full h-full object-cover" />
          ) : (
            <FaUserCircle className="w-full h-full text-gray-400" />
          )}
        </div>

        <div>
          <p className="font-semibold">Name: {admin.name}</p>
          <p className="font-semibold">Email: {admin.email}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
