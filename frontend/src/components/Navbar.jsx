import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function Navbar() {
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  const academicsRef = useRef(null);
  const departmentsRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
      if (window.innerWidth > 1000) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (academicsRef.current && !academicsRef.current.contains(e.target)) {
        setAcademicsOpen(false);
      }
      if (departmentsRef.current && !departmentsRef.current.contains(e.target)) {
        setDepartmentsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const GoTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full bg-blue-600 text-white fixed top-0 left-0 z-50">
        {/* FULL WIDTH INNER */}
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link
              to="/"
              onClick={GoTop}
              className="text-xl font-bold tracking-wide"
            >
              Global Tech Institute
            </Link>

            {/* Mobile Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Desktop Menu */}
            {!isMobile && (
              <ul className="hidden lg:flex items-center space-x-6 font-medium">
                <NavLink to="/" label="Home" />
                <NavLink to="/about" label="About Us" />

                <li ref={academicsRef} className="relative">
                  <button
                    onClick={() => setAcademicsOpen(!academicsOpen)}
                    className="hover:text-yellow-300"
                  >
                    Academics
                  </button>
                  {academicsOpen && (
                    <Dropdown>
                      <DropdownLink to="/courses" label="Courses" />
                      <DropdownLink to="/admissions" label="Admissions" />
                      <DropdownLink to="/faculty" label="Faculty" />
                    </Dropdown>
                  )}
                </li>

                <li ref={departmentsRef} className="relative">
                  <button
                    onClick={() => setDepartmentsOpen(!departmentsOpen)}
                    className="hover:text-yellow-300"
                  >
                    Departments
                  </button>
                  {departmentsOpen && (
                    <Dropdown>
                      <DropdownLink to="/science" label="Science" />
                      <DropdownLink to="/engineering" label="Engineering" />
                      <DropdownLink to="/arts" label="Arts" />
                    </Dropdown>
                  )}
                </li>

                <NavLink to="/events" label="Events" />
                <NavLink to="/contact" label="Contact Us" />

                <Link
                  to="/login"
                  className="px-4 py-1 rounded bg-green-500 hover:bg-green-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1 rounded bg-cyan-500 hover:bg-cyan-600"
                >
                  Signup
                </Link>
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(false)}
      />
    </>
  );
}

export default Navbar;

/* ===== Helpers ===== */

const NavLink = ({ to, label }) => (
  <li>
    <Link to={to} className="hover:text-yellow-300">
      {label}
    </Link>
  </li>
);

const Dropdown = ({ children }) => (
  <ul className="absolute top-full left-0 bg-white text-gray-700 rounded-md shadow-lg w-44 py-2 z-50">
    {children}
  </ul>
);

const DropdownLink = ({ to, label }) => (
  <li>
    <Link to={to} className="block px-4 py-2 hover:bg-blue-100">
      {label}
    </Link>
  </li>
);
