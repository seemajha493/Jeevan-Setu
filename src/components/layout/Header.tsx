import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Shield } from "lucide-react";
import { useUserRoles } from "@/hooks/useUserRoles";
import Logo from "@/components/common/Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useUserRoles();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/report", label: "Report Case" },
    { path: "/donate", label: "Donate" },
    { path: "/volunteer", label: "Volunteer" },
    { path: "/directory", label: "NGO Directory" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>


      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-orange-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">

            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-orange-50/50 border-2 border-orange-100 flex items-center justify-center overflow-hidden p-1">
                  <Logo className="w-full h-full" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-none tracking-tight drop-shadow-sm">
                  Jeevan <span className="text-orange-600 italic">Setu</span>
                </h1>
                <span className="text-[10px] md:text-xs font-bold text-green-700 tracking-[0.3em] uppercase mt-1">
                  Bridge of Life
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-[15px] font-bold tracking-wide transition-all relative group uppercase ${isActive(link.path)
                    ? "text-orange-700"
                    : "text-gray-600 hover:text-orange-600"
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform origin-left transition-transform duration-300 ${isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold" asChild>
                <Link to="/volunteer">Join Us</Link>
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md hover:shadow-lg transition-all" asChild>
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="xl:hidden p-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="xl:hidden py-4 border-t border-gray-100 animate-fade-in bg-white absolute top-full left-0 right-0 shadow-xl z-50">
              <div className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 text-base font-bold border-l-4 transition-colors ${isActive(link.path)
                      ? "bg-orange-50 text-orange-700 border-orange-600"
                      : "text-gray-600 hover:bg-gray-50 border-transparent"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-3">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold" asChild>
                    <Link to="/donate" onClick={() => setIsMenuOpen(false)}>Donate Now</Link>
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-orange-500 text-orange-600 font-bold" asChild>
                    <Link to="/volunteer" onClick={() => setIsMenuOpen(false)}>Join as Volunteer</Link>
                  </Button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
