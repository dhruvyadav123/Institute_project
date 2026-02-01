import React from "react";

const Event = () => {
  const events = [
    {
      title: "Science Fair 2025",
      date: "March 15th, 2025",
      place: "Main Hall",
      icon: "🔬",
      desc: "Showcase innovative science projects, research work, and model presentations.",
    },
    {
      title: "Engineering Workshop",
      date: "April 10th, 2025",
      place: "Lab Block",
      icon: "🛠️",
      desc: "Hands-on workshop on robotics, IoT, AI tools, and mechanical models.",
    },
    {
      title: "Arts Exhibition",
      date: "May 5th, 2025",
      place: "Gallery",
      icon: "🎨",
      desc: "A colorful exhibition of painting, sculpture, photography, and craft.",
    },
    {
      title: "Cultural Fest 2025",
      date: "June 20th, 2025",
      place: "Open Ground",
      icon: "🎉",
      desc: "Music, dance, drama, fashion show, and talent performances.",
    },
    {
      title: "Annual Sports Meet",
      date: "August 12th, 2025",
      place: "Sports Ground",
      icon: "🏅",
      desc: "Athletics, cricket, football, badminton, indoor games, and more.",
    },
  ];

  const gallery = [
    "https://i.ibb.co/pn7c6M7/event1.jpg",
    "https://i.ibb.co/k0K1ck5/event2.jpg",
    "https://i.ibb.co/kBZdHn3/event3.jpg",
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== Title ===== */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming <span className="text-pink-400">Events</span>
          </h1>
          <p className="text-gray-300 max-w-4xl mx-auto text-lg">
            Our college organizes academic, cultural, technical, and sports
            events throughout the year to enhance creativity, leadership, and
            teamwork among students.
          </p>
        </div>

        {/* ===== Events Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {events.map((e, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition"
            >
              <div className="text-5xl mb-4">{e.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{e.title}</h3>
              <p className="text-sm text-gray-400 mb-3">
                {e.date} | {e.place}
              </p>
              <p className="text-gray-300 text-sm">{e.desc}</p>
            </div>
          ))}
        </div>

        {/* ===== Highlights ===== */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-pink-400">
            Event Highlights
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
            <li className="bg-slate-700 p-4 rounded-lg">
              Workshops and expert guest lectures
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              Inter-college competitions & hackathons
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              Creative cultural and art programs
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              Sports events & leadership activities
            </li>
            <li className="bg-slate-700 p-4 rounded-lg">
              Professional event coordination
            </li>
          </ul>
        </div>

        {/* ===== Gallery ===== */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-pink-400">
            Event Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl shadow-lg"
              >
                <img
                  src={img}
                  alt="Event"
                  className="w-full h-64 object-cover hover:scale-110 transition"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Event;
