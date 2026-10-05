export const profile = {
  name: "Andrew Saifnoorian",
  role: "Software Engineer II at JPMorganChase",
  tagline: "Full-stack software engineer building enterprise AI systems.",
  bio: "Software engineer at JPMorganChase building enterprise AI systems and full-stack platforms. Recently completed an M.S. in Artificial Intelligence at Johns Hopkins University, capped by a carbon-aware MLOps capstone: an XGBoost + K-Means pipeline deployed on Azure ML, graded 100/100 across proposal, algorithm selection, and final demo. Deep learning research: extended Monodepth2 with per-pixel uncertainty for specular surface depth estimation. Running local 26B MoE inference on RTX 5080 via Docker and Ollama. AWS Solutions Architect Associate candidate.",
  location: "New Jersey, USA",
  linkedin: "https://www.linkedin.com/in/andrewsaifnoorian/",
  github: "https://github.com/andrewsaifnoorian",
  kaggle: "https://www.kaggle.com/andrewsafe",
  source: "https://github.com/andrewsaifnoorian/andrewsaifnoorian.github.io",
  // Stored split so naive scrapers reading the bundle do not find a plain address.
  emailParts: ["andrewsafe", "gmail.com"] as const,
};

export const getEmail = () => profile.emailParts.join("@");

export const now = [
  { label: "Working", value: "Software Engineer II, JPMorganChase" },
  { label: "Researching", value: "Doctor of Engineering, Johns Hopkins (2026 to 2029)" },
  { label: "Completed", value: "M.S. Artificial Intelligence, Johns Hopkins (2026)" },
];

export const highlights = [
  { value: "100/100", label: "M.S. AI capstone, every graded milestone" },
  { value: "2x", label: "First-place finishes in JHU Kaggle competitions" },
  { value: "Top 16%", label: "IMAGINE MEG decoding, 27th of 169 teams" },
  { value: "5x", label: "Batch throughput from a Spring Boot overhaul" },
];
