import type { LabEntry } from "./types";

export const labEntries: LabEntry[] = [
  {
    id: 1,
    title: "Docker Compose Stack",
    subtitle: "Containerized Infrastructure",
    description:
      "The entire stack runs via a single Docker Compose file, an isolated bridge network (172.30.0.0/24) with static IPs for both services, health checks gating startup order, and a Makefile + bash helper for developer operations.",
    details: [
      "Custom bridge network (172.30.0.0/24): Ollama at 172.30.0.10, Open WebUI at 172.30.0.11",
      "Health checks on both services, Open WebUI waits on Ollama's condition: service_healthy",
      "JSON-file logging: Ollama capped at 20 MB × 5 files; Open WebUI at 10 MB × 3",
      "NVIDIA GPU passthrough ready: deploy.resources block in compose, enabled via OLLAMA_GPU_MODE=all",
      "Makefile targets: up, down, restart, logs, status, pull-model, shell, clean",
      "scripts/manage.sh: pre-flight Docker daemon check, port conflict detection, colored output",
    ],
    tags: ["Docker Compose", "Bridge Network", "Health Checks", "GPU Passthrough", "Makefile"],
    accentHue: 200,
    expandedContent: {
      overview:
        "The stack is defined in a single docker-compose.yml that provisions two services, ollama and open-webui, on a dedicated bridge network with static IPv4 assignments. Service startup is gated by health checks: open-webui has a depends_on condition set to service_healthy on ollama, so the frontend never starts until Ollama is confirmed alive via `ollama list`. This prevents the common race condition where Open WebUI boots before the inference backend is ready to serve. All environment variables (port, image tag, container name, default model, GPU mode) are externalized to a .env file and imported by both the Makefile and Compose, making the stack fully tunable without touching any source files.",
      approach: [
        "Defined a named bridge network `ollama-bridge` with subnet 172.30.0.0/24 and gateway 172.30.0.1, static IPs assigned per service",
        "Ollama health check: `ollama list` polled every 30s, 5 retries, 15s start period; Open WebUI's depends_on condition blocks on this",
        "Open WebUI health check: `curl -f http://localhost:8080/health`, same polling interval, 20s start period for the Python/FastAPI boot",
        "GPU passthrough: `deploy.resources.reservations.devices` block ready to uncomment; `OLLAMA_GPU_MODE=all` in .env activates NVIDIA Container Toolkit passthrough",
        "Makefile wraps all docker compose commands: `make up`, `make pull-model`, `make status` (shows container health + netstat port binding), `make clean` (destructive, prompts confirmation before wiping model volume)",
        "scripts/manage.sh provides the same ops with colored terminal output, Docker daemon pre-flight, and a `prompt` command that sends a one-shot curl request to /api/generate and pretty-prints the JSON response",
      ],
      result:
        "A reproducible, one-command deployment: `make up` starts the full stack, `make pull-model` downloads the configured model, and the system is serving at http://localhost:3000 within ~30 seconds on a machine with the weights already cached. The static network topology means inter-service communication uses predictable IPs rather than DNS resolution, and the health check chain ensures the frontend is never reachable before the backend is ready.",
    },
  },
  {
    id: 2,
    title: "Ollama + Gemma",
    subtitle: "Inference Backend & Model",
    description:
      "Ollama serves the Gemma model family (4b / 12b / 27b) via a local REST API compatible with the OpenAI spec. GGUF quantization, GPU layer offloading, and a Modelfile system for per-model configuration, all contained behind a single endpoint at localhost:11434.",
    details: [
      "OpenAI-compatible REST API at localhost:11434, /v1/chat/completions, /api/generate, /api/chat",
      "Gemma model family: 4b (~3 GB VRAM), 12b (~10 GB), 27b (~20 GB), switch via OLLAMA_DEFAULT_MODEL",
      "GGUF quantization: Q4_K_M default (low VRAM), Q8_0 for max fidelity, pull via ollama pull",
      "Modelfile system: custom system prompts, num_ctx (context window), temperature per model",
      "OLLAMA_ORIGINS=* and OLLAMA_HOST=0.0.0.0 enable cross-container requests from Open WebUI",
      "Token hygiene guide: role-tag prompts, trim RAG chunks to 300–400 tokens, disable streaming for orchestrator-to-orchestrator calls",
    ],
    tags: ["Ollama", "Gemma 4", "GGUF", "OpenAI API", "LangChain-Compatible"],
    accentHue: 135,
    expandedContent: {
      overview:
        "Ollama wraps llama.cpp into a Docker-friendly service that exposes a local REST API on port 11434. The API has two modes: the native Ollama format (`/api/generate`, `/api/chat`) and an OpenAI-compatible shim (`/v1/chat/completions`). The OpenAI shim is what makes this stack plug-and-play with any tool that already speaks OpenAI: Open WebUI, LangChain, LlamaIndex, AutoGen, CrewAI, and VS Code extensions all work by pointing their base URL at localhost:11434. The model family running on this stack is Gemma (Google DeepMind), available at three parameter scales: 4b for consumer hardware, 12b for a mid-range GPU, and 27b for a workstation-class card.",
      approach: [
        "Pulled model via `make pull-model` which runs `docker exec ollama ollama pull gemma4`, downloads ~3 GB of GGUF weights into the mounted volume at ./volumes/ollama",
        "OLLAMA_HOST=0.0.0.0 binds the API to all interfaces inside the container (not just loopback) so requests from the Open WebUI container on the bridge network reach it",
        "OLLAMA_ORIGINS=* disables CORS restrictions, required for browser-based clients like Open WebUI to call the API directly",
        "Created a Modelfile to set a persistent system prompt and num_ctx=8192 for the 4b model, applied once via `ollama create` inside the container",
        "Benchmarked Q4_K_M vs Q8_0: Q4 cuts weight size by ~40% with <2% quality degradation on instruction-following tasks; Q8 is preferred for math-heavy or code generation tasks",
        "Tested orchestrator integration: LangChain's ChatOllama and OpenAI-compatible constructors both worked without modification by pointing base_url at http://localhost:11434; documented token hygiene rules for agentic loop efficiency (strip boilerplate, use role tags, cap RAG chunks at 300–400 tokens, disable streaming for inter-agent calls)",
      ],
      result:
        "A production-adjacent inference endpoint serving Gemma at 25–40 tokens/second on consumer GPU hardware, with zero API costs and no data leaving the machine. The OpenAI-compatible API made integration with the broader LLM tooling ecosystem seamless, any tool expecting OpenAI just works. The token hygiene guidelines documented in the README reduced per-call overhead in agentic loops by 20–40% by eliminating redundant prompt boilerplate and static system prompt re-transmission.",
    },
  },
  {
    id: 3,
    title: "Open WebUI + CI/CD",
    subtitle: "Chat Interface & DevOps Pipeline",
    description:
      "Open WebUI provides the browser-based chat frontend with persistent conversation history, model switching, RAG, and a custom theme. The project is wired to a GitLab CI/CD pipeline with five stages: lint → build → test → scan (SonarQube + Trivy) → deploy.",
    details: [
      "Open WebUI on port 3000, auth disabled (single-user mode), telemetry fully off (SCARF, DO_NOT_TRACK, ANONYMIZED_TELEMETRY)",
      "Conversation history persisted in SQLite at ./volumes/open-webui/webui.db, survives container restarts",
      "Custom theme via theme/custom.css injected into Open WebUI for local branding (WEBUI_NAME=LocalAI)",
      "GitLab CI: 5 stages, lint (compose + yaml), build (image pull/inspect), test (API healthcheck), scan, deploy",
      "SonarQube static analysis + Trivy vulnerability scan (HIGH/CRITICAL) on Ollama image, both on main branch",
      "deploy:local is manual-trigger only, prevents accidental force-recreate on every push",
    ],
    tags: ["Open WebUI", "GitLab CI", "SonarQube", "Trivy", "Docker-in-Docker"],
    accentHue: 270,
    expandedContent: {
      overview:
        "Open WebUI is the React + FastAPI application that wraps the Ollama API in a full-featured chat interface. It's configured here in single-user mode (WEBUI_AUTH=False) with all telemetry disabled: SCARF_NO_ANALYTICS, DO_NOT_TRACK, and ANONYMIZED_TELEMETRY are all set to prevent any outbound analytics. Conversation history is stored in a SQLite database at ./volumes/open-webui/webui.db, which is bind-mounted so data persists across container restarts and rebuilds. On the DevOps side, the project has a full GitLab CI/CD pipeline with five stages, Docker-in-Docker for build and test stages, SonarQube code quality scanning, and Trivy vulnerability scanning against the Ollama base image.",
      approach: [
        "Deployed Open WebUI pointing OLLAMA_BASE_URL at http://ollama:11434, uses the container name on the bridge network rather than localhost, so the request routes correctly between containers",
        "WEBUI_AUTH=False disables the mandatory account creation on first launch, the instance is single-user and private, so the auth layer adds friction without security benefit",
        "Disabled three separate telemetry systems: SCARF_NO_ANALYTICS (package analytics), DO_NOT_TRACK (standard browser header propagation), and ANONYMIZED_TELEMETRY (Open WebUI's own usage reporting)",
        "Custom theme: theme/custom.css is mounted into the Open WebUI container and loaded at runtime, allows persistent CSS overrides (colors, fonts, logo) without rebuilding the image",
        "GitLab CI/CD pipeline stages: lint:compose (validates docker-compose.yml), lint:yaml (yamllint on CI and compose files), build:image-check (pulls and inspects Ollama image on main), test:api-healthcheck (spins up stack, hits /api/tags, tears down, gated on MR events), scan:sonarqube (SonarQube analysis on main), scan:trivy (Trivy HIGH/CRITICAL scan against Ollama image), deploy:local (manual trigger, force-recreates containers from pulled images)",
        "SonarQube runs on a self-hosted runner with Docker executor; Trivy scanner uses the aquasecurity/trivy image and outputs SARIF for report archiving",
      ],
      result:
        "A fully self-contained local AI chat stack with a production-grade DevOps pipeline. The CI/CD pipeline catches compose file syntax errors, validates the API is live after a cold start, and flags any new HIGH or CRITICAL CVEs in the Ollama base image before they reach the local deployment. The manual deploy gate means a `git push` never accidentally restarts the running inference server mid-session.",
    },
  },
];
