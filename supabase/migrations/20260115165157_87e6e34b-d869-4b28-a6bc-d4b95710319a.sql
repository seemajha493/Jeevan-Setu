-- Create enum for donation types
CREATE TYPE public.donation_type AS ENUM ('clothes', 'food_kit', 'training_sponsorship');

-- Create enum for donation status
CREATE TYPE public.donation_status AS ENUM ('pending', 'contacted', 'completed', 'cancelled');

-- Create donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_contact TEXT NOT NULL,
  donation_type public.donation_type NOT NULL,
  description TEXT,
  quantity TEXT,
  city TEXT NOT NULL,
  status public.donation_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a donation offer (no auth required for low barrier)
CREATE POLICY "Anyone can submit donation offers"
ON public.donations
FOR INSERT
WITH CHECK (true);

-- Only admins can view all donations
CREATE POLICY "Admins can view all donations"
ON public.donations
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update donation status
CREATE POLICY "Admins can update donations"
ON public.donations
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();