-- Add validation trigger for organizations table contact field
-- This prevents URL injection attacks by ensuring contact is phone/email format

CREATE OR REPLACE FUNCTION public.validate_organization()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Validate name
  IF length(trim(NEW.name)) < 2 THEN
    RAISE EXCEPTION 'Organization name must be at least 2 characters';
  END IF;
  IF length(trim(NEW.name)) > 200 THEN
    RAISE EXCEPTION 'Organization name must be less than 200 characters';
  END IF;
  
  -- Validate location
  IF length(trim(NEW.location)) < 5 THEN
    RAISE EXCEPTION 'Location must be at least 5 characters';
  END IF;
  IF length(trim(NEW.location)) > 200 THEN
    RAISE EXCEPTION 'Location must be less than 200 characters';
  END IF;
  
  -- Validate city
  IF length(trim(NEW.city)) < 2 THEN
    RAISE EXCEPTION 'City must be at least 2 characters';
  END IF;
  IF length(trim(NEW.city)) > 100 THEN
    RAISE EXCEPTION 'City must be less than 100 characters';
  END IF;
  
  -- Validate contact - must be phone number or email format
  -- Phone: starts with optional +, contains only digits, spaces, dashes, parentheses
  -- Email: standard email format
  IF NOT (
    NEW.contact ~ '^[\+]?[0-9\s\-\(\)]{10,50}$' 
    OR NEW.contact ~ '^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
  ) THEN
    RAISE EXCEPTION 'Contact must be a valid phone number or email address';
  END IF;
  
  -- Validate description if provided
  IF NEW.description IS NOT NULL AND length(NEW.description) > 1000 THEN
    RAISE EXCEPTION 'Description must be less than 1000 characters';
  END IF;
  
  -- Validate website if provided - basic URL format check
  IF NEW.website IS NOT NULL AND length(NEW.website) > 0 THEN
    IF NOT (
      NEW.website ~ '^https?://' 
      OR NEW.website ~ '^[a-zA-Z0-9][a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}'
    ) THEN
      RAISE EXCEPTION 'Website must be a valid URL';
    END IF;
    IF length(NEW.website) > 500 THEN
      RAISE EXCEPTION 'Website URL must be less than 500 characters';
    END IF;
  END IF;
  
  -- Validate email if provided
  IF NEW.email IS NOT NULL AND length(NEW.email) > 0 THEN
    IF NOT NEW.email ~ '^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$' THEN
      RAISE EXCEPTION 'Email must be a valid email address';
    END IF;
  END IF;
  
  -- Validate capacity if provided
  IF NEW.capacity IS NOT NULL THEN
    IF NEW.capacity < 1 OR NEW.capacity > 100000 THEN
      RAISE EXCEPTION 'Capacity must be between 1 and 100000';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER validate_organization_trigger
  BEFORE INSERT OR UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_organization();