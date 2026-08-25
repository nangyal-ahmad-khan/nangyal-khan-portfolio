export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Web App' | 'UI/UX & Concepts' | 'Creative Tech' | 'Open Source';
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  featured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  isPlaceholder?: boolean;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    level: 'Core Focus' | 'Proficient' | 'Exploring' | 'Tooling';
    iconName?: string;
    description: string;
    tag: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Education' | 'Self-Directed';
  description: string;
  achievements: string[];
  skills: string[];
  isPlaceholder?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: string;
  highlightTech: string[];
}

export interface EnquiryFormPayload {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  details: string;
  honeypot?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    headline: string;
    supportingHeadline: string;
    bioIntroduction: string;
    email: string;
    whatsappNumber?: string;
    location: string;
    availabilityStatus: string;
    isAvailableForWork: boolean;
    avatarUrl?: string;
    aboutSections: {
      title: string;
      subtitle: string;
      content: string;
    }[];
    strengths: string[];
    passions: string[];
  };
  stats: {
    value: string;
    label: string;
    description: string;
    isPlaceholder?: boolean;
  }[];
  skillCategories: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  services: ServiceItem[];
  socials: {
    platform: string;
    url: string;
    handle: string;
    icon: string;
  }[];
}
