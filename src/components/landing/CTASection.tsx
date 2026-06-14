import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Briefcase, Gift } from "lucide-react";

const actions = [
  { icon: Heart, label: "Report", path: "/report" },
  { icon: Users, label: "Volunteer", path: "/volunteer" },
  { icon: Briefcase, label: "Jobs", path: "/jobs" },
  { icon: Gift, label: "Donate", path: "/donate" },
];

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-stone-950">
      {/* Background Image with Heavy Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1532629345422-7515f4d16335?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-20 filter blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/90 via-stone-950/80 to-stone-950/90"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <div className="mb-14">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-600/20 mb-8 border border-orange-500/30 ring-4 ring-orange-900/20">
              <Heart className="w-8 h-8 text-orange-500 fill-orange-500" />
            </div>

            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Ready to Be the <span className="text-orange-500 italic">Change</span>?
            </h2>

            <p className="text-xl text-stone-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of compassionate citizens transforming lives. Every contribution brings us closer to a brighter India.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button size="xl" asChild className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-10 py-7 rounded-full text-lg shadow-lg hover:shadow-orange-900/20 transition-all duration-300 min-w-[200px]">
                <Link to="/donate">
                  Donate Now
                  <Heart className="w-5 h-5 ml-2 fill-current" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="border-stone-600 text-stone-300 hover:text-white hover:bg-stone-800 hover:border-stone-500 font-semibold px-10 py-7 rounded-full text-lg transition-all duration-300 min-w-[200px] bg-transparent">
                <Link to="/volunteer">
                  Join as Volunteer
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Action Cards - Simple & Elegant */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-stone-800 pt-10">
            {actions.map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-stone-900/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center group-hover:border-orange-500/50 group-hover:text-orange-500 transition-colors text-stone-400">
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-stone-400 group-hover:text-white transition-colors text-sm uppercase tracking-wide">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
