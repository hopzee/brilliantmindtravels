-- COUNTRY SERVICES
-- Stores which services are available for each country.

CREATE TABLE public.country_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  study BOOLEAN NOT NULL DEFAULT false,
  visit BOOLEAN NOT NULL DEFAULT false,
  work BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'draft',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Public visitors can only see published countries.
GRANT SELECT ON public.country_services TO anon;

-- Authenticated admins can manage countries.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.country_services TO authenticated;

-- Service role access.
GRANT ALL ON public.country_services TO service_role;

-- Enable Row Level Security.
ALTER TABLE public.country_services ENABLE ROW LEVEL SECURITY;

-- Public can read published country services.
CREATE POLICY "public read published country services"
ON public.country_services
FOR SELECT
USING (status = 'published');

-- Admins can manage country services.
CREATE POLICY "admins manage country services"
ON public.country_services
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Automatically update updated_at.
CREATE TRIGGER trg_country_services_updated
BEFORE UPDATE ON public.country_services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
