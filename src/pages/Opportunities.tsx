import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  IndianRupee,
  Building2,
  CheckCircle2
} from "lucide-react";

const opportunities = [
  {
    id: 1,
    title: "Kitchen Helper",
    employer: "Annapurna Community Kitchen",
    location: "Dadar, Mumbai",
    type: "Full-time",
    salary: "₹12,000 - ₹15,000/month",
    duration: "Permanent",
    description: "Help with food preparation, cleaning, and serving in our community kitchen that serves 500+ meals daily.",
    requirements: ["No prior experience needed", "Willingness to learn", "Basic hygiene awareness"],
    benefits: ["Free meals", "Accommodation provided", "Weekly payment option"],
  },
  {
    id: 2,
    title: "Warehouse Assistant",
    employer: "Hope Logistics",
    location: "Bhiwandi, Mumbai",
    type: "Full-time",
    salary: "₹14,000 - ₹18,000/month",
    duration: "Permanent",
    description: "Sort, pack, and organize goods in our warehouse. Training provided for all tasks.",
    requirements: ["Physical fitness", "Punctuality", "Team player"],
    benefits: ["Transport provided", "Health insurance", "Career growth"],
  },
  {
    id: 3,
    title: "Daily Wage - Construction Helper",
    employer: "BuildRight Foundation",
    location: "Various Locations, Mumbai",
    type: "Daily Wage",
    salary: "₹500 - ₹600/day",
    duration: "Project-based",
    description: "Assist skilled workers at construction sites. Daily payment available.",
    requirements: ["Physical ability to lift weights", "Basic safety awareness"],
    benefits: ["Same-day payment", "Lunch provided", "Safety gear provided"],
  },
  {
    id: 4,
    title: "Gardener / Landscaping Helper",
    employer: "Green Mumbai Initiative",
    location: "South Mumbai",
    type: "Part-time",
    salary: "₹8,000 - ₹10,000/month",
    duration: "Permanent",
    description: "Maintain gardens, plant saplings, and help with urban greening projects across the city.",
    requirements: ["Interest in gardening", "Outdoor work capability"],
    benefits: ["Flexible hours", "Skill training", "Tools provided"],
  },
];

const Opportunities = () => {
  return (
    <PageLayout>
      <div className="warm-gradient py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-moderate/20 mb-6">
              <Briefcase className="w-8 h-8 text-moderate" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Work Opportunities
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Dignified employment opportunities that help rebuild lives with purpose and financial independence.
            </p>
          </div>

          {/* Opportunity Cards */}
          <div className="max-w-4xl mx-auto space-y-6">
            {opportunities.map((job) => (
              <div
                key={job.id}
                className="bg-card rounded-2xl p-6 md:p-8 card-shadow hover:elevated-shadow transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    {/* Title & Employer */}
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                          {job.title}
                        </h3>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="w-4 h-4" />
                        <span>{job.employer}</span>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <IndianRupee className="w-4 h-4 text-primary" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        {job.duration}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4">
                      {job.description}
                    </p>

                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Requirements:</h4>
                      <ul className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-1 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="bg-hope/10 text-hope border-hope/30">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <Button variant="hero" size="lg" className="lg:self-center">
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Opportunities;
