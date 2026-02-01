import React from "react";

import labImg from "../assets/lab.jpg";
import researchImg from "../assets/research.webp";
import biologyImg from "../assets/biology.jpg";
import physicsImg from "../assets/physic1.jpg";
import chemistryImg from "../assets/chemistry.jpg";

function Science() {
  const programs = [
    {
      title: "B.Sc. Physics",
      desc: "Study motion, energy, quantum mechanics, astronomy and modern physics with practical lab training.",
      img: physicsImg,
    },
    {
      title: "B.Sc. Chemistry",
      desc: "Focus on organic, inorganic & physical chemistry with advanced laboratories and experiments.",
      img: chemistryImg,
    },
    {
      title: "B.Sc. Biology",
      desc: "Learn anatomy, microbiology, genetics, botany & zoology with hands-on research exposure.",
      img: biologyImg,
    },
  ];

  const features = [
    {
      title: "Advanced Laboratories",
      text: "Fully equipped Physics, Chemistry & Biology labs for practical experiments.",
      icon: "🔬",
    },
    {
      title: "Research Opportunities",
      text: "Students participate in real scientific research, internships & national projects.",
      icon: "📚",
    },
    {
      title: "Expert Faculty",
      text: "Highly qualified professors with PhDs and rich teaching & research experience.",
      icon: "👨‍🏫",
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-20">

      {/* ===== HEADER ===== */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Science <span className="text-pink-400">Department</span>
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          The Science Department focuses on innovation, research, and hands-on learning
          in Physics, Chemistry, and Biology to develop skilled researchers.
        </p>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 rounded-2xl p-8 text-center hover:-translate-y-2 transition shadow-lg"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.text}</p>
          </div>
        ))}
      </div>

      {/* ===== PROGRAMS ===== */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <h3 className="text-3xl font-bold mb-10 text-center">Our Programs</h3>

        <div className="grid md:grid-cols-3 gap-10">
          {programs.map((course, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl overflow-hidden hover:-translate-y-2 transition shadow-lg"
            >
              <img
                src={course.img}
                alt={course.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-400">{course.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== LAB FACILITIES ===== */}
      <div className="max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={labImg}
          alt="Science Lab"
          className="rounded-2xl shadow-lg"
        />

        <div>
          <h3 className="text-3xl font-bold mb-4">World-Class Laboratories</h3>
          <p className="text-gray-300 mb-4">
            Our department provides state-of-the-art labs for Physics, Chemistry,
            and Biology with modern scientific equipment.
          </p>
          <p className="text-gray-400">
            Students participate in model-making competitions, innovation projects,
            and national-level science exhibitions.
          </p>
        </div>
      </div>

      {/* ===== RESEARCH ===== */}
      <div className="max-w-7xl mx-auto px-6 mt-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-bold mb-4">Research & Innovation</h3>
          <p className="text-gray-300 mb-4">
            From molecular biology to astrophysics, students explore various scientific
            domains through research-driven learning.
          </p>
          <p className="text-gray-400">
            Opportunities include internships, publications, and projects guided by
            expert faculty members.
          </p>
        </div>

        <img
          src={researchImg}
          alt="Research"
          className="rounded-2xl shadow-lg"
        />
      </div>

    </section>
  );
}

export default Science;
