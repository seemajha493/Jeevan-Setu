export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      donations: {
        Row: {
          amount: number | null
          city: string
          created_at: string
          description: string | null
          donation_type: Database["public"]["Enums"]["donation_type"]
          donor_contact: string
          donor_name: string
          id: string
          payment_method: string | null
          payment_reference: string | null
          quantity: string | null
          status: Database["public"]["Enums"]["donation_status"]
          updated_at: string
        }
        Insert: {
          amount?: number | null
          city: string
          created_at?: string
          description?: string | null
          donation_type: Database["public"]["Enums"]["donation_type"]
          donor_contact: string
          donor_name: string
          id?: string
          payment_method?: string | null
          payment_reference?: string | null
          quantity?: string | null
          status?: Database["public"]["Enums"]["donation_status"]
          updated_at?: string
        }
        Update: {
          amount?: number | null
          city?: string
          created_at?: string
          description?: string | null
          donation_type?: Database["public"]["Enums"]["donation_type"]
          donor_contact?: string
          donor_name?: string
          id?: string
          payment_method?: string | null
          payment_reference?: string | null
          quantity?: string | null
          status?: Database["public"]["Enums"]["donation_status"]
          updated_at?: string
        }
        Relationships: []
      }
      help_requests: {
        Row: {
          assigned_ngo: string | null
          assigned_volunteer_id: string | null
          case_status: Database["public"]["Enums"]["case_status"]
          city: string
          created_at: string
          description: string
          help_types: Database["public"]["Enums"]["help_type"][]
          id: string
          is_active: boolean | null
          latitude: number | null
          location: string
          longitude: number | null
          reporter_id: string | null
          updated_at: string
          urgency: Database["public"]["Enums"]["urgency_level"]
        }
        Insert: {
          assigned_ngo?: string | null
          assigned_volunteer_id?: string | null
          case_status?: Database["public"]["Enums"]["case_status"]
          city: string
          created_at?: string
          description: string
          help_types?: Database["public"]["Enums"]["help_type"][]
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          location: string
          longitude?: number | null
          reporter_id?: string | null
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Update: {
          assigned_ngo?: string | null
          assigned_volunteer_id?: string | null
          case_status?: Database["public"]["Enums"]["case_status"]
          city?: string
          created_at?: string
          description?: string
          help_types?: Database["public"]["Enums"]["help_type"][]
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          reporter_id?: string | null
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Relationships: []
      }
      job_postings: {
        Row: {
          accessibility_friendly: boolean | null
          contact: string
          created_at: string
          description: string
          hours_per_day: number | null
          id: string
          is_active: boolean | null
          job_type: Database["public"]["Enums"]["job_type"]
          location: string
          poster_name: string
          poster_type: Database["public"]["Enums"]["poster_type"]
          skills_required: string[] | null
          title: string
          updated_at: string
          user_id: string | null
          wage: string | null
        }
        Insert: {
          accessibility_friendly?: boolean | null
          contact: string
          created_at?: string
          description: string
          hours_per_day?: number | null
          id?: string
          is_active?: boolean | null
          job_type?: Database["public"]["Enums"]["job_type"]
          location: string
          poster_name: string
          poster_type?: Database["public"]["Enums"]["poster_type"]
          skills_required?: string[] | null
          title: string
          updated_at?: string
          user_id?: string | null
          wage?: string | null
        }
        Update: {
          accessibility_friendly?: boolean | null
          contact?: string
          created_at?: string
          description?: string
          hours_per_day?: number | null
          id?: string
          is_active?: boolean | null
          job_type?: Database["public"]["Enums"]["job_type"]
          location?: string
          poster_name?: string
          poster_type?: Database["public"]["Enums"]["poster_type"]
          skills_required?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string | null
          wage?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          capacity: number | null
          city: string
          contact: string
          created_at: string
          created_by: string | null
          description: string | null
          email: string | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          latitude: number | null
          location: string
          longitude: number | null
          name: string
          operating_hours: string | null
          services: string[]
          type: Database["public"]["Enums"]["organization_type"]
          updated_at: string
          website: string | null
        }
        Insert: {
          capacity?: number | null
          city: string
          contact: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          location: string
          longitude?: number | null
          name: string
          operating_hours?: string | null
          services?: string[]
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string
          website?: string | null
        }
        Update: {
          capacity?: number | null
          city?: string
          contact?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          name?: string
          operating_hours?: string | null
          services?: string[]
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      case_status:
        | "registered"
        | "verified"
        | "connected_to_ngo"
        | "training_in_progress"
        | "employed"
      donation_status: "pending" | "contacted" | "completed" | "cancelled"
      donation_type:
        | "clothes"
        | "food_kit"
        | "training_sponsorship"
        | "monetary"
      help_type: "food" | "shelter" | "medical"
      job_type: "dailywage" | "job" | "training"
      organization_type: "ngo" | "shelter" | "government" | "community"
      poster_type: "shop" | "ngo" | "individual"
      urgency_level: "low" | "medium" | "high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      case_status: [
        "registered",
        "verified",
        "connected_to_ngo",
        "training_in_progress",
        "employed",
      ],
      donation_status: ["pending", "contacted", "completed", "cancelled"],
      donation_type: [
        "clothes",
        "food_kit",
        "training_sponsorship",
        "monetary",
      ],
      help_type: ["food", "shelter", "medical"],
      job_type: ["dailywage", "job", "training"],
      organization_type: ["ngo", "shelter", "government", "community"],
      poster_type: ["shop", "ngo", "individual"],
      urgency_level: ["low", "medium", "high"],
    },
  },
} as const
