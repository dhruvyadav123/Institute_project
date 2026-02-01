import React from "react";

import art1 from "../assets/arts1.jpeg";
import art2 from "../assets/arts2.jpg";
import art3 from "../assets/arts3.jpg";

const Arts = () => {
  const courses = [
    {
      title: "B.A. English Literature",
      text: "Study poetry, drama, novels, linguistics, and creative writing.",
      icon: "📚",
    },
    {
      title: "B.A. History",
      text: "Explore ancient, medieval, and modern world history.",
      icon: "🏛️",
    },
    {
      title: "B.A. Psychology",
      text: "Learn human behavior, mental health, counseling, and research methods.",
      icon: "🧠",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Arts <span className="text-pink-400">Department</span>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            The Arts Department nurtures creativity, communication skills,
            cultural awareness, and critical thinking in a vibrant academic environment.
          </p>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[art1, art2, art3].map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <img
                src={img}
                alt="Arts"
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Courses */}
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Courses <span className="text-pink-400">Offered</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courses.map((course, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-2 transition"
            >
              <div className="text-5xl mb-4">{course.icon}</div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-300 text-sm">{course.text}</p>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Department <span className="text-pink-400">Highlights</span>
        </h2>

        <ul className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
          {[
            "Creative writing & communication workshops",
            "Debate, theatre, and cultural programs",
            "Experienced faculty from humanities fields",
            "Skill-based learning & personality development",
            "Modern classrooms with digital learning tools",
          ].map((item, index) => (
            <li
              key={index}
              className="bg-slate-800 p-4 rounded-xl border border-slate-700"
            >
              ✔ {item}
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};

export default Arts;
