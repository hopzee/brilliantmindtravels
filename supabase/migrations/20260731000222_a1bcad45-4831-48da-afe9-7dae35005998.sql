-- WHY CHOOSE US
CREATE TABLE public.why_choose_us (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'published',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.why_choose_us TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.why_choose_us TO authenticated;
GRANT ALL ON public.why_choose_us TO service_role;
ALTER TABLE public.why_choose_us ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published" ON public.why_choose_us FOR SELECT USING (status = 'published');
CREATE POLICY "admins full access" ON public.why_choose_us FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE TRIGGER trg_why_choose_us_updated BEFORE UPDATE ON public.why_choose_us FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- TEAM MEMBERS
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  role_title text,
  bio text,
  featured_image text,
  gallery_images text[] NOT NULL DEFAULT '{}',
  email text,
  phone text,
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  twitter_url text,
  is_featured boolean NOT NULL DEFAULT false,
  is_group_photo boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'published',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.team_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published" ON public.team_members FOR SELECT USING (status = 'published');
CREATE POLICY "admins full access" ON public.team_members FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE TRIGGER trg_team_members_updated BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- FAQS
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'General Questions',
  sort_order integer NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'published',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published" ON public.faqs FOR SELECT USING (status = 'published');
CREATE POLICY "admins full access" ON public.faqs FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE TRIGGER trg_faqs_updated BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- DOWNLOADS
CREATE TABLE public.downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text,
  description text,
  category text NOT NULL DEFAULT 'General',
  cover_image text,
  file_url text NOT NULL,
  file_path text,
  file_size bigint,
  file_type text,
  download_count integer NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'draft',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.downloads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.downloads TO authenticated;
GRANT ALL ON public.downloads TO service_role;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published" ON public.downloads FOR SELECT USING (status = 'published');
CREATE POLICY "admins full access" ON public.downloads FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE TRIGGER trg_downloads_updated BEFORE UPDATE ON public.downloads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- PROMOTIONS / FLYERS
CREATE TABLE public.promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text,
  featured_image text,
  gallery_images text[] NOT NULL DEFAULT '{}',
  link_url text,
  placement text NOT NULL DEFAULT 'homepage',
  sort_order integer NOT NULL DEFAULT 0,
  status content_status NOT NULL DEFAULT 'draft',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.promotions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.promotions TO authenticated;
GRANT ALL ON public.promotions TO service_role;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published" ON public.promotions FOR SELECT USING (status = 'published');
CREATE POLICY "admins full access" ON public.promotions FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE TRIGGER trg_promotions_updated BEFORE UPDATE ON public.promotions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- TESTIMONIALS: media-first, optional name, orderable
ALTER TABLE public.testimonials ALTER COLUMN client_name DROP NOT NULL;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

-- REVIEWS: publish immediately + moderation metadata
ALTER TABLE public.reviews ALTER COLUMN is_approved SET DEFAULT true;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS is_flagged boolean NOT NULL DEFAULT false;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS moderation_reason text;
DROP POLICY IF EXISTS "anyone can submit review" ON public.reviews;
CREATE POLICY "anyone can submit review" ON public.reviews FOR INSERT WITH CHECK (true);

-- WEBSITE SETTINGS: CEO / leadership + payment policy
ALTER TABLE public.website_settings
  ADD COLUMN IF NOT EXISTS ceo_name text,
  ADD COLUMN IF NOT EXISTS ceo_title text DEFAULT 'Chief Executive Officer',
  ADD COLUMN IF NOT EXISTS ceo_photo_url text,
  ADD COLUMN IF NOT EXISTS ceo_video_url text,
  ADD COLUMN IF NOT EXISTS ceo_intro text,
  ADD COLUMN IF NOT EXISTS ceo_message text,
  ADD COLUMN IF NOT EXISTS ceo_vision text,
  ADD COLUMN IF NOT EXISTS payment_note text;

-- Default Why Choose Us cards
INSERT INTO public.why_choose_us (title, description, icon, sort_order) VALUES
  ('Experienced Consultants', 'A seasoned team that has guided hundreds of applicants through complex travel and immigration processes.', 'ShieldCheck', 1),
  ('Transparent Process', 'Clear timelines, honest advice and no hidden charges at any stage of your application.', 'Eye', 2),
  ('Student Support', 'End to end help with admissions, school selection, funding advice and pre departure briefings.', 'GraduationCap', 3),
  ('Visa Guidance', 'Document review, application filing and interview preparation handled by specialists.', 'FileCheck', 4),
  ('Global Opportunities', 'Study, work and travel pathways across Europe, North America, Asia and beyond.', 'Globe', 5),
  ('Personalized Assistance', 'A dedicated consultant stays with you from the first consultation to your departure day.', 'HeartHandshake', 6);

-- Default FAQs
INSERT INTO public.faqs (question, answer, category, sort_order) VALUES
  ('How long does a visa application take?', 'Processing time depends on the destination country and visa type. Most applications take between two and twelve weeks once your documents are complete. We give you a realistic timeline during your consultation.', 'Visa', 1),
  ('What documents do I need to get started?', 'A valid international passport, recent passport photographs, proof of funds and academic or employment records. We send you a checklist tailored to your destination.', 'Visa', 2),
  ('Do you help with school admissions?', 'Yes. We handle school selection, application filing, admission follow up, scholarship guidance and pre departure orientation.', 'Study Abroad', 1),
  ('Can I get a scholarship?', 'Several of our partner institutions offer merit and need based scholarships. Eligibility depends on your academic record and destination.', 'Study Abroad', 2),
  ('Are your tour packages customizable?', 'Yes. Every package can be adjusted for group size, travel dates, accommodation level and add on excursions.', 'Tour Packages', 1),
  ('How do payments work?', 'Payments are discussed and agreed directly with our CEO after your consultation. We accept online transfers and office payments. Eligible applicants may also qualify for our pay after visa approval option, with eligibility decided personally by the CEO.', 'General Questions', 1),
  ('Where is your office located?', 'We are based in Ede South, Osun State, Nigeria. Book a consultation and our team will confirm a convenient time to meet.', 'General Questions', 2);