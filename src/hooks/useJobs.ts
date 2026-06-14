import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import { getSafeErrorMessage } from "@/lib/errorUtils";

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  location: string;
  job_type: "dailywage" | "job" | "training";
  poster_type: "shop" | "ngo" | "individual";
  poster_name: string;
  contact: string;
  hours_per_day: number | null;
  wage: string | null;
  skills_required: string[];
  accessibility_friendly: boolean;
  is_active: boolean;
  created_at: string;
  user_id: string | null;
}

export interface NewJobData {
  title: string;
  description: string;
  location: string;
  job_type: "dailywage" | "job" | "training";
  poster_type: "shop" | "ngo" | "individual";
  poster_name: string;
  contact: string;
  hours_per_day?: number;
  wage?: string;
  skills_required: string[];
  accessibility_friendly: boolean;
}

export const useJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("job_postings")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error: unknown) {
      toast.error(getSafeErrorMessage(error, "fetch"));
    } finally {
      setIsLoading(false);
    }
  };

  const createJob = async (jobData: NewJobData) => {
    if (!user) {
      toast.error("Please sign in to post a job");
      return false;
    }

    try {
      const { error } = await supabase.from("job_postings").insert({
        ...jobData,
        user_id: user.id,
      });

      if (error) throw error;
      toast.success("Job posted successfully!");
      await fetchJobs();
      return true;
    } catch (error: unknown) {
      toast.error(getSafeErrorMessage(error, "create"));
      return false;
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!user) {
      toast.error("Please sign in to delete a job");
      return false;
    }

    try {
      const { error } = await supabase
        .from("job_postings")
        .delete()
        .eq("id", jobId)
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Job deleted successfully!");
      await fetchJobs();
      return true;
    } catch (error: unknown) {
      toast.error(getSafeErrorMessage(error, "delete"));
      return false;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return { jobs, isLoading, fetchJobs, createJob, deleteJob, user };
};
