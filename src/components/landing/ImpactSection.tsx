import { TrendingUp, Home, Utensils, Stethoscope } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: TrendingUp,
    value: 850,
    suffix: "+",
    label: "Lives Touched",
    description: "Across Mumbai",
  },
  {
    icon: Home,
    value: 45,
    suffix: "+",
    label: "Shelter Provided",
    description: "Safe nights secured",
  },
  {
    icon: Utensils,
    value: 950,
    suffix: "+",
    label: "Meals Served",
    description: "Annadaan initiative",
  },
  {
    icon: Stethoscope,
    value: 120,
    suffix: "+",
    label: "Medical Aid",
    description: "Free health checkups",
  },
];

const ImpactSection = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 2500;
          const steps = 60;
          const interval = duration / steps;

          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOut = 1 - Math.pow(1 - progress, 4);

            setCounts(stats.map((stat) => Math.floor(stat.value * easeOut)));

            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-sm font-bold text-orange-600 uppercase tracking-widest mb-4 border border-orange-100 px-4 py-1.5 rounded-full bg-orange-50">
            Making a Real Difference
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Impact So Far
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Every number represents a life changed. Transparency and impact are at the core of everything we do.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-orange-100 relative">
                <stat.icon className="w-8 h-8 text-orange-600 relative z-10" />
              </div>
              <div className="font-serif text-4xl md:text-5xl font-bold mb-2 tabular-nums text-gray-900">
                {counts[index].toLocaleString()}{stat.suffix}
              </div>
              <div className="font-bold text-lg mb-2 text-gray-700 tracking-wide uppercase text-sm">{stat.label}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
