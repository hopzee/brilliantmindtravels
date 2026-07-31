
-- Server side moderation for public review submissions.
CREATE OR REPLACE FUNCTION public.moderate_review()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  txt text := lower(coalesce(NEW.content,'') || ' ' || coalesce(NEW.customer_name,''));
  reasons text[] := '{}';
BEGIN
  IF txt ~ '(fuck|sh[i1]t|b[i1]tch|bastard|assh[o0]le|motherf|cunt|whore|slut|wanker|prick|n[i1]gg|faggot|retard|kys|kill yourself)' THEN
    reasons := reasons || 'Offensive language detected';
  END IF;

  IF txt ~ '(hate speech|go back to your country|subhuman|vermin|ethnic cleansing|lynch|terrorist scum)' THEN
    reasons := reasons || 'Possible hate speech detected';
  END IF;

  IF txt ~ '(https?://|www\.|bit\.ly|t\.me/|make money fast|forex signal|crypto investment|binary option|click here|casino|viagra|loan offer|seo services|buy followers)' THEN
    reasons := reasons || 'Possible spam or promotional content';
  END IF;

  IF length(trim(coalesce(NEW.content,''))) < 10 THEN
    reasons := reasons || 'Submission too short to publish';
  END IF;

  IF NEW.content ~ '(.)\1{6,}' THEN
    reasons := reasons || 'Repeated character spam';
  END IF;

  IF array_length(reasons, 1) IS NULL THEN
    NEW.is_flagged := false;
    NEW.moderation_reason := NULL;
    NEW.is_approved := true;
  ELSE
    NEW.is_flagged := true;
    NEW.moderation_reason := array_to_string(reasons, '. ');
    NEW.is_approved := false;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS moderate_review_before_insert ON public.reviews;
CREATE TRIGGER moderate_review_before_insert
BEFORE INSERT ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.moderate_review();

-- Allow the public to record a download without exposing the table to writes.
CREATE OR REPLACE FUNCTION public.increment_download(_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.downloads
  SET download_count = download_count + 1
  WHERE id = _id AND status = 'published';
$$;

GRANT EXECUTE ON FUNCTION public.increment_download(uuid) TO anon, authenticated;
