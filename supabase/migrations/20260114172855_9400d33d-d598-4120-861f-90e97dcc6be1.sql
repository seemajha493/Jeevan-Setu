-- Create enum for organization types
CREATE TYPE public.organization_type AS ENUM ('ngo', 'shelter', 'government', 'community');

-- Create table for NGO/Shelter directory
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type organization_type NOT NULL DEFAULT 'ngo',
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  contact TEXT NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  is_verified BOOLEAN DEFAULT false,
  capacity INTEGER,
  description TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  website TEXT,
  email TEXT,
  operating_hours TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Anyone can view active organizations
CREATE POLICY "Anyone can view active organizations"
ON public.organizations
FOR SELECT
USING (is_active = true);

-- Authenticated users can create organizations
CREATE POLICY "Authenticated users can create organizations"
ON public.organizations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Users can update their own organizations
CREATE POLICY "Users can update their own organizations"
ON public.organizations
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);

-- Users can delete their own organizations
CREATE POLICY "Users can delete their own organizations"
ON public.organizations
FOR DELETE
TO authenticated
USING (auth.uid() = created_by);

-- Create trigger for updated_at
CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON public.organizations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();