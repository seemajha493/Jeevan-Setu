import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, MapPin, Sparkles, Play } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  // Animated counter effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount1(Math.floor(850 * easeOut)); // Lives Impacted
      setCount2(Math.floor(12 * easeOut));   // Partner NGOs
      setCount3(Math.floor(3 * easeOut));    // Cities Covered

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
          alt="Group of Indian children in a rural village"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-4xl">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-200 mb-8 animate-fade-in shadow-md">
            <div className="relative">
              <span className="w-2 h-2 bg-orange-600 rounded-full animate-ping absolute inline-flex h-full w-full opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
            </div>
            <span className="text-sm font-bold text-orange-800 tracking-wide uppercase">
              Seva • Sahyog • Samarpan
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in leading-tight" style={{ animationDelay: "0.1s" }}>
            Be the <span className="text-orange-500">Hope</span> for<br />
            Someone's <span className="text-green-500">Tomorrow</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-10 leading-relaxed animate-fade-in font-medium" style={{ animationDelay: "0.2s" }}>
            Join India's largest movement to support the homeless. Connect, donate, and volunteer to bring dignity to every life on the streets.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="default" size="xl" className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300 w-full sm:w-auto" asChild>
              <Link to="/donate">
                Donate Now
                <Heart className="ml-2 w-5 h-5 fill-current" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6 rounded-full w-full sm:w-auto" asChild>
              <Link to="/volunteer">
                Join as Volunteer
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-3xl border-t border-gray-700 pt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-white tabular-nums mb-1">
                {count1.toLocaleString()}+
              </div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Lives Impacted</div>
            </div>
            <div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-white tabular-nums mb-1">
                {count2}+
              </div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">NGO Partners</div>
            </div>
            <div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-white tabular-nums mb-1">
                {count3}+
              </div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
