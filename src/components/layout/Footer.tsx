import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/common/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 pt-20 pb-10 text-white border-t-4 border-orange-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-orange-500 p-1">
                <Logo className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-bold text-white leading-none tracking-tight">
                  Jeevan <span className="text-orange-500 italic">Setu</span>
                </span>
                <span className="text-[10px] text-green-400 tracking-[0.3em] uppercase font-bold mt-1">
                  Bridge of Life
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering India's homeless population with dignity, shelter, and opportunities. Join us in building a nation where everyone has a roof over their head.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                <img src="https://simpleicons.org/icons/facebook.svg" className="w-4 h-4 invert opacity-70" alt="FB" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                <img src="https://simpleicons.org/icons/twitter.svg" className="w-4 h-4 invert opacity-70" alt="TW" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                <img src="https://simpleicons.org/icons/instagram.svg" className="w-4 h-4 invert opacity-70" alt="IG" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg border-l-4 border-orange-500 pl-3">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { path: "/about", label: "About Us" },
                { path: "/report", label: "Report a Case" },
                { path: "/volunteer", label: "Volunteer Registration" },
                { path: "/donate", label: "Make a Donation" },
                { path: "/success-stories", label: "Impact Stories" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-500 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg border-l-4 border-green-500 pl-3">Emergency Helplines</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <div className="p-2 rounded bg-gray-800 text-red-500 mt-1">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-gray-500 text-xs uppercase font-bold">Police / Emergency</span>
                  <strong className="text-white text-lg">112</strong>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="p-2 rounded bg-gray-800 text-pink-500 mt-1">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-gray-500 text-xs uppercase font-bold">Women Helpline</span>
                  <strong className="text-white text-lg">1091</strong>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="p-2 rounded bg-gray-800 text-blue-500 mt-1">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-gray-500 text-xs uppercase font-bold">Child Helpline</span>
                  <strong className="text-white text-lg">1098</strong>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg border-l-4 border-orange-500 pl-3">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <div className="mt-1">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-gray-400 leading-relaxed">
                  Head Office: 45/A, Seva Bhavan,<br />
                  Andheri East, Mumbai,<br />
                  Maharashtra - 400069
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-orange-500" />
                <span className="text-gray-400">support@jeevansetu.org</span>
              </li>
              <li className="text-xs text-gray-500 mt-4 leading-relaxed">
                Registered under Indian Trusts Act, 1882.<br />
                80G & 12A Certified.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Jeevan Setu Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-gray-500 hover:text-white text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
