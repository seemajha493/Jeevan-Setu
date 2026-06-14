import { MapPin, Bell, HandHeart, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    icon: MapPin,
    title: "Report & Locate",
    description: "Spot someone in need? Share their location and basic details through our simple form.",
    color: "bg-sky/20 text-sky",
    borderColor: "border-sky",
  },
  {
    icon: Bell,
    title: "Alert Sent",
    description: "Nearby volunteers, NGOs, and shelters are immediately notified to respond.",
    color: "bg-moderate/20 text-moderate",
    borderColor: "border-moderate",
  },
  {
    icon: HandHeart,
    title: "Help Arrives",
    description: "Verified helpers reach out with food, shelter, medical aid, or other support.",
    color: "bg-primary/20 text-primary",
    borderColor: "border-primary",
  },
  {
    icon: CheckCircle2,
    title: "Dignity Restored",
    description: "Track the outcome and see the real impact of your compassion.",
    color: "bg-hope/20 text-hope",
    borderColor: "border-hope",
  },
];

const HowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger the animation of each step
          steps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, index]);
            }, index * 200);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-orange-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-sm font-bold text-orange-600 uppercase tracking-widest mb-3">
            Simple Process, Big Impact
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Journey of Seva
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Four simple steps to bring a smile to someone's face today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line for Desktop */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-orange-200 via-green-200 to-orange-200 opacity-50 border-t border-dashed border-orange-400" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative group transition-all duration-500 ${visibleSteps.includes(index)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
            >
              <div className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-b-4 ${step.borderColor}`}>
                {/* Step Number with Pulse */}
                <div className="absolute -top-4 -right-4">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full bg-orange-600 text-white text-lg font-bold flex items-center justify-center z-10 relative shadow-md`}>
                      {index + 1}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-orange-600 animate-ping opacity-20" />
                  </div>
                </div>

                {/* Icon with Hover Animation */}
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
