import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Target, 
  Eye, 
  Users, 
  Shield, 
  Sparkles,
  ArrowRight
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We believe every person deserves kindness and care, regardless of their circumstances.",
  },
  {
    icon: Shield,
    title: "Dignity",
    description: "We treat everyone with respect and work to restore self-worth through our services.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Together we're stronger. We unite volunteers, NGOs, and citizens for greater impact.",
  },
  {
    icon: Sparkles,
    title: "Hope",
    description: "We believe in second chances and the potential for positive change in every life.",
  },
];

const About = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-gradient-hope">Jeevan Setu</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Jeevan Setu — meaning "Bridge of Life" — is a social impact initiative connecting communities 
              to help homeless individuals near railway stations and roads find dignity, shelter, and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mission */}
            <div className="bg-background rounded-2xl p-8 card-shadow">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To create a responsive network that rapidly connects homeless individuals with immediate 
                assistance — food, shelter, medical care, and dignified work opportunities — through 
                technology and community collaboration.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-background rounded-2xl p-8 card-shadow">
              <div className="w-14 h-14 rounded-xl bg-sky/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-sky" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A society where no one is invisible. Where every person in distress on our streets 
                finds a helping hand within hours, not days. Where homelessness becomes a temporary 
                challenge, not a permanent condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 md:py-24 warm-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              The Problem We're Solving
            </h2>
            <div className="bg-card rounded-2xl p-8 card-shadow">
              <p className="text-muted-foreground leading-relaxed mb-6">
                India has an estimated <strong className="text-foreground">1.8 million homeless people</strong>, with thousands 
                living near railway stations and major roads in every city. Despite the efforts of NGOs 
                and government programs, many individuals remain unreached due to:
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <span><strong className="text-foreground">Lack of visibility</strong> — Many don't know who to contact or how to help</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <span><strong className="text-foreground">Fragmented resources</strong> — NGOs work in silos without coordination</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <span><strong className="text-foreground">Delayed response</strong> — Critical hours are lost finding appropriate help</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <span><strong className="text-foreground">Stigma and apathy</strong> — Society often looks away instead of acting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-background rounded-2xl p-6 text-center card-shadow hover:elevated-shadow transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Join Our Mission
            </h2>
            <p className="text-muted-foreground mb-10">
              Whether you want to volunteer, donate, or simply report someone in need — 
              every action creates a ripple of positive change.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/report" className="group">
                  Start Helping
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/directory">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
