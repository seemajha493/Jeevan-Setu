import { Quote, Star, ArrowRight, Stamp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "For 2 years, the railway station was my only home. Jeevan Setu volunteers found me, gave me food, and helped me find a shelter. Today, I work as a security guard.",
    name: "Rajesh Kumar",
    role: "Beneficiary",
    location: "Mumbai Central",
    date: "Oct 12, 2025",
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=2000&auto=format&fit=crop"
  },
  {
    quote: "I always wanted to help but didn't know how. Through this platform, I reported a homeless old lady near my office. She is now safe in 'Apna Ghar' ashram.",
    name: "Anjali Sharma",
    role: "Citizen Volunteer",
    location: "Andheri West",
    date: "Nov 05, 2025",
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=2000&auto=format&fit=crop"
  },
  {
    quote: "Coordinating with other NGOs was difficult. This digital bridge has made resource sharing so easy. We can now help 3x more people.",
    name: "Seva Sankalp NGO",
    role: "Partner Organization",
    location: "Navi Mumbai",
    date: "Jan 15, 2026",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop"
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    setIsFlipping(true);
    setRotation((prev) => prev - 180);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsFlipping(false);
    }, 400); // Sync change with flip midpoint
  };

  const currentTestimonial = testimonials[activeIndex];
  // Determine if showing front or back based on rotation for visual logic (simplified for effect)
  // Actually, we flip the whole container 180deg. 
  // For a continuous loop effect in 3D, we need two faces.
  // To keep it simple and robust: We animate a "Newspaper Page Turn" effect using keyframes or transitions.

  // Revised approach for simpler, robust 3D flip:
  // We rotate the container. But to show *new* content, we need to swap content when it's hidden (at 90deg).

  return (
    <section className="py-20 md:py-32 bg-[#e8e4db] overflow-hidden relative">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block border-y-2 border-black py-1 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] font-newspaper">The Daily Chronicle</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 mb-6 relative inline-block">
            Voices of Change
            <span className="absolute -top-6 -right-8 opacity-80 transform rotate-12">
              <div className="border-2 border-red-700 text-red-700 px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm transform rotate-[-5deg]">
                Special Feature
              </div>
            </span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg font-newspaper italic">
            "Real stories from the streets of India, brought to light."
          </p>
        </div>

        {/* 3D Newspaper Container */}
        <div className="max-w-5xl mx-auto perspective-1000 group">
          <div
            className="relative w-full transition-transform duration-1000 transform-style-3d hover:translate-y-[-5px]"
            onClick={handleNext}
          >

            {/* The Newspaper Clipping */}
            <div className={`bg-newspaper newspaper-shadow p-8 md:p-12 max-w-4xl mx-auto transition-all duration-700 relative overflow-hidden ${isFlipping ? 'opacity-80 scale-95' : 'opacity-100 scale-100'}`}>

              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 pointer-events-none"></div>

              {/* Top Meta Bar */}
              <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-8 font-newspaper text-xs md:text-sm text-gray-600 uppercase tracking-widest">
                <span>{currentTestimonial.location}</span>
                <span className="font-bold text-black border-x-2 border-black px-4 mx-4 flex-1 text-center">Impact Report Vol. {activeIndex + 1}</span>
                <span>{currentTestimonial.date}</span>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative">

                {/* Left Column: Image & Bio */}
                <div className="md:w-1/3 flex flex-col">
                  {/* Photo Frame */}
                  <div className="p-2 bg-white shadow-sm border border-gray-200 transform rotate-[-2deg] mb-6">
                    <div className="relative overflow-hidden grayscale contrast-125 sepia-[.3]">
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-full aspect-[4/5] object-cover"
                      />
                      <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="text-center font-newspaper">
                    <h3 className="font-bold text-xl text-gray-900 border-b border-gray-300 pb-2 mb-2 inline-block">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 italic">{currentTestimonial.role}</p>
                  </div>
                </div>

                {/* Right Column: Article */}
                <div className="md:w-2/3 relative">
                  <Quote className="absolute -top-4 -left-4 w-12 h-12 text-gray-200 fill-current transform rotate-180" />

                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    "A Life Transformed Through Compassion"
                  </h3>

                  <div className="font-newspaper text-lg text-gray-800 leading-loose text-justify relative z-10 columns-1 md:columns-1 gap-8">
                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-orange-900 first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:font-serif">
                      {currentTestimonial.quote}
                    </p>
                  </div>

                  {/* Stamp */}
                  <div className="absolute bottom-0 right-0 transform rotate-[-15deg] opacity-70">
                    <div className="border-4 border-dashed border-green-700 text-green-700 rounded-full w-32 h-32 flex items-center justify-center p-2">
                      <div className="text-center">
                        <Stamp className="w-8 h-8 mx-auto mb-1" />
                        <span className="block text-[10px] font-bold uppercase tracking-widest">Verified</span>
                        <span className="block text-xs font-bold">Trust Badge</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Footer */}
              <div className="mt-12 pt-4 border-t-2 border-black flex justify-between items-center font-newspaper text-xs text-gray-500">
                <span>Page 0{activeIndex + 1}</span>
                <span className="bg-black text-white px-2 py-0.5 text-[10px] uppercase tracking-wider">Restoration</span>
                <span>Jeevan Setu Archives</span>
              </div>

            </div>

            {/* Stack Effect (Pages behind) */}
            <div className="absolute top-2 left-2 right-[-8px] bottom-[-8px] bg-[#e5e0d3] border border-gray-300 z-[-1] rounded-sm transform rotate-1"></div>
            <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px] bg-[#dcd6c5] border border-gray-300 z-[-2] rounded-sm transform rotate-2"></div>

          </div>
        </div>

        {/* Navigation / Flip Indicator */}
        <div className="flex justify-center mt-12 gap-6">
          <Button
            variant="ghost"
            onClick={handleNext}
            className="text-gray-500 hover:text-orange-700 font-newspaper italic hover:bg-transparent group"
          >
            Read Next Story <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
