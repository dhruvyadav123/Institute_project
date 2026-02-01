import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact <span className="text-blue-400">Us</span>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            We'd love to hear from you! Reach out for admissions, courses,
            events, or any general queries.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Left Info */}
          <div className="bg-slate-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Reach Us</h3>

            <div className="space-y-4 text-gray-300">
              <p><strong className="text-white">📍 Address:</strong> CollegeName Campus, City, State - 000000</p>
              <p><strong className="text-white">📞 Phone:</strong> +91 98765 43210</p>
              <p><strong className="text-white">📧 Email:</strong> info@collegename.edu</p>
            </div>

            <h4 className="text-xl font-semibold mt-8 mb-4">Office Hours</h4>
            <ul className="text-gray-300 space-y-2">
              <li>Mon - Fri: 9:00 AM – 5:00 PM</li>
              <li>Saturday: 9:00 AM – 1:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8 text-2xl">
              <span className="hover:text-blue-400 cursor-pointer">📘</span>
              <span className="hover:text-pink-400 cursor-pointer">📸</span>
              <span className="hover:text-sky-400 cursor-pointer">🐦</span>
              <span className="hover:text-green-400 cursor-pointer">🌐</span>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <div className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-700">
          <iframe
            title="College Map"
            className="w-full h-80"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609903584!2d72.7410996!3d19.0821978"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default Contact;
