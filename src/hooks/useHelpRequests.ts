import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import { getSafeErrorMessage } from "@/lib/errorUtils";
import type { CaseStatus } from "@/components/CaseStatusTracker";

export interface HelpRequest {
  id: string;
  location: string;
  city: string;
  help_types: ("food" | "shelter" | "medical")[];
  urgency: "low" | "medium" | "high";
  description: string;
  case_status: CaseStatus;
  latitude: number | null;
  longitude: number | null;
  reporter_id: string | null;
  assigned_volunteer_id: string | null;
  assigned_ngo: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewHelpRequestData {
  location: string;
  city: string;
  help_types: ("food" | "shelter" | "medical")[];
  urgency: "low" | "medium" | "high";
  description: string;
  latitude?: number;
  longitude?: number;
}

export const useHelpRequests = () => {
  const { user } = useAuth();
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHelpRequests = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("help_requests")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setHelpRequests(data || []);
    } catch (error: unknown) {
      toast.error(getSafeErrorMessage(error, "fetch"));
    } finally {
      setIsLoading(false);
    }
  };

  const createHelpRequest = async (data: NewHelpRequestData) => {
    if (!user) {
      toast.error("Please sign in to submit a help request");
      return false;
    }

    try {
      const { error } = await supabase.from("help_requests").insert({
        ...data,
        reporter_id: user.id,
      });

      if (error) throw error;
      toast.success("Help request submitted successfully!");
      await fetchHelpRequests();
      return true;
    } catch (error: unknown) {
      toast.error(getSafeErrorMessage(error, "create"));
      return false;
    }
  };

  const updateCaseStatus = async (requestId: string, newStatus: CaseStatus) => {
    if (!user) {
      toast.error("Please sign in to update status");
      return false;
    }

    try {
      const { error } = await supabase
        .from("help_requests")
        .update({ case_status: newStatus })
        .eq("id", requestId);

      if (error) throw error;
      toast.success("Case status updated!");
      await fetchHelpRequests();
      return true;
    } catch (error: unknown) {
      toast.error(getSafeErrorMessage(error, "update"));
      return false;
    }
  };

  const assignVolunteer = async (requestId: string) => {
    if (!user) {
      toast.error("Please sign in to volunteer");
      return false;
    }

    try {
      const { error } = await supabase
        .from("help_requests")
        .update({ assigned_volunteer_id: user.id })
        .eq("id", requestId);

      if (error) throw error;
      toast.success("You've been assigned to this case!");
      await fetchHelpRequests();
      return true;
    } catch (error: unknown) {
      toast.error(getSafeErrorMessage(error, "update"));
      return false;
    }
  };

  const deleteHelpRequest = async (requestId: string) => {
    if (!user) {
      toast.error("Please sign in to delete a request");
      return false;
    }

    try {
      const { error } = await supabase
        .from("help_requests")
        .delete()
        .eq("id", requestId)
        .eq("reporter_id", user.id);

      if (error) throw error;
      toast.success("Help request deleted!");
      await fetchHelpRequests();
      return true;
    } catch (error: unknown) {
      toast.error(getSafeErrorMessage(error, "delete"));
      return false;
    }
  };

  useEffect(() => {
    fetchHelpRequests();
  }, []);

  return {
    helpRequests,
    isLoading,
    fetchHelpRequests,
    createHelpRequest,
    updateCaseStatus,
    assignVolunteer,
    deleteHelpRequest,
    user,
  };
};
