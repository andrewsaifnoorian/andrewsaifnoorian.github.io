import type { ResearchAim } from "./types";

export const research = {
  program: "Doctor of Engineering, Johns Hopkins University",
  title:
    "Adaptive Context Orchestration for Explainable AI Coaching Agents in Enterprise Financial Advisory",
  timeline: "2026 to 2029",
  intro:
    "I am currently pursuing a Doctor of Engineering at Johns Hopkins University, researching how enterprise AI systems can reason over both structured and unstructured knowledge while remaining fully explainable and auditable.",
  paragraphs: [
    "The question grew directly out of problems I encountered in my own work. Large financial advisory organizations track advisor performance across many separate systems: structured performance graphs, organizational hierarchies, and long form coaching guidance that no single manager can fully synthesize on their own. Large language models generate fluent recommendations, but they cannot reliably ground those recommendations in real data, and they often invent numbers that were never in the source material. Standard retrieval augmented generation improves grounding in documents, but it is blind to relational structure such as peer rankings, organizational hierarchy, and performance trends over time.",
    "My proposed architecture, which I call Graph Augmented Retrieval Augmented Generation, or G RAG, composes context from three distinct sources: graph database traversals for relational performance data, vector retrieval for practice guidelines, and deterministic analytics for key performance indicators. Rather than simply including more context, the framework selects the right facts, in the right format, within a practical token budget, and ties every recommendation back to a verifiable source so it can be audited. The research builds on iPerform Insight, a working prototype I developed for a JPMorganChase innovation hackathon, which demonstrated the core idea and surfaced the engineering gaps this research now addresses.",
  ],
  closing:
    "This work matters to me because it sits exactly at the intersection of what I already do every day and what I am most curious about: how to make AI systems that are not just capable, but trustworthy enough to rely on in a regulated, high stakes environment. The research began in 2026 and is expected to run through a dissertation defense in 2029, with the first phase focused on the context composition framework and the later phases on grounding, explainability, and a full enterprise evaluation.",
  sources: ["Graph traversal", "Vector retrieval", "Deterministic analytics"],
};

export const aims: ResearchAim[] = [
  {
    number: "01",
    title: "Context composition",
    text: "Design and validate a framework that composes graph, vector, and analytics context into a single, token budgeted prompt for AI advisory agents.",
  },
  {
    number: "02",
    title: "Grounding and explainability",
    text: "Build a grounding and explainability pipeline that traces every AI generated recommendation back to a verifiable source, satisfying compliance review in regulated industries.",
  },
  {
    number: "03",
    title: "Longitudinal evaluation",
    text: "Run a controlled, longitudinal evaluation of the full architecture on enterprise financial advisory data, measuring accuracy, hallucination rate, and real advisor outcomes.",
  },
];
