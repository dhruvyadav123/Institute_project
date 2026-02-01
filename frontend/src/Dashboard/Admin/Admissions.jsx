import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function Admissions() {
  const [admissions, setAdmissions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadAdmissions();
  }, []);

  const loadAdmissions = async () => {
    const res = await axios.get("http://localhost:5000/api/admission/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAdmissions(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/admission/${id}/status`,
      { admissionStatus: status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadAdmissions();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">🎓 Admissions</h2>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-purple-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Course</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map(a => (
              <tr key={a._id}>
                <td className="p-3 border">{a.name}</td>
                <td className="p-3 border">{a.course}</td>
                <td className="p-3 border">{a.admissionStatus}</td>
                <td className="p-3 border space-x-2">
                  <button onClick={() => updateStatus(a._id, "Approved")} className="btn bg-green-600 text-white px-3 py-1 rounded">Approve</button>
                  <button onClick={() => updateStatus(a._id, "Rejected")} className="btn bg-red-600 text-white px-3 py-1 rounded">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
