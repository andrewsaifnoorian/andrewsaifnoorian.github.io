import type { Milestone, SkillGroup } from "./types";

// Newest first. Kept to what the site has always stated; no invented dates or employers.
export const milestones: Milestone[] = [
  {
    year: "2026",
    title: "Joined JPMorganChase as Software Engineer II",
    detail: "Enterprise AI systems and full-stack platforms.",
    track: "Industry",
  },
  {
    year: "2026",
    title: "Started the Doctor of Engineering at Johns Hopkins",
    detail: "Dissertation research on Graph Augmented RAG for explainable AI coaching agents.",
    track: "Research",
  },
  {
    year: "2026",
    title: "Completed the M.S. in Artificial Intelligence, Johns Hopkins",
    detail: "Carbon-aware MLOps capstone, graded 100/100.",
    track: "Research",
  },
  {
    year: "2025",
    title: "Spring Boot batch overhaul",
    detail: "5x throughput on a production batch pipeline.",
    track: "Engineering",
  },
  {
    year: "2025",
    title: "OAuth 2.0 + PKCE single sign-on integration",
    track: "Engineering",
  },
  {
    year: "2025",
    title: "Anthropic AI Fluency: Framework and Foundations",
    track: "Research",
  },
  {
    year: "2024",
    title: "Angular v8 to v19 migration",
    detail: "36% faster first paint.",
    track: "Engineering",
  },
  {
    year: "2024",
    title: "Docker + SonarQube quality gates, AWS infrastructure and monitoring",
    track: "Engineering",
  },
  {
    year: "2024",
    title: "Started the M.S. in Artificial Intelligence at Johns Hopkins",
    track: "Research",
  },
  {
    year: "2023",
    title: "GitLab CI/CD pipeline architecture",
    detail: "18+ critical issues caught before production.",
    track: "Engineering",
  },
  {
    year: "2023",
    title: "Selenium/Cucumber test automation",
    detail: "3 to 4 days of manual regression saved per release cycle.",
    track: "Engineering",
  },
  {
    year: "2019",
    title: "Rutgers Honors College, Presidential Scholar",
    track: "Research",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "AI and cloud",
    items: [
      "Claude",
      "ChatGPT",
      "GitHub Copilot",
      "Gemini",
      "AWS",
      "Azure",
      "GCP",
      "Oracle",
      "Databricks",
    ],
  },
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Angular", "ServiceNow", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Backend and data",
    items: ["Java", "Spring Boot", "Maven", "Python", "FastAPI", "Node.js", "SQL", "PostgreSQL"],
  },
  {
    title: "ML and DevOps",
    items: [
      "PyTorch",
      "TensorFlow",
      "XGBoost",
      "Azure ML",
      "Docker",
      "GitLab CI",
      "SonarQube",
      "Terraform",
    ],
  },
];

export const tools = {
  work: ["VS Code", "GitHub Copilot", "IntelliJ"],
  personal: ["Claude Code", "Codex", "Antigravity"],
};
