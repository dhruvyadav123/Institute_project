import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* College Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            CollegeName
          </h3>
          <p className="text-sm leading-relaxed">
            Providing quality education since 1990. Your future starts here!
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-5">
            <SocialIcon Icon={Facebook} />
            <SocialIcon Icon={Instagram} />
            <SocialIcon Icon={Twitter} />
            <SocialIcon Icon={Linkedin} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <FooterLink href="/" label="Home" />
            <FooterLink href="/about" label="About Us" />
            <FooterLink href="/courses" label="Courses" />
            <FooterLink href="/contact" label="Contact" />
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Contact
          </h4>
          <p className="text-sm mb-2">📧 info@college.com</p>
          <p className="text-sm mb-2">📞 +91 123 456 7890</p>
          <p className="text-sm">
            📍 123 College Road, City, Country
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Newsletter
          </h4>
          <p className="text-sm mb-3">
            Subscribe to get latest updates & news.
          </p>

          <form className="flex items-center bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white flex items-center justify-center"
            >
              <Mail size={18} />
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} CollegeName. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

/* ===== Helper Components ===== */

const SocialIcon = ({ Icon }) => (
  <a
    href="#"
    className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors"
  >
    <Icon size={18} />
  </a>
);

const FooterLink = ({ href, label }) => (
  <li>
    <a
      href={href}
      className="hover:text-white transition"
    >
      {label}
    </a>
  </li>
);
