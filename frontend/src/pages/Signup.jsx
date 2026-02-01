// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ navigation
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate(); // ✅ router hook
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );
      alert(res.data.message);
      navigate("/login"); // ✅ signup success -> login page
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const goToLogin = () => {
    navigate("/login"); // ✅ login text click -> login page
  };

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
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create User Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
        />

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
          Sign Up
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={goToLogin}
            className="text-blue-600 font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
