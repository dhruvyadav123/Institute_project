// src/pages/Users.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { buildApiUrl } from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    const res = await axios.get(buildApiUrl("/admin/users"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>

      {users.map((user) => (
        <div key={user._id}>
          {user.name} - {user.role}
        </div>
      ))}
    </div>
  );
};

export default Users;
