// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("Token:", token);
  console.log("Role:", role);
  console.log("AllowedRole:", allowedRole);

  // Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // Role mismatch
  if (allowedRole && role?.toLowerCase() !== allowedRole.toLowerCase()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
