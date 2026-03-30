import React, { memo, useMemo } from "react";
import about1 from "../assets/about1.webp";
import about2 from "../assets/about2.png";
import about3 from "../assets/about3.png";
import about4 from "../assets/about4.webp";

// -------------------------
// Card Data - Core Features
// -------------------------
const cardData = [
  {
    id: 1,
    title: "Campus Life",
    description: "Vibrant clubs, sports, and cultural events shaping student life.",
    image: about1,
    gradient: "from-blue-500/20 to-purple-500/20",
    accentColor: "text-blue-400",
  },
  {
    id: 2,
    title: "Modern Labs",
    description: "State-of-the-art labs for practical and research learning.",
    image: about2,
    gradient: "from-emerald-500/20 to-cyan-500/20",
    accentColor: "text-emerald-400",
  },
  {
    id: 3,
    title: "Expert Faculty",
    description: "Experienced professors and industry leaders guiding students.",
    image: about3,
    gradient: "from-amber-500/20 to-orange-500/20",
    accentColor: "text-amber-400",
  },
  {
    id: 4,
    title: "Achievements",
    description: "Awards, alumni success stories, and academic excellence.",
    image: about4,
    gradient: "from-rose-500/20 to-pink-500/20",
    accentColor: "text-rose-400",
  },
];

// -------------------------
// Memoized About Card
// -------------------------
const AboutCard = memo(({ title, description, image, gradient, accentColor }) => (
  <div className="group relative bg-slate-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-700 hover:border-opacity-50">
    
    {/* Gradient overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />
    
    {/* Image */}
    <div className="relative h-52 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
    </div>

    {/* Content */}
    <div className="relative p-6">
      <h3 className={`text-xl font-bold mb-2 ${accentColor} group-hover:scale-105 transition-transform`}>
        {title}
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>

      {/* Animated underline */}
      <div className={`absolute bottom-0 left-6 w-0 group-hover:w-12 h-0.5 bg-gradient-to-r ${gradient.replace("/20", "")} transition-all duration-300`} />
    </div>
  </div>
));

AboutCard.displayName = "AboutCard";

// -------------------------
// Main About Component
// -------------------------
const About = memo(() => {
  const stats = useMemo(() => [
    { label: "Years of Excellence", value: "25+", color: "text-blue-400" },
    { label: "Expert Faculty", value: "150+", color: "text-emerald-400" },
    { label: "Students Placed", value: "5000+", color: "text-amber-400" },
    { label: "Global Partners", value: "50+", color: "text-rose-400" },
  ], []);

  const coreValues = useMemo(() => [
    { icon: "💡", text: "Innovation & Creativity", color: "from-purple-500/20 to-pink-500/20" },
    { icon: "🤝", text: "Collaboration & Teamwork", color: "from-blue-500/20 to-cyan-500/20" },
    { icon: "🎯", text: "Excellence & Leadership", color: "from-amber-500/20 to-orange-500/20" },
    { icon: "🌍", text: "Global Perspective", color: "from-rose-500/20 to-pink-500/20" },
  ], []);

  return (
    <section className="relative min-h-screen bg-slate-950 text-white overflow-hidden py-24">

      {/* ---------------------- */}
      {/* Animated Floating Bubbles */}
      {/* ---------------------- */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute w-24 h-24 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce-slow`}
            style={{
              backgroundColor: ['#f472b6','#3b82f6','#14b8a6','#facc15','#a78bfa','#f87171','#22c55e','#f97316'][i % 8],
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* ---------------------- */}
        {/* Page Heading */}
        {/* ---------------------- */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Global Tech Institute
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto mt-4 leading-relaxed">
            Shaping future leaders through innovation, excellence, and global exposure. 
            We empower students with knowledge, skills, and real-world experience.
          </p>
        </div>

        {/* ---------------------- */}
        {/* Stats Section */}
        {/* ---------------------- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700 hover:border-slate-500 transition-colors">
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ---------------------- */}
        {/* About Cards */}
        {/* ---------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {cardData.map(card => <AboutCard key={card.id} {...card} />)}
        </div>

        {/* ---------------------- */}
        {/* Core Values */}
        {/* ---------------------- */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, i) => (
              <div key={i} className="group relative bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-r ${val.color} opacity-0 group-hover:opacity-60 rounded-2xl transition-opacity duration-300`} />
                <div className="relative flex items-center gap-3">
                  <span className="text-3xl">{val.icon}</span>
                  <span className="text-gray-200 font-medium">{val.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------- */}
        {/* Vision & Mission */}
        {/* ---------------------- */}
        <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Vision & Mission
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-4">
            <strong>Vision:</strong> To be a world-class institution fostering innovation, leadership, and holistic development.
          </p>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            <strong>Mission:</strong> Empower students with critical thinking, creativity, and global competencies. Encourage research, collaborations, and real-world problem-solving opportunities.
          </p>
        </div>

      </div>
    </section>
  );
});

About.displayName = "About";
export default About;
