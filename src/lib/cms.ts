import { queryOptions } from "@tanstack/react-query";
import { cms } from "@/lib/db";
import heroFallback from "@/assets/hero-travel.jpg";
import consultationFallback from "@/assets/consultation.jpg";
import studyFallback from "@/assets/study-abroad.jpg";

export type Settings = Record<string, string | null> | null;

export const fallbackImages = {
  hero: heroFallback,
  consultation: consultationFallback,
  study: studyFallback,
};

/** Returns the CMS image when present, otherwise an elegant placeholder. */
export function imageOr(url: string | null | undefined, fallback: string) {
  return url && url.trim().length > 0 ? url : fallback;
}

export function digitsOnly(value: string | null | undefined) {
  return (value ?? "").replace(/\D/g, "");
}

export function waLink(whatsapp: string | null | undefined, message: string) {
  return `https://wa.me/${digitsOnly(whatsapp)}?text=${encodeURIComponent(message)}`;
}

export function enquiryMessage(company: string | null | undefined, topic: string) {
  return `Hello ${company ?? "Brilliant Mind Travels & Tours"}.\n\nI would like to make an inquiry regarding the ${topic}.\n\nMy name is __________.\n\nPlease assist me.`;
}

export const settingsQuery = queryOptions({
  queryKey: ["website_settings"],
  queryFn: async () => {
    const { data, error } = await cms
      .from("website_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return (data ?? null) as Settings;
  },
  staleTime: 60_000,
});

type ListOpts = {
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  featuredOnly?: boolean;
};

export function publishedList<T = Record<string, any>>(table: string, opts: ListOpts = {}) {
  const { orderBy = "created_at", ascending = false, limit, featuredOnly } = opts;
  return queryOptions({
    queryKey: ["cms", table, opts],
    queryFn: async () => {
      let q = cms.from(table).select("*").eq("status", "published");
      if (featuredOnly) q = q.eq("is_featured", true);
      q = q.order(orderBy, { ascending });
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as T[];
    },
    staleTime: 60_000,
  });
}

export function publishedItem<T = Record<string, any>>(table: string, slug: string) {
  return queryOptions({
    queryKey: ["cms-item", table, slug],
    queryFn: async () => {
      const { data, error } = await cms
        .from(table)
        .select("*")
        .eq("status", "published")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as T | null;
    },
    staleTime: 60_000,
  });
}

export const approvedReviewsQuery = queryOptions({
  queryKey: ["cms", "reviews", "approved"],
  queryFn: async () => {
    const { data, error } = await cms
      .from("reviews")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Record<string, any>[];
  },
  staleTime: 60_000,
});

export function universitiesForCountry(countryId: string) {
  return queryOptions({
    queryKey: ["cms", "universities", countryId],
    queryFn: async () => {
      const { data, error } = await cms
        .from("universities")
        .select("*")
        .eq("status", "published")
        .eq("country_id", countryId)
        .order("title");
      if (error) throw error;
      return (data ?? []) as Record<string, any>[];
    },
    staleTime: 60_000,
  });
}