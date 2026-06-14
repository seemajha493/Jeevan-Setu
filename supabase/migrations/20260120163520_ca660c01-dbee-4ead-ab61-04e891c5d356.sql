-- Create function to validate case status transitions (can only move forward in the workflow)
CREATE OR REPLACE FUNCTION public.validate_case_status_transition()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  status_order TEXT[] := ARRAY['registered', 'verified', 'connected_to_ngo', 'training_in_progress', 'employed'];
  old_index INT;
  new_index INT;
BEGIN
  -- Find the index of old and new status
  old_index := array_position(status_order, OLD.case_status::TEXT);
  new_index := array_position(status_order, NEW.case_status::TEXT);
  
  -- Prevent moving backward from 'employed' (terminal state)
  IF OLD.case_status = 'employed' AND NEW.case_status != 'employed' THEN
    RAISE EXCEPTION 'Cannot change status from employed - this is a terminal state';
  END IF;
  
  -- Prevent skipping more than one step forward (optional: allows flexibility for field work)
  -- Uncomment the following to enforce strict step-by-step progression:
  -- IF new_index > old_index + 1 THEN
  --   RAISE EXCEPTION 'Cannot skip status steps. Please progress through each stage.';
  -- END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for case status validation
DROP TRIGGER IF EXISTS validate_case_status_transition_trigger ON public.help_requests;
CREATE TRIGGER validate_case_status_transition_trigger
  BEFORE UPDATE ON public.help_requests
  FOR EACH ROW
  WHEN (OLD.case_status IS DISTINCT FROM NEW.case_status)
  EXECUTE FUNCTION public.validate_case_status_transition();

-- Create function to validate donation submissions (server-side validation)
CREATE OR REPLACE FUNCTION public.validate_donation_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Validate donor name length
  IF length(trim(NEW.donor_name)) < 2 THEN
    RAISE EXCEPTION 'Donor name must be at least 2 characters';
  END IF;
  
  IF length(trim(NEW.donor_name)) > 100 THEN
    RAISE EXCEPTION 'Donor name must be less than 100 characters';
  END IF;
  
  -- Validate contact length
  IF length(trim(NEW.donor_contact)) < 5 THEN
    RAISE EXCEPTION 'Contact information must be at least 5 characters';
  END IF;
  
  IF length(trim(NEW.donor_contact)) > 100 THEN
    RAISE EXCEPTION 'Contact information must be less than 100 characters';
  END IF;
  
  -- Validate city
  IF length(trim(NEW.city)) < 2 THEN
    RAISE EXCEPTION 'City must be at least 2 characters';
  END IF;
  
  IF length(trim(NEW.city)) > 100 THEN
    RAISE EXCEPTION 'City must be less than 100 characters';
  END IF;
  
  -- Validate description if provided
  IF NEW.description IS NOT NULL AND length(NEW.description) > 500 THEN
    RAISE EXCEPTION 'Description must be less than 500 characters';
  END IF;
  
  -- Validate monetary donation amount if applicable
  IF NEW.donation_type = 'monetary' AND NEW.amount IS NOT NULL THEN
    IF NEW.amount <= 0 THEN
      RAISE EXCEPTION 'Donation amount must be greater than 0';
    END IF;
    IF NEW.amount > 10000000 THEN
      RAISE EXCEPTION 'Donation amount exceeds maximum limit';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for donation validation
DROP TRIGGER IF EXISTS validate_donation_submission_trigger ON public.donations;
CREATE TRIGGER validate_donation_submission_trigger
  BEFORE INSERT ON public.donations
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_donation_submission();

-- Create function to validate job posting submissions (server-side validation)
CREATE OR REPLACE FUNCTION public.validate_job_posting()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Validate title
  IF length(trim(NEW.title)) < 3 THEN
    RAISE EXCEPTION 'Job title must be at least 3 characters';
  END IF;
  IF length(trim(NEW.title)) > 100 THEN
    RAISE EXCEPTION 'Job title must be less than 100 characters';
  END IF;
  
  -- Validate poster name
  IF length(trim(NEW.poster_name)) < 2 THEN
    RAISE EXCEPTION 'Name/organization must be at least 2 characters';
  END IF;
  IF length(trim(NEW.poster_name)) > 100 THEN
    RAISE EXCEPTION 'Name/organization must be less than 100 characters';
  END IF;
  
  -- Validate location
  IF length(trim(NEW.location)) < 5 THEN
    RAISE EXCEPTION 'Location must be at least 5 characters';
  END IF;
  IF length(trim(NEW.location)) > 200 THEN
    RAISE EXCEPTION 'Location must be less than 200 characters';
  END IF;
  
  -- Validate contact
  IF length(trim(NEW.contact)) < 10 THEN
    RAISE EXCEPTION 'Contact must be at least 10 characters';
  END IF;
  IF length(trim(NEW.contact)) > 100 THEN
    RAISE EXCEPTION 'Contact must be less than 100 characters';
  END IF;
  
  -- Validate description
  IF length(trim(NEW.description)) < 10 THEN
    RAISE EXCEPTION 'Description must be at least 10 characters';
  END IF;
  IF length(trim(NEW.description)) > 1000 THEN
    RAISE EXCEPTION 'Description must be less than 1000 characters';
  END IF;
  
  -- Validate hours per day if provided
  IF NEW.hours_per_day IS NOT NULL THEN
    IF NEW.hours_per_day < 1 OR NEW.hours_per_day > 24 THEN
      RAISE EXCEPTION 'Hours per day must be between 1 and 24';
    END IF;
  END IF;
  
  -- Validate skills array size
  IF NEW.skills_required IS NOT NULL AND array_length(NEW.skills_required, 1) > 10 THEN
    RAISE EXCEPTION 'Maximum 10 skills allowed';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for job posting validation
DROP TRIGGER IF EXISTS validate_job_posting_trigger ON public.job_postings;
CREATE TRIGGER validate_job_posting_trigger
  BEFORE INSERT OR UPDATE ON public.job_postings
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_job_posting();