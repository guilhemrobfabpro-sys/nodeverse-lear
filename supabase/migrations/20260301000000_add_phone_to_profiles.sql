-- Add phone number fields to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS phone_country_code TEXT,
  ADD COLUMN IF NOT EXISTS phone_number TEXT;
