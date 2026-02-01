import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.webp";
import aboutImg from "../assets/home.jpg";
import scienceImg from "../assets/science.jpg";
import engineeringImg from "../assets/engineering.webp";
import artsImg from "../assets/arts.jpg";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  const slides = [
    {
      img: slide1,
      title: "Welcome to Global Tech Institute",
      text: "Empowering students for a brighter future",
      link: "/admissions",
      btn: "Apply Now",
    },
    {
      img: slide2,
      title: "Innovative Learning",
      text: "Explore science & engineering excellence",
      link: "/about",
      btn: "Learn More",
    },
    {
      img: slide3,
      title: "Arts & Creativity",
      text: "Fostering imagination and expression",
      link: "/arts",
      btn: "Explore Arts",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-slate-950 text-white">

      {/* ================= HERO (navbar height = 64px) ================= */}
      <section className="w-full h-[calc(100vh-64px)] pt-16 overflow-hidden">
        <Slider {...settings}>
          {slides.map((s, i) => (
            <div key={i} className="w-full h-[calc(100vh-64px)]">
              <div className="relative w-full h-full">
                <img
                  src={s.img}
                  alt="slide"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      {s.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-6">
                      {s.text}
                    </p>
                    <Link
                      to={s.link}
                      className="inline-block bg-pink-500 hover:bg-pink-600 px-8 py-3 rounded-full font-semibold transition"
                    >
                      {s.btn}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 px-6">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              About <span className="text-pink-400">Global Tech Institute</span>
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Global Tech Institute has been providing quality education for over 50 years,
              focusing on excellence, innovation, and leadership.
            </p>
            <Link
              to="/about"
              className="bg-pink-500 px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition"
            >
              Learn More
            </Link>
          </div>

          <img
            src={aboutImg}
            alt="About"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* ================= ACADEMICS ================= */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-12">Our Academics</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                img: scienceImg,
                title: "Science",
                text: "Physics, Chemistry, Biology & research programs",
                link: "/science",
              },
              {
                img: engineeringImg,
                title: "Engineering",
                text: "Computer, Mechanical & Electrical Engineering",
                link: "/engineering",
              },
              {
                img: artsImg,
                title: "Arts",
                text: "Literature, History & Fine Arts studies",
                link: "/arts",
              },
            ].map((c, i) => (
              <Link
                to={c.link}
                key={i}
                className="bg-slate-800 rounded-2xl overflow-hidden hover:-translate-y-2 transition shadow-lg"
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{c.title}</h3>
                  <p className="text-gray-300">{c.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-screen-lg mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-10">Upcoming Events</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-800 p-6 rounded-xl">
              <h4 className="text-xl font-semibold">Science Fair 2025</h4>
              <p className="text-gray-400">March 15th | Main Hall</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl">
              <h4 className="text-xl font-semibold">Engineering Workshop</h4>
              <p className="text-gray-400">April 10th | Lab Block</p>
            </div>
          </div>

          <Link
            to="/events"
            className="inline-block bg-pink-500 px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition"
          >
            View All Events
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
