export const resume = {
  name: "Carl Taylor",
  contact: {
    cell: atob("MjA2LjQwOS44Njcy"),
    email: atob("Y2FybEBldGF5bG9yLm1l"),
    location: "Seattle",
    github: "github.com/nthalk",
    linkedin: "linkedin.com/in/carletaylor",
    stackoverflow: "stackoverflow.com/users/616452",
  },
  summary:
    "20+ years of technical leadership designing, building, and shipping complex systems at scale. Now specializing in maintaining engineering quality at LLM-driven velocity — building the guardrails, review infrastructure, and self-steering codebases that keep multi-agent development from collapsing under its own speed.",
  experience: [
    {
      company: "IodeSystems LLC",
      title: "Founder & Principal Engineer",
      dates: "Dec 2022 – Present",
      bullets: [
        "Built Veliode, a multi-tenant service business platform (scheduling, booking, billing, POS, franchise management) with spec-driven development tooling — feature maps, dual-driver test specs (API + UI), automated demo recording, and CLI-driven progress tracking replacing traditional project management",
        "Built multi-agent orchestration platform (autowork) automating the full SDLC — discover, triage, plan, code, review, submit — enabling solo delivery at the throughput of a small team",
        "Designed quality infrastructure for high-velocity LLM development: automated staging pipelines, per-test metrics with branch-level baselines, artifact servers for test logs/videos/KPIs, and outlier-only reporting for efficient batch review",
        "Created clown-check, a pre-commit hook running a separate LLM session as code reviewer — catches deleted tests, disabled validation, and regressions the authoring session rationalizes away",
        "Created tshell, a computation framework for LLMs — optimized tool schemas to replace 20+ MCP tools with a single eval interface, reducing prompt context cost by 95% — published to Maven Central",
        "Built koog-claude-code, an LLM client bridging JetBrains' Koog agent framework with Claude Code via process management, stream parsing, and an embedded MCP tool server",
        "Built King County assessor analysis platform (kc.iodesystems.com) with interactive mapping (MapLibre/Protomaps), PostgreSQL analytics, automated data pipelines, and rigorous statistical methodology for valuation compliance",
        "Engineered self-serve AWS portal reducing client expenses by 75%",
        "Released fundraising application generating $3M annually",
      ],
    },
    {
      company: "Meta",
      title: "Sr. Software Engineer (E5), IC — Multi-Team",
      dates: "Mar 2020 – Nov 2022",
      bullets: [
        "Led cross-team video infrastructure initiatives as IC, self-directing projects across multiple teams",
        "Created video lifecycle system saving 1.5EB+ storage",
        "Built distributed diagnostic tools and accounting/analytics covering 800B+ videos",
        "Designed OnCall triage system reducing ticket volume 50%",
        "Refactored high-traffic config system saving $1M annually",
      ],
    },
    {
      company: "Fulcrum Technologies",
      title: "Principal Engineer → Dev Lead (team of 8)",
      dates: "Sep 2012 – Mar 2020",
      bullets: [
        "Led team of 8 developers, established company-wide code reviews and testing standards",
        "Ported Microsoft CE to native Android and React Native",
        "Upgraded Spring2/Ant/Flex to Spring Boot with Vue.js",
        "Built ActionScript to JavaScript transpiler with async tree transformations",
      ],
    },
    {
      company: "Pierson Labs",
      title: "Data Platform Lead (Solo Engineer)",
      dates: "Jan 2012 – Jul 2012",
      bullets: [
        "Built relational type system in Scala for HBase on Hadoop as sole engineer",
      ],
    },
    {
      company: "Anteambulo",
      title: "Project Lead (team of 2)",
      dates: "Jul 2009 – Aug 2011",
      bullets: [
        "Created open-source Selenium tool improving performance by 10x",
        "Built PostGIS affiliate ad system with LivingSocial/GroupOn integration",
        "Deployed BlueBox PBX for call-center operations",
      ],
    },
    {
      company: "DomainTools",
      title: "Sr. Developer → Lead (Web Services, Full Stack + DB)",
      dates: "May 2005 – Aug 2009",
      bullets: [
        "Shipped live auction system generating $12M revenue",
        "Orchestrated audit/refactor of 500k+ lines of PHP code",
        "Reduced page load times by 72% through SEO and caching optimizations",
      ],
    },
  ],
  skills: {
    Languages: "Java, Kotlin, JavaScript, TypeScript, PHP, Hack, Ruby, SQL",
    "Frameworks & Tools": "Spring, Gradle, React, Next.js, Rails, Antlr",
    "AI & Agents": "Claude API, MCP, Multi-Agent Orchestration, Local LLMs, Prompt/Tool Schema Optimization, Session Management, LLM Security",
    Databases: "MySQL, Oracle, PostgreSQL, Redis, DynamoDB, Neo4j",
    "Big Data": "Spark, HBase, Hadoop, Gremlin, TinkerPop",
    "Testing & Design": "JUnit, Selenium, KISS, SOLID, YAGNI",
    Methods: "Spec-Driven Development, Artifact-Based Review, Staging-as-Review, LLM Velocity Management, Lean, Kanban",
  },
  openSource: [
    {
      name: "typescript-generator",
      repo: "https://github.com/IodeSystems/typescript-generator",
      desc: "Generates TypeScript interfaces from Java/Kotlin classes with Spring Boot support — Gradle plugin + programmatic API",
    },
    {
      name: "tshell",
      repo: "https://github.com/IodeSystems/tshell",
      desc: "Sandboxed JS-syntax computation framework for LLMs — one eval tool replacing 20+ MCP tools",
    },
    {
      name: "kotlinx-htmx",
      repo: "https://github.com/IodeSystems/kotlinx-htmx",
      desc: "Zero-dependency streaming HTML DSL for Kotlin with HTMX, ChartJS, and Spring integrations",
    },
    {
      name: "dataset",
      repo: "https://github.com/IodeSystems/dataset",
      desc: "Type-safe query builder converting freeform user queries to JOOQ SQL via ANTLR4 grammar",
    },
  ],
  patent: {
    title:
      "Systems and Methods for Optimizing a Video Storage Footprint While Minimizing User Impact",
    number: "20230136641",
  },
  motivations: [
    { label: "Impact", text: "Meaningful work benefiting large populations" },
    {
      label: "Root Cause",
      text: "Proactive problem-solving from code to organizational incentives",
    },
    {
      label: "Data Driven",
      text: "Measure progress before declaring completion",
    },
    {
      label: "Big Picture",
      text: "Balance daily operations with strategic contributions",
    },
  ],
};
