export const site = {
  name: "Brilliant Mind Travels & Tours",
  shortName: "Brilliant Mind",
  tagline: "...your dream. our expertise. global opportunities",
  promise: "We don't just process visas — we open doors to your global future.",
  address: "Ede South, Osun State, Nigeria",
  email: "info@brilliantmindtravels.com",
  phone: "+234 800 000 0000",
  whatsapp: "2348000000000",
  vision:
    "To be a trusted global travel and education consultancy, connecting people to life-changing international opportunities through excellence, integrity, and personalized guidance.",
  mission:
    "To empower individuals and families to achieve their international education, travel and relocation goals by providing transparent, reliable and professional consultancy services that inspire confidence and create lasting impact.",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Study Abroad", to: "/study-abroad" },
  { label: "Tour Packages", to: "/tours" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;