import React from "react";
import about1 from "../assets/about1.webp";
import about2 from "../assets/about2.png";
import about3 from "../assets/about3.png";
import about4 from "../assets/about4.webp";

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-blue-400">CollegeName</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            CollegeName focuses on quality education, innovation,
            and shaping future leaders with strong values.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
            <img src={about1} alt="Campus Life" className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">Campus Life</h3>
              <p className="text-gray-300 text-sm">
                Clubs, sports, and cultural events for all-round student growth.
              </p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
            <img src={about2} alt="Modern Labs" className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">Modern Labs</h3>
              <p className="text-gray-300 text-sm">
                Advanced labs and infrastructure for practical learning.
              </p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
            <img src={about3} alt="Faculty" className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
              <p className="text-gray-300 text-sm">
                Experienced professors and industry professionals.
              </p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
            <img src={about4} alt="Achievements" className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">Achievements</h3>
              <p className="text-gray-300 text-sm">
                Awards, alumni success, and academic excellence.
              </p>
            </div>
          </div>

        </div>

        {/* Footer text */}
        <div className="mt-20 text-center">
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            Our mission is to empower students with skills, confidence,
            and knowledge to succeed globally.
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
