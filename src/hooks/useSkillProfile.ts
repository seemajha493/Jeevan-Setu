import { useState, useEffect } from "react";

export interface SkillProfile {
  skills: string[];
  otherSkills: string;
  education: string;
  disabilities: string[];
  workPreference: string;
}

const STORAGE_KEY = "jeevan-setu-skill-profile";

export const useSkillProfile = () => {
  const [profile, setProfile] = useState<SkillProfile | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProfile(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const saveProfile = (data: SkillProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setProfile(data);
  };

  const clearProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
  };

  return { profile, saveProfile, clearProfile };
};
