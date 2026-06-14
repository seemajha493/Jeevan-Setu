import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Heart, 
  ArrowRight, 
  Quote,
  Briefcase,
  GraduationCap,
  Home,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

interface SuccessStory {
  id: string;
  name: string;
  beforeSituation: string;
  story: string;
  currentWork: string;
  transformation: string;
  photoUrl?: string;
  ngoPartner?: string;
  yearsAgo: number;
  tags: string[];
}

const successStories: SuccessStory[] = [
  {
    id: "1",
    name: "Ramesh Kumar",
    beforeSituation: "Lived under a flyover for 3 years after losing his job as a construction worker",
    story: "When volunteers from Jeevan Setu found me, I had lost all hope. They connected me with Ashray Foundation who provided shelter and helped me recover from my health issues. Through their skill training program, I learned tailoring.",
    currentWork: "Head Tailor at a garment factory in Noida",
    transformation: "From homeless to leading a team of 12 tailors",
    ngoPartner: "Ashray Foundation",
    yearsAgo: 2,
    tags: ["Employment", "Skill Training", "Shelter"]
  },
  {
    id: "2",
    name: "Lakshmi Devi",
    beforeSituation: "Single mother with two children, sleeping at railway stations",
    story: "A kind stranger reported my situation through this platform. Within days, I was connected with a women's shelter. They helped my children get enrolled in school and trained me in cooking. The most beautiful part was finding a community that cared.",
    currentWork: "Runs her own small tiffin service, serving 50+ customers daily",
    transformation: "From railway platform to her own rented home",
    ngoPartner: "Mahila Ashray Kendra",
    yearsAgo: 1,
    tags: ["Women Empowerment", "Entrepreneurship", "Education"]
  },
  {
    id: "3",
    name: "Suresh Yadav",
    beforeSituation: "Elderly man abandoned by family, suffering from diabetes",
    story: "I thought I would die alone on the streets. A volunteer helped me get medical care first. The doctors controlled my diabetes, and then I was moved to a senior care home. I now teach younger residents to read and write.",
    currentWork: "Volunteer literacy teacher at Apna Ghar old age home",
    transformation: "From abandoned to valued community elder",
    ngoPartner: "Apna Ghar Foundation",
    yearsAgo: 3,
    tags: ["Senior Care", "Medical", "Teaching"]
  },
  {
    id: "4",
    name: "Anita & Family",
    beforeSituation: "Family of 5 displaced after floods, living in temporary camps for 8 months",
    story: "We lost everything in the floods. This platform connected us with rehabilitation support. My husband learned welding, I learned stitching, and our children are back in school. We celebrated our first Diwali in our new home last year.",
    currentWork: "Husband works at an auto workshop, Anita runs a tailoring business from home",
    transformation: "From disaster victims to thriving family",
    ngoPartner: "Sahara Rehabilitation Center",
    yearsAgo: 1,
    tags: ["Family", "Disaster Relief", "Rehabilitation"]
  },
  {
    id: "5",
    name: "Mohammed Salim",
    beforeSituation: "Former daily wage worker, became homeless after an accident left him with a leg injury",
    story: "I couldn't do physical labor anymore after my accident. Depression had taken over. Through this platform, I found not just medical support but also training in mobile phone repair. It's work I can do sitting, and I'm good at it!",
    currentWork: "Owns a small mobile repair shop near Chandni Chowk",
    transformation: "From disability despair to self-employed success",
    ngoPartner: "Umeed Skills Foundation",
    yearsAgo: 2,
    tags: ["Disability Support", "Skill Training", "Self-Employment"]
  }
];

const impactStats = [
  { number: "500+", label: "Lives Transformed", icon: Heart },
  { number: "85%", label: "Now Employed", icon: Briefcase },
  { number: "120+", label: "Started Businesses", icon: GraduationCap },
  { number: "350+", label: "Found Permanent Homes", icon: Home },
];

const SuccessStories = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-warm/30 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-hope/20 mb-6">
              <Sparkles className="w-8 h-8 text-hope" />
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              Stories of <span className="text-hope">Transformation</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Every person has a story. These are journeys from despair to dignity, 
              made possible by compassionate volunteers, dedicated NGOs, and a community that cares.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/donate">
                  <Heart className="w-4 h-4 mr-2" />
                  Support More Stories
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/report">
                  Report Someone in Need
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-card py-12 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-hope/10 mb-3">
                  <stat.icon className="w-6 h-6 text-hope" />
                </div>
                <p className="text-3xl font-bold text-hope mb-1">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {successStories.map((story, index) => (
              <div
                key={story.id}
                className={`relative bg-card rounded-3xl overflow-hidden card-shadow ${
                  index % 2 === 0 ? '' : ''
                }`}
              >
                {/* Story Card */}
                <div className="p-6 md:p-10">
                  {/* Before Badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="outline" className="bg-muted/50 text-muted-foreground">
                      {story.yearsAgo} {story.yearsAgo === 1 ? 'year' : 'years'} ago
                    </Badge>
                    {story.ngoPartner && (
                      <Badge className="bg-hope/20 text-hope border-0">
                        <Users className="w-3 h-3 mr-1" />
                        {story.ngoPartner}
                      </Badge>
                    )}
                  </div>

                  {/* Name & Before Situation */}
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {story.name}
                  </h3>
                  
                  <div className="bg-muted/30 rounded-xl p-4 mb-6 border-l-4 border-muted-foreground/30">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Before
                    </p>
                    <p className="text-foreground/80">{story.beforeSituation}</p>
                  </div>

                  {/* Story Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-hope/20" />
                    <p className="text-lg text-foreground leading-relaxed pl-6 italic">
                      "{story.story}"
                    </p>
                  </div>

                  {/* Transformation Arrow */}
                  <div className="flex items-center justify-center my-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-hope/30 to-transparent" />
                    <div className="mx-4 flex items-center justify-center w-10 h-10 rounded-full bg-hope/20">
                      <ArrowRight className="w-5 h-5 text-hope" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-hope/30 to-transparent" />
                  </div>

                  {/* After - Current Work */}
                  <div className="bg-hope/10 rounded-xl p-4 mb-6 border-l-4 border-hope">
                    <p className="text-sm font-medium text-hope uppercase tracking-wide mb-1">
                      Today
                    </p>
                    <p className="text-lg font-semibold text-foreground mb-1">
                      {story.currentWork}
                    </p>
                    <p className="text-hope font-medium">
                      ✨ {story.transformation}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-hope/20 via-warm/20 to-hope/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Help Write More Success Stories
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Every donation, every volunteer hour, every reported case can lead to 
              another life transformed. Be part of someone's journey from streets to success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/donate">
                  <Heart className="w-4 h-4 mr-2" />
                  Donate Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/volunteer">
                  Become a Volunteer
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/directory">
                  Partner as an NGO
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SuccessStories;
