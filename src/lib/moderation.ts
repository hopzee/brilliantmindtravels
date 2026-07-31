/**
 * Lightweight automatic content moderation for public review submissions.
 * Reviews publish instantly unless this flags them, in which case they are
 * hidden from the website and queued for an administrator to look at.
 */

const PROFANITY = [
  "fuck", "shit", "bitch", "bastard", "asshole", "dickhead", "motherfucker",
  "cunt", "whore", "slut", "wanker", "prick", "nigga", "nigger", "faggot",
  "retard", "rape", "kill yourself", "kys",
];

const HATE = [
  "hate speech", "go back to your country", "subhuman", "vermin", "ethnic cleansing",
  "gas the", "lynch", "terrorist scum",
];

const SPAM = [
  "http://", "https://", "www.", "bit.ly", "t.me/", "telegram", "whatsapp me",
  "make money fast", "forex signal", "crypto investment", "binary option",
  "click here", "casino", "viagra", "loan offer", "seo services", "buy followers",
];

export type ModerationResult = {
  /** true when the submission is safe to publish immediately */
  approved: boolean;
  flagged: boolean;
  reason: string | null;
};

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/[0@]/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/\$/g, "s")
    .replace(/[^a-z\s./:]/g, " ")
    .replace(/\s+/g, " ");
}

function hits(text: string, list: string[]) {
  return list.filter((word) => text.includes(word));
}

export function moderateText(rawText: string, name = ""): ModerationResult {
  const raw = `${name} ${rawText}`;
  const text = normalise(raw);
  const reasons: string[] = [];

  if (hits(text, PROFANITY).length) reasons.push("Offensive language detected");
  if (hits(text, HATE).length) reasons.push("Possible hate speech detected");

  const lower = raw.toLowerCase();
  if (SPAM.some((s) => lower.includes(s))) reasons.push("Possible spam or promotional content");

  // Shouting or repeated-character abuse.
  const letters = rawText.replace(/[^a-zA-Z]/g, "");
  if (letters.length > 24 && letters === letters.toUpperCase()) reasons.push("Excessive capitalisation");
  if (/(.)\1{6,}/.test(rawText)) reasons.push("Repeated character spam");

  // Very short, low value submissions.
  if (rawText.trim().length < 10) reasons.push("Submission too short to publish");

  return {
    approved: reasons.length === 0,
    flagged: reasons.length > 0,
    reason: reasons.length ? reasons.join(". ") : null,
  };
}
