import data from "../data/data.json";

export interface LinkType {
  name: string;
  href: string;
}

export interface TopbarData {
  address: string;
  email: string;
  phone: string;
  phone_href: string;
  socials: LinkType[];
}

export interface HeaderData {
  logo: string;
  logo_alt: string;
  links: LinkType[];
  button_text: string;
  button_href: string;
  menu_open: string;
  menu_close: string;
}

export interface FooterData {
  logo: string;
  logo_alt: string;
  description: string;
  email_label: string;
  address_label: string;
  phone_label: string;
  email: string;
  address: string;
  phone: string;
  phone_href: string;
  socials: LinkType[];
  copyright: string;
}

export interface BackToTopData {
  aria_label: string;
  icon: string;
}

export interface HeroOrbitItem {
  type: string;
  src?: string;
  alt?: string;
  top: string;
  left: string;
}

export interface HeroSectionData {
  id: string;
  badge: string;
  title: string;
  title_accent: string;
  lead: string;
  image: string;
  image_alt: string;
  orbit: HeroOrbitItem[];
}

export interface AboutSectionData {
  id: string;
  eyebrow: string;
  image: string;
  image_alt: string;
  vision_title: string;
  vision_text: string;
  title: string;
  lead: string;
  stats: { value: string; label: string; color: string }[];
  avatars: { src: string; alt: string }[];
  rating_value: string;
  rating_label: string;
  rate_image: string;
  rate_image_alt: string;
  rate_title: string;
  bars: { label: string; value: string; width: string; color: string }[];
}

export interface ServicesSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_highlight: string;
  lead: string;
  items: { icon: string; title: string; text: string; featured?: boolean }[];
}

export interface WhySectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_highlight: string;
  lead: string;
  consult_title: string;
  consult_text: string;
  phone: string;
  phone_href: string;
  button_text: string;
  button_href: string;
  points: { icon: string; title: string; text: string }[];
  image: string;
  image_alt: string;
  side_image: string;
  side_image_alt: string;
  badge_title: string;
  badge_text: string;
}

export interface TestimonialsSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_highlight: string;
  lead: string;
  prev_label: string;
  next_label: string;
  slide_label: string;
  items: { quote: string; name: string; role: string; image: string; stars: number }[];
}

export interface FaqSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_rest: string;
  title_highlight: string;
  lead: string;
  image: string;
  image_alt: string;
  items: { question: string; answer: string }[];
}

export interface ContactSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_highlight: string;
  lead: string;
  address_title: string;
  phone_title: string;
  email_title: string;
  address: string;
  phone: string;
  phone_href: string;
  email: string;
  form_title: string;
  name_placeholder: string;
  email_placeholder: string;
  phone_placeholder: string;
  message_placeholder: string;
  button_text: string;
  success_message: string;
}

export const siteJson = data;
export const common = data.common;
export const template = data.categories.Immigration.templateComponents["template-1"];
export const pages = template.pages;
export const sections = template.sections;
