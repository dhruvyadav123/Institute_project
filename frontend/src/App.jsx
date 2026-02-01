import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";

/* Pages */
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Course";
import Admissions from "./pages/Admission";
import Faculty from "./pages/Faculity";
import Science from "./pages/Science";
import Engineering from "./pages/Engineering";
import Arts from "./pages/Arts";
import Events from "./pages/Event";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* Dashboards */
import AdminDashboard from "./Dashboard/AdminDashboard";
import UserDashboard from "./Dashboard/UserDashboard";

const App = () => {
  return (
    <BrowserRouter>

      {/* 🔥 SCROLL RESET FIX */}
      <ScrollToTop />

      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/science" element={<Science />} />
          <Route path="/engineering" element={<Engineering />} />
          <Route path="/arts" element={<Arts />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* ===== USER DASHBOARD ===== */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRole="User">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* ===== ADMIN DASHBOARD ===== */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
