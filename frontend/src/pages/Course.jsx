import React from "react";

import physicsImg from "../assets/physic.jpg";
import computerImg from "../assets/computer.webp";
import englishImg from "../assets/english.webp";

const Course = () => {
  const courses = [
    {
      title: "B.Sc. Physics",
      text: "Explore the laws of nature and understand physical phenomena through theory and experiments.",
      img: physicsImg,
    },
    {
      title: "B.Tech Computer Engineering",
      text: "Innovative program focusing on software development, AI, and modern computing technologies.",
      img: computerImg,
    },
    {
      title: "B.A. English Literature",
      text: "Develop critical thinking, creative writing, and deep understanding of classic and modern literature.",
      img: englishImg,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-blue-400">Courses</span>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Discover a wide range of undergraduate programs designed to
            prepare students for academic excellence and professional success.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition"
            >
              <img
                src={course.img}
                alt={course.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">
                  {course.title}
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  {course.text}
                </p>

                <button className="inline-block px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-medium">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Course;
