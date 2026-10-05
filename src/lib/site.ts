export const SITE_URL = "https://andrewsaifnoorian.github.io";
export const SITE_TITLE = "Andrew Saifnoorian | Software Engineer & Applied AI";
export const SITE_DESCRIPTION =
  "Andrew Saifnoorian: Software Engineer II at JPMorganChase, M.S. in Artificial Intelligence (Johns Hopkins), and Doctor of Engineering researcher building explainable, enterprise AI systems.";

export const SECTIONS = [
  { id: "research", label: "Research" },
  { id: "work", label: "Work" },
  { id: "lab", label: "Lab" },
  { id: "kaggle", label: "Kaggle" },
  { id: "writing", label: "Writing" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export const SECTION_IDS = SECTIONS.map((s) => s.id);
