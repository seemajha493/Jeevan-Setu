import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useHelpRequests } from "@/hooks/useHelpRequests";
import { 
  MapPin, 
  Camera, 
  AlertTriangle, 
  Heart,
  Utensils,
  Home,
  Stethoscope,
  Loader2,
  LogIn,
} from "lucide-react";
import { toast } from "sonner";


const helpTypes = [
  { id: "food", label: "Food & Water", icon: Utensils },
  { id: "shelter", label: "Shelter", icon: Home },
  { id: "medical", label: "Medical Aid", icon: Stethoscope },
];

const urgencyLevels = [
  { value: "low", label: "Low", description: "Person seems stable but could use help" },
  { value: "medium", label: "Medium", description: "Person needs assistance soon" },
  { value: "high", label: "High", description: "Immediate attention required" },
];

// Validation schema
const reportSchema = z.object({
  location: z.string().trim().min(5, "Location must be at least 5 characters").max(200, "Location too long"),
  city: z.string().trim().min(2, "City must be at least 2 characters").max(100, "City name too long"),
  description: z.string().trim().min(10, "Please provide more details (at least 10 characters)").max(1000, "Description too long"),
  helpTypes: z.array(z.enum(["food", "shelter", "medical"])).min(1, "Select at least one type of help"),
  urgency: z.enum(["low", "medium", "high"]),
  termsAccepted: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
});

const Report = () => {
  const navigate = useNavigate();
  const { createHelpRequest, user } = useHelpRequests();
  
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [selectedHelp, setSelectedHelp] = useState<("food" | "shelter" | "medical")[]>([]);
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  

  const toggleHelpType = (id: "food" | "shelter" | "medical") => {
    setSelectedHelp((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
    setErrors((prev) => ({ ...prev, helpTypes: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!user) {
      toast.error("Please sign in to submit a report");
      navigate("/auth");
      return;
    }

    // Validate form data
    const result = reportSchema.safeParse({
      location,
      city,
      description,
      helpTypes: selectedHelp,
      urgency,
      termsAccepted,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    const success = await createHelpRequest({
      location: result.data.location,
      city: result.data.city,
      description: result.data.description,
      help_types: result.data.helpTypes,
      urgency: result.data.urgency,
    });

    setIsSubmitting(false);

    if (success) {
      toast.success("Report submitted successfully!", {
        description: "Nearby helpers have been notified. Thank you for caring.",
      });
      navigate("/help-dashboard");
    }
  };

  return (
    <PageLayout>
      <div className="warm-gradient py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Report Someone in Need
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your report helps connect vulnerable individuals with immediate assistance. Every detail matters.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 card-shadow">
              {/* Location */}
              <div className="space-y-4 mb-8">
                <Label className="text-base font-semibold">Location Details *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter address or landmark"
                    className={`pl-10 h-12 ${errors.location ? "border-destructive" : ""}`}
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setErrors((prev) => ({ ...prev, location: "" }));
                    }}
                    maxLength={200}
                  />
                </div>
                {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                
                <Input
                  placeholder="City"
                  className={`h-12 ${errors.city ? "border-destructive" : ""}`}
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setErrors((prev) => ({ ...prev, city: "" }));
                  }}
                  maxLength={100}
                />
                {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
              </div>

              {/* Help Type */}
              <div className="space-y-4 mb-8">
                <Label className="text-base font-semibold">Type of Help Needed *</Label>
                <div className="grid grid-cols-3 gap-3">
                  {helpTypes.map((type) => {
                    const isSelected = selectedHelp.includes(type.id as "food" | "shelter" | "medical");
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => toggleHelpType(type.id as "food" | "shelter" | "medical")}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        } ${errors.helpTypes ? "border-destructive" : ""}`}
                      >
                        <type.icon className={`w-5 h-5 mx-auto mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.helpTypes && <p className="text-sm text-destructive">{errors.helpTypes}</p>}
              </div>

              {/* Urgency */}
              <div className="space-y-4 mb-8">
                <Label className="text-base font-semibold">Urgency Level *</Label>
                <RadioGroup 
                  value={urgency} 
                  onValueChange={(v) => setUrgency(v as "low" | "medium" | "high")} 
                  className="space-y-3"
                >
                  {urgencyLevels.map((level) => (
                    <label
                      key={level.value}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        urgency === level.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={level.value} className="mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground">{level.label}</span>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {/* Description */}
              <div className="space-y-4 mb-8">
                <Label className="text-base font-semibold">Additional Details *</Label>
                <Textarea
                  placeholder="Describe the situation, appearance, or any other helpful details..."
                  className={`min-h-[120px] ${errors.description ? "border-destructive" : ""}`}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors((prev) => ({ ...prev, description: "" }));
                  }}
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground text-right">{description.length}/1000</p>
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>

              {/* Photo Upload */}
              <div className="space-y-4 mb-8">
                <Label className="text-base font-semibold">Photo (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Photos help responders locate and identify the person
                  </p>
                </div>
              </div>


              {/* Disclaimer */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted mt-8 mb-8">
                <AlertTriangle className="w-5 h-5 text-moderate flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Safety First:</strong> If someone is in immediate danger, please call emergency services (112) first.
                </p>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 mb-8">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => {
                    setTermsAccepted(checked === true);
                    setErrors((prev) => ({ ...prev, termsAccepted: "" }));
                  }}
                  className={errors.termsAccepted ? "border-destructive" : ""}
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I confirm this is a genuine report and I agree to the{" "}
                  <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                </Label>
              </div>
              {errors.termsAccepted && <p className="text-sm text-destructive mb-4">{errors.termsAccepted}</p>}

              {/* Submit */}
              {user ? (
                <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              ) : (
                <Button type="button" variant="hero" size="xl" className="w-full" onClick={() => navigate("/auth")}>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In to Submit Report
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Report;
