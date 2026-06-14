import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { GraduationCap, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import SkillProfilingSection from "@/components/SkillProfilingSection";
import { useSkillProfile } from "@/hooks/useSkillProfile";

const SkillProfiling = () => {
  const navigate = useNavigate();
  const { profile, saveProfile } = useSkillProfile();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [education, setEducation] = useState("");
  const [disabilities, setDisabilities] = useState<string[]>([]);
  const [otherSkills, setOtherSkills] = useState("");
  const [workPreference, setWorkPreference] = useState("flexible");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved profile on mount
  useEffect(() => {
    if (profile) {
      setSelectedSkills(profile.skills);
      setEducation(profile.education);
      setDisabilities(profile.disabilities);
      setOtherSkills(profile.otherSkills);
      setWorkPreference(profile.workPreference);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSkills.length === 0 && !otherSkills.trim()) {
      toast.error("Please select at least one skill or describe your abilities");
      return;
    }

    if (!education) {
      toast.error("Please select your education level");
      return;
    }

    setIsSubmitting(true);

    // Save profile to localStorage for job matching
    saveProfile({
      skills: selectedSkills,
      otherSkills,
      education,
      disabilities,
      workPreference,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
    toast.success("Profile saved successfully!", {
      description: "Go to Jobs to see matched opportunities.",
    });
    navigate("/jobs");
  };

  return (
    <PageLayout>
      <div className="warm-gradient py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Skill & Interest Profiling
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Help us understand your skills and interests so we can match you with the right employment and training opportunities.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { title: "Job Matching", desc: "Get matched with suitable jobs" },
                { title: "Training Access", desc: "Find relevant skill programs" },
                { title: "NGO Support", desc: "Connect with helping organizations" },
              ].map((item) => (
                <div key={item.title} className="bg-card rounded-xl p-4 card-shadow text-center">
                  <CheckCircle className="w-5 h-5 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 card-shadow">
              <SkillProfilingSection
                selectedSkills={selectedSkills}
                onSkillsChange={setSelectedSkills}
                education={education}
                onEducationChange={setEducation}
                disabilities={disabilities}
                onDisabilitiesChange={setDisabilities}
                otherSkills={otherSkills}
                onOtherSkillsChange={setOtherSkills}
                workPreference={workPreference}
                onWorkPreferenceChange={setWorkPreference}
              />

              <div className="mt-8">
                <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting Profile...
                    </>
                  ) : (
                    "Submit My Profile"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SkillProfiling;
