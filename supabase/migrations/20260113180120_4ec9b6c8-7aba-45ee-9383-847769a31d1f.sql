-- Create urgency level enum
CREATE TYPE public.urgency_level AS ENUM ('low', 'medium', 'high');

-- Create help type enum
CREATE TYPE public.help_type AS ENUM ('food', 'shelter', 'medical');

-- Create case status enum
CREATE TYPE public.case_status AS ENUM ('registered', 'verified', 'connected_to_ngo', 'training_in_progress', 'employed');

-- Create help requests table
CREATE TABLE public.help_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  help_types help_type[] NOT NULL DEFAULT '{}',
  urgency urgency_level NOT NULL DEFAULT 'medium',
  description TEXT NOT NULL,
  case_status case_status NOT NULL DEFAULT 'registered',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_volunteer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_ngo TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active help requests (public dashboard)
CREATE POLICY "Anyone can view active help requests"
ON public.help_requests
FOR SELECT
USING (is_active = true);

-- Policy: Authenticated users can create help requests
CREATE POLICY "Authenticated users can create help requests"
ON public.help_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = reporter_id);

-- Policy: Users can update requests they reported or are assigned to
CREATE POLICY "Users can update their own or assigned requests"
ON public.help_requests
FOR UPDATE
TO authenticated
USING (auth.uid() = reporter_id OR auth.uid() = assigned_volunteer_id);

-- Policy: Only reporters can delete their requests
CREATE POLICY "Users can delete their own requests"
ON public.help_requests
FOR DELETE
TO authenticated
USING (auth.uid() = reporter_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_help_requests_updated_at
BEFORE UPDATE ON public.help_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for demonstration
INSERT INTO public.help_requests (location, city, help_types, urgency, description, case_status) VALUES
('Near Central Railway Station, Platform 4', 'Mumbai', ARRAY['food', 'medical']::help_type[], 'high', 'Elderly man, appears malnourished and has a visible injury on his leg. Needs immediate medical attention and food.', 'registered'),
('Under Bandra Flyover', 'Mumbai', ARRAY['shelter']::help_type[], 'medium', 'Family of three including a young child. Looking for temporary shelter and warm clothing.', 'verified'),
('Dadar Station West Exit', 'Mumbai', ARRAY['food']::help_type[], 'low', 'Young woman sitting near the exit, seems hungry. Has been there for a few hours.', 'connected_to_ngo'),
('Churchgate Station Entrance', 'Mumbai', ARRAY['medical', 'shelter']::help_type[], 'high', 'Man in his 40s, showing signs of fever and distress. Needs medical checkup and safe place to rest.', 'training_in_progress'),
('Near Andheri Bus Depot', 'Mumbai', ARRAY['food', 'shelter']::help_type[], 'medium', 'Group of 3 elderly individuals who need food and temporary shelter for the night.', 'employed');