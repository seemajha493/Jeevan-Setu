import { z } from "zod";

/**
 * Validation schema for job posting form
 * Ensures data quality and prevents malicious input
 */
export const jobPostingSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  poster_name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  poster_type: z.enum(["shop", "ngo", "individual"]),
  location: z
    .string()
    .trim()
    .min(5, "Location must be at least 5 characters")
    .max(200, "Location must be less than 200 characters"),
  contact: z
    .string()
    .trim()
    .min(10, "Contact must be at least 10 characters")
    .max(100, "Contact must be less than 100 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  job_type: z.enum(["dailywage", "job", "training"]),
  hours_per_day: z
    .number()
    .min(1, "Hours must be at least 1")
    .max(24, "Hours cannot exceed 24")
    .optional()
    .nullable(),
  wage: z
    .string()
    .max(50, "Wage description must be less than 50 characters")
    .optional()
    .nullable(),
  skills_required: z
    .array(z.string().max(50))
    .max(10, "Maximum 10 skills allowed"),
  accessibility_friendly: z.boolean(),
});

export type JobPostingFormData = z.infer<typeof jobPostingSchema>;

/**
 * Validation helper that returns field-specific error messages
 */
export function validateJobPosting(data: unknown): {
  success: boolean;
  data?: JobPostingFormData;
  errors?: Record<string, string>;
} {
  const result = jobPostingSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors: Record<string, string> = {};
  result.error.errors.forEach((err) => {
    const path = err.path.join(".");
    errors[path] = err.message;
  });
  
  return { success: false, errors };
}
