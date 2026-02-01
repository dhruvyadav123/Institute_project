// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
  if (!paymentMethod) {
    alert("Please select a payment method");
    return;
  }

  try {
    // Send request to backend to update admission status
    await axios.put(
      `http://localhost:5000/api/admission/${admissionId}`,
      { status: "Approved" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert(`Payment successful via ${paymentMethod}`);
    setStep(3); // Move to PDF download step
  } catch (err) {
    console.error(err);
    alert("Payment failed. Please try again.");
  }
};


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      // Save token and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Redirect based on role
      if (res.data.role.toLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const goToSignup = () => navigate("/signup");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md"
        >
          Login
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={goToSignup}
            className="text-blue-600 font-semibold cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
