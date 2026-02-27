
-- Create profiles table for leaderboard
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE,
  display_name TEXT NOT NULL DEFAULT 'Learner',
  avatar_url TEXT,
  level INTEGER NOT NULL DEFAULT 1,
  xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  challenges_completed INTEGER NOT NULL DEFAULT 0,
  badges TEXT[] NOT NULL DEFAULT '{}',
  last_active_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Everyone can view profiles (for leaderboard)
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow anonymous inserts (for localStorage-based users without auth)
CREATE POLICY "Allow anonymous profile creation" ON public.profiles FOR INSERT WITH CHECK (user_id IS NULL);

-- Allow anonymous updates
CREATE POLICY "Allow anonymous profile updates" ON public.profiles FOR UPDATE USING (user_id IS NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with realistic learner data for leaderboard
INSERT INTO public.profiles (display_name, level, xp, streak, lessons_completed, challenges_completed, badges, last_active_date) VALUES
  ('Sarah M.', 8, 19500, 21, 42, 18, ARRAY['first_steps','node_ninja','ai_whisperer','on_fire','iron_will'], CURRENT_DATE),
  ('Ahmed B.', 7, 15200, 14, 38, 15, ARRAY['first_steps','node_ninja','ai_whisperer','on_fire'], CURRENT_DATE),
  ('John K.', 9, 28400, 45, 48, 22, ARRAY['first_steps','node_ninja','ai_whisperer','system_architect','on_fire','iron_will','webhook_wizard'], CURRENT_DATE),
  ('Lucas T.', 5, 6800, 5, 22, 8, ARRAY['first_steps','node_ninja','on_fire'], CURRENT_DATE - INTERVAL '1 day'),
  ('Emma R.', 6, 9200, 12, 28, 11, ARRAY['first_steps','node_ninja','on_fire','data_wrangler'], CURRENT_DATE),
  ('James P.', 4, 4500, 8, 18, 6, ARRAY['first_steps','node_ninja'], CURRENT_DATE - INTERVAL '2 days'),
  ('Lina C.', 3, 2800, 3, 12, 4, ARRAY['first_steps'], CURRENT_DATE - INTERVAL '1 day'),
  ('David W.', 6, 10500, 7, 30, 13, ARRAY['first_steps','node_ninja','ai_whisperer','on_fire'], CURRENT_DATE),
  ('Sophie L.', 5, 7100, 15, 24, 9, ARRAY['first_steps','node_ninja','on_fire'], CURRENT_DATE),
  ('Marcus T.', 3, 2200, 4, 10, 3, ARRAY['first_steps'], CURRENT_DATE - INTERVAL '3 days'),
  ('Nina F.', 7, 14800, 18, 36, 16, ARRAY['first_steps','node_ninja','ai_whisperer','on_fire','gpt_whisperer'], CURRENT_DATE),
  ('Omar H.', 8, 20100, 30, 44, 19, ARRAY['first_steps','node_ninja','ai_whisperer','system_architect','on_fire','iron_will'], CURRENT_DATE),
  ('Clara Z.', 4, 3900, 6, 16, 5, ARRAY['first_steps','node_ninja'], CURRENT_DATE),
  ('Felix D.', 10, 36500, 60, 50, 25, ARRAY['first_steps','node_ninja','ai_whisperer','system_architect','automation_master','on_fire','iron_will','webhook_wizard','data_wrangler','gpt_whisperer'], CURRENT_DATE),
  ('Yuki S.', 6, 8700, 9, 26, 10, ARRAY['first_steps','node_ninja','on_fire'], CURRENT_DATE - INTERVAL '1 day'),
  ('Priya K.', 5, 5800, 11, 20, 7, ARRAY['first_steps','node_ninja','on_fire'], CURRENT_DATE),
  ('Leo M.', 7, 13200, 22, 34, 14, ARRAY['first_steps','node_ninja','ai_whisperer','on_fire','iron_will'], CURRENT_DATE),
  ('Amara O.', 4, 4100, 2, 15, 5, ARRAY['first_steps'], CURRENT_DATE - INTERVAL '4 days'),
  ('Chen W.', 8, 21300, 35, 45, 20, ARRAY['first_steps','node_ninja','ai_whisperer','system_architect','on_fire','iron_will'], CURRENT_DATE),
  ('Isabella R.', 3, 1900, 1, 8, 2, ARRAY['first_steps'], CURRENT_DATE - INTERVAL '5 days'),
  ('Kai N.', 9, 26800, 40, 47, 21, ARRAY['first_steps','node_ninja','ai_whisperer','system_architect','on_fire','iron_will','bug_hunter'], CURRENT_DATE),
  ('Mia L.', 5, 6200, 10, 21, 8, ARRAY['first_steps','node_ninja','on_fire'], CURRENT_DATE),
  ('Raj P.', 6, 11000, 16, 31, 12, ARRAY['first_steps','node_ninja','ai_whisperer','on_fire'], CURRENT_DATE - INTERVAL '1 day'),
  ('Zoe A.', 7, 16400, 25, 39, 17, ARRAY['first_steps','node_ninja','ai_whisperer','on_fire','iron_will','speed_runner'], CURRENT_DATE);

-- Enable realtime for profiles
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
