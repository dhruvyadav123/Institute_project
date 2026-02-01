// src/pages/Users.jsx
import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:5000/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(res.data);
  };

  const toggleStatus = async (id) => {
    await axios.put(
      `http://localhost:5000/admin/users/status/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    loadUsers(); // 🔥 auto update
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>

      {users.map(user => (
        <div key={user._id}>
          {user.name} - {user.status}
          <button onClick={() => toggleStatus(user._id)}>
            Toggle Status
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
