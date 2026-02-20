import { IconType } from "react-icons";
import {
  FaBuilding,
  FaFlask,
  FaServer,
} from "react-icons/fa";
import {
  SiReact,
  SiAngular,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiPostgresql,
  SiAmazonwebservices,
  SiDocker,
  SiGitlab,
  SiSonarqube,
  SiSelenium,
  SiTerraform,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

/* ── Card Types ── */
export type BentoCardType = "metric" | "tech" | "showcase";
export type BentoSize = "sm" | "md" | "lg";

export interface BentoCard {
  id: string;
  type: BentoCardType;
  size: BentoSize;
  value?: string;
  label?: string;
  title?: string;
  description?: string;
  icons?: { icon: IconType; name: string }[];
}

export interface TimelineNode {
  year: string;
  text: string;
  linkedCardId: string;
}

export interface TabData {
  id: string;
  label: string;
  shortLabel: string;
  icon: IconType;
  timeline: TimelineNode[];
  bento: BentoCard[];
}

export interface StatItem {
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
}

/* ── Tab Definitions ── */
export const tabs: TabData[] = [
  {
    id: "enterprise",
    label: "Enterprise Engineering",
    shortLabel: "Enterprise",
    icon: FaBuilding,
    timeline: [
      { year: "2024", text: "Angular v8 → v19 Migration", linkedCardId: "ent-paint" },
      { year: "2025", text: "Spring Boot Batch Overhaul — 4x Throughput", linkedCardId: "ent-throughput" },
      { year: "2025", text: "OAuth 2.0 + PKCE SSO Integration", linkedCardId: "ent-throughput" },
      { year: "2026", text: "Joined JPMC — Full-Stack Engineering", linkedCardId: "ent-tech" },
    ],
    bento: [
      { id: "ent-throughput", type: "metric", size: "sm", value: "4x", label: "Throughput Improvement" },
      { id: "ent-paint", type: "metric", size: "sm", value: "35%", label: "Faster First Paint" },
      {
        id: "ent-tech",
        type: "tech",
        size: "sm",
        icons: [
          { icon: SiReact, name: "React" },
          { icon: SiJavascript, name: "TypeScript" },
          { icon: SiAngular, name: "Angular" },
          { icon: FaJava, name: "Java" },
          { icon: SiNodedotjs, name: "Spring Boot" },
          { icon: SiAmazonwebservices, name: "AWS Aurora" },
        ],
      },
    ],
  },
  {
    id: "academic",
    label: "Academic & AI Research",
    shortLabel: "AI Research",
    icon: FaFlask,
    timeline: [
      { year: "2019", text: "Rutgers Honors College — Presidential Scholar", linkedCardId: "acad-dnn" },
      { year: "2024", text: "Started MS at Johns Hopkins", linkedCardId: "acad-dnn" },
      { year: "2024", text: "Neural Network ROI Research", linkedCardId: "acad-dnn" },
      { year: "2025", text: "Anthropic Claude AI Courses", linkedCardId: "acad-ai" },
    ],
    bento: [
      {
        id: "acad-dnn",
        type: "showcase",
        size: "sm",
        title: "Deep Neural Networks",
        description: "Feedforward NN for ad ROI classification",
      },
      {
        id: "acad-tech",
        type: "tech",
        size: "sm",
        icons: [
          { icon: SiPython, name: "Python" },
          { icon: SiJavascript, name: "TensorFlow" },
          { icon: SiPostgresql, name: "Pandas" },
          { icon: SiNodedotjs, name: "NumPy" },
        ],
      },
      {
        id: "acad-ai",
        type: "showcase",
        size: "sm",
        title: "Applied AI",
        description: "Claude courses, prompt engineering, model evaluation",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    shortLabel: "DevOps",
    icon: FaServer,
    timeline: [
      { year: "2023", text: "GitLab CI/CD Pipeline Architecture", linkedCardId: "devops-issues" },
      { year: "2023", text: "Selenium/Cucumber Test Automation", linkedCardId: "devops-saved" },
      { year: "2024", text: "Docker + SonarQube Quality Gates", linkedCardId: "devops-tech" },
      { year: "2024", text: "AWS Infrastructure & Monitoring", linkedCardId: "devops-tech" },
    ],
    bento: [
      { id: "devops-issues", type: "metric", size: "sm", value: "17+", label: "Critical Issues Caught Pre-Prod" },
      { id: "devops-saved", type: "metric", size: "sm", value: "2-3 days", label: "Regression Saved Per Cycle" },
      {
        id: "devops-tech",
        type: "tech",
        size: "sm",
        icons: [
          { icon: SiDocker, name: "Docker" },
          { icon: SiAmazonwebservices, name: "AWS" },
          { icon: SiGitlab, name: "GitLab" },
          { icon: SiSonarqube, name: "SonarQube" },
          { icon: SiSelenium, name: "Selenium" },
          { icon: SiTerraform, name: "Terraform" },
        ],
      },
    ],
  },
];

/* ── Stat Bar ── */
export const stats: StatItem[] = [
  { target: 4, suffix: "x", label: "Throughput" },
  { target: 35, suffix: "%", label: "Faster First Paint" },
  { target: 17, prefix: "", suffix: "+", label: "Bugs Caught Pre-Prod" },
  { target: 3, suffix: "", label: "Certifications" },
];
