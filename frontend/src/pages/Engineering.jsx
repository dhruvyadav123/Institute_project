import React from "react";

import eng1 from "../assets/eng1.jpg";
import eng2 from "../assets/eng2.jpg";
import eng3 from "../assets/eng3.jpg";

const Engineering = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== Title ===== */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Engineering <span className="text-blue-400">Department</span>
          </h1>
          <p className="text-gray-300 max-w-4xl mx-auto text-lg">
            The Engineering Department is committed to delivering high-quality
            technical education with strong focus on innovation, research, and
            hands-on practical learning for future-ready engineers.
          </p>
        </div>

        {/* ===== Highlights ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition">
            <img
              src={eng1}
              alt="Engineering Lab"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">
                Modern Computer Labs
              </h3>
              <p className="text-gray-300 text-sm">
                Fully equipped labs with high-performance systems and
                industry-level software for coding, AI, ML, algorithms, and
                development practices.
              </p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition">
            <img
              src={eng2}
              alt="Workshops"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">
                Industry-Oriented Workshops
              </h3>
              <p className="text-gray-300 text-sm">
                Regular workshops on Robotics, IoT, Ethical Hacking, Cloud
                Computing, Cybersecurity, Mechanical Design, and Data Science.
              </p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition">
            <img
              src={eng3}
              alt="Seminars"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">
                Expert Seminars & Training
              </h3>
              <p className="text-gray-300 text-sm">
                Sessions by professionals from Google, Infosys, TCS, and
                Microsoft to prepare students for real-world engineering
                challenges.
              </p>
            </div>
          </div>
        </div>

        {/* ===== Courses Offered ===== */}
        <div className="mb-14">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">
            Courses Offered
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
            <li className="bg-slate-700 p-4 rounded-lg">
              B.Tech in Computer Engineering
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              B.Tech in Mechanical Engineering
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              B.Tech in Civil Engineering
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              B.Tech in Electrical Engineering
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              B.Tech in Electronics & Communication Engineering
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              Diploma in Engineering (All Branches)
            </li>
          </ul>
        </div>

        {/* ===== Facilities ===== */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-blue-400">
            Department Facilities
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
            <li className="bg-slate-700 p-4 rounded-lg">
              Smart Classrooms with Digital Boards
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              Advanced Laboratories & Research Centers
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              Project & Innovation Labs
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              Library with Technical Books & e-Resources
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              Placement Training & Internships
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              24x7 High-Speed Internet & Wi-Fi
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default Engineering;
