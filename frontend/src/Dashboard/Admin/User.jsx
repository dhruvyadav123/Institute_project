import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-purple-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td className="p-3 border">{u.name}</td>
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
