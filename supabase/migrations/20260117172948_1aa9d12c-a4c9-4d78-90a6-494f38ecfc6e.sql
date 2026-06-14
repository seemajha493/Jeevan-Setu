-- Add monetary_donation type to enum and add amount column
ALTER TYPE donation_type ADD VALUE 'monetary';

-- Add amount column for monetary donations
ALTER TABLE public.donations ADD COLUMN amount numeric(10,2);

-- Add payment_method and payment_reference columns
ALTER TABLE public.donations ADD COLUMN payment_method text;
ALTER TABLE public.donations ADD COLUMN payment_reference text;