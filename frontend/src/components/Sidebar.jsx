import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown, LogIn, UserPlus } from "lucide-react";

function Sidebar({ isOpen, toggleSidebar }) {
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 text-white z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:hidden flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          <h2 className="text-lg font-bold">Institute</h2>
          <button onClick={toggleSidebar}>
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <nav className="px-5 py-4 text-sm font-medium overflow-y-auto flex-1 space-y-4">
          <NavLink to="/" label="Home" onClick={toggleSidebar} />
          <NavLink to="/about" label="About Us" onClick={toggleSidebar} />

          {/* Academics */}
          <div>
            <button
              onClick={() => setAcademicsOpen(!academicsOpen)}
              className="flex w-full items-center justify-between py-2"
            >
              <span>Academics</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  academicsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {academicsOpen && (
              <div className="ml-4 mt-2 space-y-2 text-gray-300">
                <SubLink to="/courses" label="Courses" onClick={toggleSidebar} />
                <SubLink to="/admissions" label="Admissions" onClick={toggleSidebar} />
                <SubLink to="/faculty" label="Faculty" onClick={toggleSidebar} />
              </div>
            )}
          </div>

          {/* Departments */}
          <div>
            <button
              onClick={() => setDepartmentsOpen(!departmentsOpen)}
              className="flex w-full items-center justify-between py-2"
            >
              <span>Departments</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  departmentsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {departmentsOpen && (
              <div className="ml-4 mt-2 space-y-2 text-gray-300">
                <SubLink to="/science" label="Science" onClick={toggleSidebar} />
                <SubLink to="/engineering" label="Engineering" onClick={toggleSidebar} />
                <SubLink to="/arts" label="Arts" onClick={toggleSidebar} />
              </div>
            )}
          </div>

          <NavLink to="/events" label="Events" onClick={toggleSidebar} />
          <NavLink to="/contact" label="Contact Us" onClick={toggleSidebar} />

          {/* Divider */}
          <div className="border-t border-slate-700 pt-4 mt-4 space-y-3">
            <AuthLink
              to="/login"
              label="Login"
              icon={<LogIn size={18} />}
              onClick={toggleSidebar}
            />
            <AuthLink
              to="/signup"
              label="Signup"
              icon={<UserPlus size={18} />}
              onClick={toggleSidebar}
            />
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

/* ===== Helper Components ===== */

const NavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block py-2 hover:text-yellow-300 transition"
  >
    {label}
  </Link>
);

const SubLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block py-1 hover:text-white transition"
  >
    {label}
  </Link>
);

const AuthLink = ({ to, label, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 py-2 px-3 rounded-md
               bg-slate-800 hover:bg-slate-700 transition"
  >
    {icon}
    <span>{label}</span>
  </Link>
);
