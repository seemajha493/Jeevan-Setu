import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChefHat,
  ShoppingBag,
  Sparkles,
  Car,
  Scissors,
  Paintbrush,
  Shield,
  Wrench,
  Baby,
  Laptop,
  Truck,
  Accessibility,
  GraduationCap,
  Building,
} from "lucide-react";

const skills = [
  { id: "cooking", label: "Cooking", icon: ChefHat },
  { id: "selling", label: "Selling Items", icon: ShoppingBag },
  { id: "cleaning", label: "Cleaning", icon: Sparkles },
  { id: "driving", label: "Driving", icon: Car },
  { id: "stitching", label: "Stitching / Tailoring", icon: Scissors },
  { id: "painting", label: "Painting", icon: Paintbrush },
  { id: "guarding", label: "Security / Guarding", icon: Shield },
  { id: "repair", label: "Repair / Maintenance", icon: Wrench },
  { id: "childcare", label: "Childcare", icon: Baby },
  { id: "computer", label: "Computer Skills", icon: Laptop },
  { id: "delivery", label: "Delivery / Logistics", icon: Truck },
  { id: "construction", label: "Construction Work", icon: Building },
];

const educationLevels = [
  { value: "none", label: "No formal education" },
  { value: "primary", label: "Primary school" },
  { value: "secondary", label: "Secondary school" },
  { value: "higher", label: "Higher education / Graduate" },
];

const disabilityTypes = [
  { id: "none", label: "No disability" },
  { id: "visual", label: "Visual impairment" },
  { id: "hearing", label: "Hearing impairment" },
  { id: "mobility", label: "Mobility impairment" },
  { id: "cognitive", label: "Cognitive / Learning disability" },
  { id: "chronic", label: "Chronic illness" },
  { id: "other", label: "Other" },
];

interface SkillProfilingSectionProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  education: string;
  onEducationChange: (education: string) => void;
  disabilities: string[];
  onDisabilitiesChange: (disabilities: string[]) => void;
  otherSkills: string;
  onOtherSkillsChange: (skills: string) => void;
  workPreference: string;
  onWorkPreferenceChange: (preference: string) => void;
}

const SkillProfilingSection = ({
  selectedSkills,
  onSkillsChange,
  education,
  onEducationChange,
  disabilities,
  onDisabilitiesChange,
  otherSkills,
  onOtherSkillsChange,
  workPreference,
  onWorkPreferenceChange,
}: SkillProfilingSectionProps) => {
  const toggleSkill = (id: string) => {
    onSkillsChange(
      selectedSkills.includes(id)
        ? selectedSkills.filter((s) => s !== id)
        : [...selectedSkills, id]
    );
  };

  const toggleDisability = (id: string) => {
    if (id === "none") {
      onDisabilitiesChange(disabilities.includes("none") ? [] : ["none"]);
    } else {
      const newDisabilities = disabilities.filter((d) => d !== "none");
      onDisabilitiesChange(
        newDisabilities.includes(id)
          ? newDisabilities.filter((d) => d !== id)
          : [...newDisabilities, id]
      );
    }
  };

  return (
    <div className="space-y-8 border-t border-border pt-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">Skill & Interest Profiling</h3>
          <p className="text-sm text-muted-foreground">Helps match with suitable employment opportunities</p>
        </div>
      </div>

      {/* Skills Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">What can they do? (Select all that apply)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skills.map((skill) => {
            const isSelected = selectedSkills.includes(skill.id);
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => toggleSkill(skill.id)}
                className={`p-3 rounded-xl border-2 transition-all text-left flex items-center gap-2 ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <skill.icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {skill.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Other Skills */}
        <Textarea
          placeholder="Any other skills? (e.g., farming, music, crafts...)"
          value={otherSkills}
          onChange={(e) => onOtherSkillsChange(e.target.value)}
          className="min-h-[60px] mt-3"
        />
      </div>

      {/* Education Level */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Education Level</Label>
        <RadioGroup value={education} onValueChange={onEducationChange} className="grid grid-cols-2 gap-3">
          {educationLevels.map((level) => (
            <label
              key={level.value}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                education === level.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value={level.value} />
              <span className={`text-sm font-medium ${education === level.value ? "text-primary" : "text-foreground"}`}>
                {level.label}
              </span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Work Preference */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Work Preference</Label>
        <RadioGroup value={workPreference} onValueChange={onWorkPreferenceChange} className="grid grid-cols-3 gap-3">
          {[
            { value: "fulltime", label: "Full-time" },
            { value: "parttime", label: "Part-time" },
            { value: "flexible", label: "Flexible" },
          ].map((pref) => (
            <label
              key={pref.value}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                workPreference === pref.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value={pref.value} className="sr-only" />
              <span className={`text-sm font-medium ${workPreference === pref.value ? "text-primary" : "text-foreground"}`}>
                {pref.label}
              </span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Disability */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Accessibility className="w-4 h-4 text-muted-foreground" />
          <Label className="text-base font-semibold">Any Disability or Health Condition?</Label>
        </div>
        <p className="text-sm text-muted-foreground -mt-2">
          This helps find accessible and suitable opportunities
        </p>
        <div className="grid grid-cols-2 gap-3">
          {disabilityTypes.map((type) => {
            const isSelected = disabilities.includes(type.id);
            return (
              <label
                key={type.id}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleDisability(type.id)}
                />
                <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {type.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillProfilingSection;
