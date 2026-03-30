import React, { memo, useMemo, useState, useCallback } from "react";

// Memoized Event Card Component
const EventCard = memo(({ event, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamic gradients based on index
  const gradients = [
    "from-blue-500/10 via-purple-500/10 to-pink-500/10",
    "from-emerald-500/10 via-cyan-500/10 to-teal-500/10",
    "from-amber-500/10 via-orange-500/10 to-red-500/10",
    "from-violet-500/10 via-purple-500/10 to-fuchsia-500/10",
    "from-rose-500/10 via-pink-500/10 to-orange-500/10"
  ];
  
  const borderColors = [
    "hover:border-blue-400/50",
    "hover:border-emerald-400/50",
    "hover:border-amber-400/50",
    "hover:border-violet-400/50",
    "hover:border-rose-400/50"
  ];
  
  const iconColors = [
    "text-blue-400",
    "text-emerald-400",
    "text-amber-400",
    "text-violet-400",
    "text-rose-400"
  ];

  return (
    <div
      className="group relative bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-700 hover:border-opacity-50 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
      
      {/* Icon with animation */}
      <div className="relative">
        <div className={`text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${iconColors[index % iconColors.length]}`}>
          {event.icon}
        </div>
        
        {/* Date badge */}
        <div className="absolute -top-2 -right-2 bg-pink-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold border border-pink-500/30">
          <span className="text-pink-300">{event.date.split(",")[0]}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
          {event.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{event.date}</span>
          <span className="text-gray-600">|</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.place}</span>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">
          {event.desc}
        </p>
      </div>

      {/* Interactive button */}
      <div className="relative mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1">
          Register Now
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';

// Memoized Gallery Component
const GalleryImage = memo(({ src, index, onClick }) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
      onClick={() => onClick(index)}
    >
      <img
        src={src}
        alt={`Event gallery ${index + 1}`}
        className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Overlay with zoom icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';

const Event = memo(() => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Memoized events data with icons as components for better performance
  const events = useMemo(() => [
    {
      title: "Science Fair 2025",
      date: "March 15th, 2025",
      place: "Main Hall",
      icon: "🔬",
      desc: "Showcase innovative science projects, research work, and model presentations.",
      category: "Academic"
    },
    {
      title: "Engineering Workshop",
      date: "April 10th, 2025",
      place: "Lab Block",
      icon: "🛠️",
      desc: "Hands-on workshop on robotics, IoT, AI tools, and mechanical models.",
      category: "Technical"
    },
    {
      title: "Arts Exhibition",
      date: "May 5th, 2025",
      place: "Gallery",
      icon: "🎨",
      desc: "A colorful exhibition of painting, sculpture, photography, and craft.",
      category: "Cultural"
    },
    {
      title: "Cultural Fest 2025",
      date: "June 20th, 2025",
      place: "Open Ground",
      icon: "🎉",
      desc: "Music, dance, drama, fashion show, and talent performances.",
      category: "Cultural"
    },
    {
      title: "Annual Sports Meet",
      date: "August 12th, 2025",
      place: "Sports Ground",
      icon: "🏅",
      desc: "Athletics, cricket, football, badminton, indoor games, and more.",
      category: "Sports"
    },
  ], []);

  // Memoized gallery data with high-quality Unsplash images
  const gallery = useMemo(() => [
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
      title: "Annual Science Fair"
    },
    {
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop",
      title: "Technical Workshop"
    },
    {
      url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop",
      title: "Cultural Fest Performance"
    },
    {
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop",
      title: "Robotics Competition"
    },
    {
      url: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&auto=format&fit=crop",
      title: "Art Exhibition"
    },
    {
      url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
      title: "Sports Meet"
    }
  ], []);

  // Memoized highlights data
  const highlights = useMemo(() => [
    {
      text: "Workshops and expert guest lectures",
      icon: "🎯",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      text: "Inter-college competitions & hackathons",
      icon: "💻",
      color: "from-emerald-500/20 to-emerald-600/20"
    },
    {
      text: "Creative cultural and art programs",
      icon: "🎭",
      color: "from-amber-500/20 to-amber-600/20"
    },
    {
      text: "Sports events & leadership activities",
      icon: "⚽",
      color: "from-rose-500/20 to-rose-600/20"
    },
    {
      text: "Professional event coordination",
      icon: "🎪",
      color: "from-violet-500/20 to-violet-600/20"
    },
    {
      text: "International guest speakers",
      icon: "🌍",
      color: "from-cyan-500/20 to-cyan-600/20"
    }
  ], []);

  const handleImageClick = useCallback((index) => {
    setSelectedImage(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Category filter state
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => ["All", "Academic", "Technical", "Cultural", "Sports"], []);

  const filteredEvents = useMemo(() => {
    if (filter === "All") return events;
    return events.filter(event => event.category === filter);
  }, [filter, events]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-20 overflow-hidden">
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Enhanced Title Section */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                Events
              </span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 mx-auto rounded-full" />
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto mt-8 leading-relaxed">
            Our college organizes academic, cultural, technical, and sports
            events throughout the year to enhance creativity, leadership, and
            teamwork among students.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === category
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 scale-105"
                  : "bg-slate-800/50 backdrop-blur-sm text-gray-300 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Counter */}
        <div className="text-center mb-8">
          <span className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-300 border border-slate-700">
            {filteredEvents.length} Events Found
          </span>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredEvents.map((event, index) => (
            <EventCard key={`${event.title}-${index}`} event={event} index={index} />
          ))}
        </div>

        {/* Event Highlights with Icons */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Event Highlights
              </span>
            </h2>
            <div className="h-0.5 w-20 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300`} />
                <div className="relative flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-200 font-medium">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Event Gallery
              </span>
            </h2>
            <p className="text-gray-400">Moments captured from our previous events</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <GalleryImage
                key={index}
                src={item.url}
                index={index}
                onClick={handleImageClick}
              />
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-6xl w-full">
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={gallery[selectedImage].url}
                alt="Enlarged event"
                className="w-full h-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <p className="text-white text-center mt-4 text-lg">
                {gallery[selectedImage].title}
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
});

Event.displayName = 'Event';

export default Event;