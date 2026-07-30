import { supabase } from "@/integrations/supabase/client";

/**
 * Loosely typed client for the generic CMS resource manager, where the table
 * name is dynamic. Typed access should use `supabase` directly.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cms = supabase as any;