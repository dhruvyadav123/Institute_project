import React from "react";

function Faculity() {
  const members = [
    {
      name: "Dr. Anil Sharma",
      role: "Head of Science Department",
      qualification: "Ph.D. in Physics, M.Sc. Physics",
      experience: "15+ Years",
      specialty: "Quantum Physics, Astrophysics",
      icon: "🔬",
    },
    {
      name: "Prof. Rohan Verma",
      role: "Senior Engineering Faculty",
      qualification: "M.Tech Computer Engineering, B.Tech CE",
      experience: "10+ Years",
      specialty: "Software Engineering, AI & Machine Learning",
      icon: "💻",
    },
    {
      name: "Ms. Sakshi Kapoor",
      role: "Arts & Literature Faculty",
      qualification: "M.A. English Literature, B.A. English",
      experience: "8+ Years",
      specialty: "Poetry, Creative Writing, Drama Studies",
      icon: "📚",
    },
    {
      name: "Dr. Priya Mehta",
      role: "Chemistry Professor",
      qualification: "Ph.D. Organic Chemistry",
      experience: "12+ Years",
      specialty: "Organic Chemistry & Research",
      icon: "⚗️",
    },
    {
      name: "Prof. Kunal Tiwari",
      role: "Computer Science Lecturer",
      qualification: "MCA, BCA",
      experience: "7+ Years",
      specialty: "Web Development, Data Structures",
      icon: "🖥️",
    },
    {
      name: "Dr. Neha Gulati",
      role: "Mathematics Professor",
      qualification: "Ph.D. Applied Mathematics",
      experience: "11+ Years",
      specialty: "Calculus, Statistics, Linear Algebra",
      icon: "📐",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== Title ===== */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-pink-400">Faculty</span>
          </h1>
          <p className="text-gray-300 max-w-4xl mx-auto text-lg">
            Our faculty members are experienced professionals dedicated to
            excellence in education, research, and student development.
          </p>
        </div>

        {/* ===== Faculty Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {members.map((fac, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition"
            >
              <div className="text-5xl mb-4">{fac.icon}</div>

              <h3 className="text-2xl font-semibold">{fac.name}</h3>
              <p className="text-pink-400 font-medium mb-3">{fac.role}</p>

              <p className="text-sm text-gray-300 mb-1">
                <strong>Qualification:</strong> {fac.qualification}
              </p>
              <p className="text-sm text-gray-300 mb-1">
                <strong>Experience:</strong> {fac.experience}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Specialization:</strong> {fac.specialty}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Faculity;
