-- Create job type enum
CREATE TYPE public.job_type AS ENUM ('dailywage', 'job', 'training');

-- Create poster type enum
CREATE TYPE public.poster_type AS ENUM ('shop', 'ngo', 'individual');

-- Create job postings table
CREATE TABLE public.job_postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type job_type NOT NULL DEFAULT 'dailywage',
  poster_type poster_type NOT NULL DEFAULT 'individual',
  poster_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  hours_per_day INTEGER,
  wage TEXT,
  skills_required TEXT[] DEFAULT '{}',
  accessibility_friendly BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active job postings (public job board)
CREATE POLICY "Anyone can view active job postings"
ON public.job_postings
FOR SELECT
USING (is_active = true);

-- Policy: Authenticated users can create job postings
CREATE POLICY "Authenticated users can create job postings"
ON public.job_postings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own job postings
CREATE POLICY "Users can update their own job postings"
ON public.job_postings
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Users can delete their own job postings
CREATE POLICY "Users can delete their own job postings"
ON public.job_postings
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_job_postings_updated_at
BEFORE UPDATE ON public.job_postings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();