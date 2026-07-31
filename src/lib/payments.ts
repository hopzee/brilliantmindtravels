/**
 * Payment architecture placeholder.
 *
 * Brilliant Mind Travels & Tours does not sell through an online checkout.
 * Fees are agreed directly with the CEO once a deal is discussed, and eligible
 * applicants may be approved for the pay after visa approval arrangement.
 *
 * This module exists so a gateway (Paystack, Flutterwave, Stripe, Paddle) can be
 * plugged in later without touching page or CMS code. Nothing here renders a
 * checkout while `activeProvider` is "none".
 */

export type PaymentProviderId = "none" | "paystack" | "flutterwave" | "stripe" | "paddle";

export type PaymentIntent = {
  reference: string;
  amount: number;
  currency: string;
  customerEmail: string;
  description: string;
};

export type PaymentProvider = {
  id: PaymentProviderId;
  label: string;
  /** When false, no checkout UI is rendered anywhere on the site. */
  enabled: boolean;
  createCheckout?: (intent: PaymentIntent) => Promise<{ url: string }>;
};

export const offlineProvider: PaymentProvider = {
  id: "none",
  label: "Offline settlement with the CEO",
  enabled: false,
};

/** Swap this for a real provider when the company is ready to take card payments. */
export const activeProvider: PaymentProvider = offlineProvider;

export const paymentsEnabled = activeProvider.enabled;
