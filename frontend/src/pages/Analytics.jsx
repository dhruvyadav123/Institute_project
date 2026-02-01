// src/pages/Analytics.jsx
import axios from "axios";
import { useEffect, useState } from "react";

const Analytics = () => {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/analytics", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h2>Analytics</h2>
      <p>Total Users: {stats.total}</p>
      <p>Active Users: {stats.active}</p>
      <p>Inactive Users: {stats.inactive}</p>
      <p>Admins: {stats.admins}</p>
    </div>
  );
};

export default Analytics;
