export interface CaseStudy {
  overview: string;
  approach: string[];
  result: string;
}

export interface Project {
  id: number;
  slug: string;
  image: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  accentHue: number;
  paper?: string;
  repo?: string;
  expandedContent: CaseStudy;
}

export interface KaggleCompetition {
  id: number;
  title: string;
  description: string;
  techniques: string[];
  score: string;
  scoreLabel: string;
  rank: string;
  tags: string[];
  colab: string;
  runtime?: string;
  accentHue: number;
  expandedContent: CaseStudy;
}

export interface LabEntry {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  tags: string[];
  accentHue: number;
  expandedContent: CaseStudy;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  location: string;
  locationDetail: string;
  credentialId: string;
  credentialUrl: string;
  linkedinPostUrl: string;
  description: string;
  skills: string[];
}

export interface Paper {
  title: string;
  description: string;
  meta: string;
  pages: number;
  href: string;
}

export interface Testimonial {
  avatar: string;
  name: string;
  role: string;
  review: string;
}

export interface Milestone {
  year: string;
  title: string;
  detail?: string;
  track: "Industry" | "Research" | "Engineering";
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ResearchAim {
  number: string;
  title: string;
  text: string;
}
