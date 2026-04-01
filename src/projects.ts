export const projects = [
  {
    slug: "veliode",
    name: "Veliode",
    url: "https://veliode.com",
    tagline: "Multi-tenant service business platform with spec-driven development tooling",
    summary:
      "A full-stack platform for service-based businesses — salons, spas, clinics — managing scheduling, booking, billing, POS, employee management, and franchise operations across multiple locations. Built with a spec-driven development methodology: features.yaml defines the feature map, dual-driver test specs (API + UI) auto-track progress, and bin/demo records video evidence. The tooling replaces traditional project management — no kanban board, no ticket updates, the code is the project management.",
    tech: ["Kotlin", "Spring Boot", "React", "PostgreSQL", "Stripe Connect", "Playwright"],
    highlights: [
      "80+ features across scheduling, booking, billing, payroll, and franchise management",
      "Multi-tenant multi-location architecture with franchise inheritance and inter-BU billing",
      "Feature map tooling: YAML-driven feature lifecycle with CLI-driven progress tracking",
      "Dual-driver specs: same spec exercises API (REST) and UI (Playwright) layers independently",
      "Station experiences: kiosk check-in, front-desk POS, PIN-based timekeeping",
      "bin/clown-check: pre-commit hook running separate LLM reviewer session",
    ],
  },
  {
    slug: "redline",
    name: "Redline",
    url: "https://redline.com",
    tagline: "Fundraising platform generating $5M annually",
    summary:
      "A fundraising platform built for organizations running campaigns at scale. Features SMS and email integration via Twilio, a progressive web app for field use on unreliable networks, and user process tracking that guides participants toward fundraising goals. Designed for real-world conditions — offline-capable, resilient to bad connectivity, and focused on driving measurable outcomes.",
    tech: ["Kotlin", "Spring Boot", "React", "PostgreSQL", "Twilio", "PWA"],
    highlights: [
      "~$5M annual revenue",
      "SMS and email campaign integration via Twilio",
      "Progressive web app with offline support for field use on bad networks",
      "User process tracking to guide participants toward fundraising goals",
    ],
  },
  {
    slug: "property",
    name: "King County Assessor Analysis",
    url: "https://kc.iodesystems.com",
    tagline: "Interactive property analytics platform with vector tile mapping",
    summary:
      "A full-stack property analysis tool for King County Assessor/Auditor data. Combines PostgreSQL analytics with an interactive mapping UI using MapLibre GL and Protomaps vector tiles. Supports database migrations, data seeding, and CLI-driven operations for exploring property valuations, trends, and geographic patterns.",
    tech: ["Kotlin", "Spring Boot", "React", "PostgreSQL", "MapLibre GL", "Protomaps"],
    highlights: [
      "Interactive vector tile mapping with MapLibre GL and Protomaps",
      "PostgreSQL analytics with Flyway migrations and JOOQ",
      "Chart.js visualizations for property valuation trends",
      "CLI-driven data pipeline: migrate, seed, analyze",
    ],
  },
  {
    slug: "autowork",
    name: "Autowork",
    tagline: "Multi-agent SDLC orchestration — rebuilt after escaping a vibe-coding local minimum",
    summary:
      "Autowork automates the full software development lifecycle — discover, triage, plan, code, review, and submit — by coordinating parallel Claude Code sessions in isolated git worktrees. The original version became a cautionary tale: rapid AI-assisted development accumulated tech debt faster than it could be recognized, driving the architecture into a local minimum. The current version is a ground-up rewrite applying those lessons: channel-based agent communication replaces the tightly-coupled state machine, stateless event sourcing replaces mutable state, and clear separation of concerns makes the system auditable at speed. Agents (admin, orchestrator, worker) communicate through typed channels with WebSocket pub/sub. LLM orchestration runs through the Koog framework with tshell for tool execution.",
    tech: ["Kotlin", "Spring Boot", "React", "PostgreSQL", "Koog", "tshell", "Git Worktrees"],
    highlights: [
      "Full SDLC pipeline: DISCOVER → TRIAGE → WORK → REVIEW → REBASE → SUBMIT",
      "IRC-style channel topology — decoupled agent communication replacing tightly-bound state machine",
      "Stateless event-sourced architecture — auditable, replayable, no hidden mutable state",
      "Git worktree isolation per task — concurrent branches without conflicts",
      "Case study: v1's unchecked AI velocity created architectural debt that forced a full rewrite",
    ],
  },
  {
    slug: "tshell",
    name: "tshell",
    repo: "https://github.com/IodeSystems/tshell",
    tagline: "Computation framework for LLMs — one eval tool to replace twenty",
    summary:
      "tshell is a sandboxed JS-syntax shell designed for LLM tool use. Instead of exposing 20+ MCP tools (each consuming prompt context for schema definitions), tshell provides a single 'eval' tool with a familiar syntax that LLMs already know. A pipe operator enables functional composition across polyglot tool chains. Total context cost: ~1,641 tokens vs 2,000–4,000 for typical tool servers.",
    tech: ["Kotlin", "ANTLR", "MCP", "Maven Central"],
    highlights: [
      "95% reduction in prompt context cost for tool schemas",
      "JS subset syntax — LLMs produce correct calls without extra training",
      "Pipe operator (|>) for functional composition",
      "Polyglot: chain tools from Python, Go, TypeScript MCP servers",
      "Published to Maven Central",
    ],
  },
  {
    slug: "koog-claude-code",
    name: "koog-claude-code",
    repo: "https://github.com/IodeSystems/koog-claude-code",
    tagline: "LLM client bridging Koog agent framework with Claude Code",
    summary:
      "An LLMClient implementation that drives the Claude Code CLI as a subprocess and exposes it through JetBrains' Koog agent framework interfaces. Manages process lifecycle, parses JSON streams, tracks conversation state for incremental message delivery, and runs an embedded MCP server so Claude can call Koog-defined tools via HTTP.",
    tech: ["Kotlin", "Koog", "Ktor", "MCP", "Claude Code CLI"],
    highlights: [
      "Process-based architecture — shells out to claude binary",
      "Stream parser converting JSON events to typed domain model",
      "Embedded MCP HTTP server for bidirectional tool calling",
      "Conversation tracker for session resumption without replay",
    ],
  },
  {
    slug: "typescript-generator",
    name: "typescript-generator",
    repo: "https://github.com/IodeSystems/typescript-generator",
    tagline: "Generate TypeScript interfaces from Java/Kotlin classes",
    summary:
      "A Kotlin-based tool that generates TypeScript interface definitions from Java and Kotlin classes, with first-class Spring Boot support. Available as both a Gradle plugin and a programmatic API. Eliminates the manual sync problem between backend DTOs and frontend types.",
    tech: ["Kotlin", "Gradle Plugin", "Spring Boot", "Maven Central"],
    highlights: [
      "Gradle plugin for build-time generation",
      "Programmatic API for custom pipelines",
      "Spring Boot annotation awareness",
      "Published to Maven Central",
    ],
  },
  {
    slug: "kotlinx-htmx",
    name: "kotlinx-htmx",
    repo: "https://github.com/IodeSystems/kotlinx-htmx",
    maven: { group: "com.iodesystems.kotlin-htmx", artifact: "htmx", version: "0.0.1" },
    tagline: "Zero-dependency streaming HTML DSL for Kotlin",
    summary:
      "A streaming HTML builder DSL for Kotlin with zero core dependencies. Renders HTML on-the-fly without building a DOM tree in memory. Includes extension modules for HTMX, ChartJS, HyperScript, Material Icons, and Spring integration.",
    tech: ["Kotlin", "HTMX", "ChartJS", "Spring", "Maven Central"],
    highlights: [
      "Streaming output — no in-memory DOM tree",
      "Zero dependencies in core module",
      "Extension ecosystem: HTMX, ChartJS, HyperScript, Material Icons",
      "Spring integration module",
      "Published to Maven Central",
    ],
  },
  {
    slug: "dataset",
    name: "dataset",
    repo: "https://github.com/IodeSystems/dataset",
    maven: { group: "com.iodesystems.dataset", artifact: "dataset", version: "7.0.5" },
    tagline: "Type-safe query builder — freeform user queries to JOOQ SQL",
    summary:
      "A Kotlin library that converts freeform user search queries into type-safe JOOQ SQL conditions using an ANTLR4 grammar. Supports field configuration, named searches, lazy SQL generation, pagination, and DTO mapping. Turns natural-language-style search into structured database queries.",
    tech: ["Kotlin", "JOOQ", "ANTLR4", "Maven Central"],
    highlights: [
      "ANTLR4 grammar for query parsing",
      "Field-level configuration and named searches",
      "Lazy SQL generation with pagination",
      "Published to Maven Central",
    ],
  },
  {
    slug: "homelab-horizon",
    name: "homelab-horizon",
    repo: "https://github.com/IodeSystems/homelab-horizon",
    tagline: "Self-contained homelab management — VPN, DNS, proxy, edge, deployments",
    summary:
      "A single-binary tool for managing homelab infrastructure. Consolidates WireGuard VPN, split-horizon DNS, reverse proxy with automatic Let's Encrypt SSL, edge management with healthchecks and failover, and per-project zero-downtime deployment APIs supporting blue-green and rolling strategies.",
    tech: ["Go", "WireGuard", "DNS", "Let's Encrypt", "Reverse Proxy"],
    highlights: [
      "Single binary deployment",
      "WireGuard VPN with self-service onboarding",
      "Split-horizon DNS",
      "Automatic Let's Encrypt certificate management",
      "Edge management with healthchecks and automatic failover",
      "Per-project blue-green and rolling zero-downtime deployment APIs",
    ],
  },
];
