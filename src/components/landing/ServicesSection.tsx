import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, Heart, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: MapPin,
    image: "/village-rescue.jpg",
    title: "Village Rescue & Relief",
    description: "Reaching the remotest hamlets/bastis to identify and aid the elderly and destitute who have no support system.",
    action: "Report Need",
    link: "/report",
    color: "text-orange-600",
    badge: "Gramin Seva"
  },
  {
    icon: Users,
    image: "https://images.unsplash.com/photo-1606914502844-48208f041b6d?q=80&w=2070&auto=format&fit=crop",
    title: "Community Langar",
    description: "Providing hot, nutritious meals (Dal-Chawal, Roti) to daily wagers and families in distress across rural belts.",
    action: "Sponsor a Meal",
    link: "/donate",
    color: "text-green-600",
    badge: "Annadaan"
  },
  {
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
    title: "Swayam Rojgar",
    description: "Empowering village women with sewing machines and handicraft training to make them financially independent.",
    action: "Support Skills",
    link: "/jobs",
    color: "text-blue-600",
    badge: "Mahila Sashaktikaran"
  },
  {
    icon: Heart,
    image: "https://images.unsplash.com/photo-1588058365815-c281313783a3?q=80&w=2070&auto=format&fit=crop",
    title: "Gram Sahayog Network",
    description: "Collaborating with local Panchayats and SHGs to ensure government schemes and aid reach the last mile.",
    action: "Join Network",
    link: "/directory",
    color: "text-red-500",
    badge: "Grassroots"
  },
];

const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          services.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 150);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-orange-50/50 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ea580c 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-orange-600 uppercase tracking-widest mb-3">
            Holistic Development
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Key Initiatives
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            From emergency rescue to sustainable livelihood, we support every step of the journey towards restoration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group flex flex-col ${visibleCards.includes(index)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            >
              {/* Image Area */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-full text-gray-800 shadow-sm">
                    {service.badge}
                  </span>
                </div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className={`p-2 bg-white rounded-full w-fit mb-2 ${service.color}`}>
                    <service.icon className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link
                    to={service.link}
                    className={`inline-flex items-center text-sm font-bold ${service.color} hover:underline decoration-2 underline-offset-4 transition-all`}
                  >
                    {service.action}
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
