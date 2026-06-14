import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ServicesSection from "@/components/landing/ServicesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ImpactSection from "@/components/landing/ImpactSection";
import CTASection from "@/components/landing/CTASection";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <ImpactSection />
      <ServicesSection />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
    </PageLayout>
  );
};

export default Index;
