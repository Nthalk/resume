export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string[];
  compliancePrompt: string;
}

export const posts: BlogPost[] = [
  {
    slug: "the-new-project-manager-is-a-senior-developer",
    title: "The New Project Manager Is a Senior Developer",
    date: "2026-04-01",
    summary:
      "Non-technical PMs can't keep pace with LLM-driven velocity. The role now belongs to senior developers defending quality, managing debt, and designing self-steering codebases.",
    content: [
      `**TL;DR:** LLM velocity makes non-technical project management untenable. The new PM is a senior dev whose job is architectural compliance, tech debt defense, and designing codebases that steer agents toward correct answers.`,

      `## The old model worked because velocity was human-limited`,

      `Project management made sense as a separate discipline when the bottleneck was coordination. Shipping took weeks. The engineers were experienced in their domain, led by people who understood the project. A non-technical PM could track timelines and manage dependencies because the pace of change was slow enough to track.`,

      `The PM didn't need to understand the architecture because the architecture moved slowly. Decisions were made in meetings, enforced by senior engineers. Bad decisions surfaced with time to course-correct.`,

      `That model is dead.`,

      `## Velocity broke the abstraction`,

      `Agents produce in an afternoon what used to take a sprint. Multiple projects in parallel, each generating PRs faster than anyone can review. I'm managing several projects simultaneously, and the primary activity isn't coordination — it's corralling bad architectural decisions made by LLMs.`,

      `Non-technical PMs never really looked at PRs anyway — they reviewed test plans. But now that everyone with an LLM considers themselves a project manager, PRs are completely ignored. Code goes up, nobody reviews the architecture, and it lands in staging before anyone with technical judgment sees it.`,

      `The only hope of saving your project is a test suite, a verifiable test plan, and video demos. That's the review surface now. I routinely receive a batch of test plans and demo recordings to review, submit change requests on, and send back for rework — and this is after the code has already hit staging. That's by design. Blocking merges and rebasing complicated features to enforce quality gates kills the velocity you're trying to preserve. Let it into staging. Don't let it into production. Staging is the review environment, not the "it's almost done" environment.`,

      `The review surface also includes measurable performance indicators — response times, bundle sizes, query counts, memory usage. A feature can pass every test and still be a regression if it doubles the p95 latency. But at high velocity you can't drown in dashboards. The right approach is outlier-only reporting: don't show me the 50 KPIs that are fine, show me the 3 that moved. If nothing crossed a threshold, the report is empty and I move on.`,

      `This means the quality gate shifts. It's no longer "does this PR look right?" It's "does this feature work correctly, match the spec, not break what was already working, and not degrade performance?" That's a test plan, a demo, and an outlier report — not a diff review.`,

      `## The new role: quality at velocity`,

      `The person managing an LLM-driven project needs to be a senior developer. Not because they're writing all the code, but because the job is now:`,

      `- **Architectural compliance.** Every PR must conform to the system's dependency structure, naming conventions, and data flow patterns. Agents don't intuit these. Someone enforces them.
- **Tech debt triage.** LLMs produce debt at the same velocity they produce features. A week of unmanaged agent development creates months of cleanup. Catch it in real time or don't catch it at all.
- **Future-proofing.** Agents optimize for the immediate task. They don't consider how today's decision constrains tomorrow's options. That requires deep technical understanding.`,

      `This is where the true differentiators will be. Not who ships fastest — everyone has the same models. The gap: teams that maintain quality at velocity vs. teams that ship fast and drown in debt.`,

      `## The junior developer parallel`,

      `I've led teams with junior developers for years. A motivated junior produces a lot of code fast, but without guardrails, that code creates problems that take longer to fix than to write.`,

      `The solution was never "slow them down." It was:`,

      `- **Guardrails everywhere.** Linters, formatters, pre-commit hooks, CI checks. Every automated constraint is one less thing to catch in review.
- **Errors that teach.** "Failed" is useless. "This module can't import from that layer — see ARCHITECTURE.md" teaches the correct pattern.
- **Tools that encapsulate workflow.** \`bin/feature todo\` tells you what to work on. \`bin/clown-check\` catches regressions at commit time. The less you rely on the developer to remember the process, the more reliable the process.`,

      `Everything I learned managing juniors applies to LLMs, amplified. Faster, more literal, more confident in their mistakes. Guardrails matter more, not less.`,

      `## Feature maps make the workflow fall out naturally`,

      `In Veliode, I built a feature map that tracks every feature through a progression: does the feature exist? Do specs exist? Do the specs have API tests? Do the specs have UI tests? Is there a recorded demo? Each question is a concrete, checkable state — not a ticket status someone remembered to update.`,

      `When you hand an agent \`bin/feature todo\`, it sees the next gap in the progression and fills it. Write the spec. Write the API test. Write the UI test. Record the demo. The natural workflow falls out of the tool — nobody has to decide what to work on next or remember what state a feature is in. The feature map is the backlog, the progress tracker, and the definition of done, all derived from the code.`,

      `This is what I mean by tools that encapsulate workflow. The agent doesn't need a project manager assigning tasks. It needs a tool that answers "what's incomplete?" with a concrete, actionable answer. The ralph loop — plan, code, test, ship, repeat — becomes the default behavior because the tooling makes it the path of least resistance.`,

      `## Design for the first-time reader`,

      `The general strategy: **design a codebase that an LLM seeing your project for the first time will get the answer right, or be told how to get it right.**`,

      `This reframes every architectural decision. Not "is this clean?" but "will an agent with no prior context make the correct change here?"`,

      `- **Explicit over implicit.** If the pattern isn't visible in the file being edited, the agent won't follow it. Convention-over-configuration is hostile to LLMs.
- **Errors that guide.** An agent that hits a useful error message self-corrects. An agent that hits a stack trace hallucinates a workaround.
- **Architecture in the repo.** \`CLAUDE.md\`, \`ARCHITECTURE.md\`, module-level READMEs. If the rules aren't in files, the rules don't exist.
- **Small, enforced boundaries.** Clear module boundaries with explicit public APIs. An agent scoped to one module can't create cross-cutting messes.`,

      `The codebase should be self-steering. When it can't steer, it should be self-correcting — providing feedback that guides the agent back on track.`,

      `## Before a project is ready for velocity`,

      `None of this works if you bolt it on after the fact. Before I let agents loose on a project, I set up four things:`,

      `- **Rapid shipping to staging.** Every branch deploys to staging automatically. The PR itself gates on high-signal tests — the ones that catch structural regressions and verify core contracts — plus KPI checks that flag anything horribly wrong. Not a full review, just enough to ensure nothing catastrophic lands. If those pass, it's in staging within minutes. This is what makes the "review in staging, gate at production" model viable.
- **A distributable test CLI.** A single command that can run the full test plan against a live staging environment or spin up a temporary one. Includes \`--demo\` to record video evidence. Anyone — human or agent — can verify a feature end-to-end without knowing the test internals.
- **Per-test timing and metrics.** Every test reports its own duration and resource usage. These aggregate to a branch-level baseline so you can see at a glance whether a branch made things slower, heavier, or flakier. This feeds the outlier reporting — no baseline, no outliers.
- **An artifact server.** Test logs, metrics, and demo videos produced by each branch are stored and referenced in PRs and daily reports. When I review a batch of features, I'm not re-running anything — I'm reading results and watching recordings. The artifact server is what makes high-volume review possible without high-volume effort.`,

      `This infrastructure is the job. Features are the easy part. The hard part is making the project survive its own velocity.`,

      `## The PM gap is a quality gap`,

      `Projects that rely on non-technical management for LLM-driven work will ship fast and accumulate invisible debt. Architecture erodes, test suites weaken, the codebase becomes harder to change — the one thing you can't afford when your model is built on speed of change.`,

      `The projects that win will have senior developers whose job is structural integrity at velocity. Not writing features. Not managing timelines. Designing guardrails, reviewing architecture, building tools that keep quality high when everything else moves fast.`,

      `That's the new project manager. Technical to the core.`,
    ],
    compliancePrompt: `Audit this project for velocity-readiness. High-velocity LLM-driven development requires infrastructure that maintains quality without blocking speed: automated staging, test tooling, metrics baselines, and architectural guardrails. Check each item and report PASS, FAIL, or N/A with a one-line explanation:

1. Staging pipeline: Can a branch deploy to staging automatically after passing CI? Is there a clear gate between staging and production?
2. Test CLI: Is there a single command that runs the full test plan against a live or temporary environment? Does it support recording demos?
3. Per-test metrics: Do tests report timing and resource usage? Is there a branch-level baseline for outlier detection?
4. Artifact server: Are test logs, metrics, and demo videos stored per-branch and referenced in PRs or reports?
5. KPI outlier reporting: Are performance indicators tracked with threshold-based alerting, showing only regressions?
6. Feature map: Is there a machine-readable feature inventory that tracks spec coverage, test coverage (API + UI), and demo status?
7. Architectural guardrails: Are dependency rules, naming conventions, and module boundaries enforced by tooling (linters, CI, pre-commit hooks)?
8. Self-steering codebase: Do error messages, CLAUDE.md/ARCHITECTURE.md, and module READMEs exist such that an LLM with no prior context can make correct changes or be told how?

For each FAIL, suggest a concrete next step.`,
  },
  {
    slug: "rational-software-in-a-ralph-loop",
    title: "Software That Stays Rational in a Ralph Loop",
    date: "2026-03-23",
    summary:
      "How to keep things testable, stable, and sane when the development loop runs in minutes instead of days.",
    content: [
      `**TL;DR:** Test boundaries not internals, make every PR independently deployable, version shared interfaces, revert fast. LLMs accelerate tech debt — structure is the only brake.`,

      `## The speed trap`,

      `A well-orchestrated agent can discover a task, plan, write code, run tests, open a PR, and move on — all in the time it takes to read this paragraph. Ten concurrent sessions and you're shipping at an absurd pace.`,

      `But velocity has a failure mode. We've all inherited codebases that were written fast and are now expensive to change. LLMs accelerate this. The question isn't whether you can ship fast. It's whether what you shipped survives next week.`,

      `## What "rational" means`,

      `A rational codebase lets a reader — human or LLM — predict the effect of a change without reading the whole system. Every principle below serves that goal.`,

      `**Locality of reasoning.** A function's behavior should be determinable from its signature and body. If understanding \`processOrder()\` requires reading six files, the codebase has a reasoning problem. LLMs operate in bounded context windows. Code that requires global knowledge to modify will be modified incorrectly.`,

      `**Explicit data flow.** Implicit state — singletons, thread-locals, ambient context — is invisible to agents. They see parameters and return values. If behavior depends on something they can't see, they'll produce code that works in the test and fails in production. Make the wiring visible.`,

      `**Small surface area.** Every public API is a commitment. LLMs create helpers and abstractions eagerly. Unchecked, this produces a combinatorial explosion of interactions. Fewer public entry points, fewer ways to break things.`,

      `## Testability is non-negotiable`,

      `In a ralph loop, tests are the feedback signal that keeps the loop from diverging. Without them you're doing open-loop control — sending commands without observing results.`,

      `**Test the boundary, not the implementation.** Agent-written code churns. Tests coupled to internals break every iteration, training the agent to weaken assertions. Test the contract: given this input, expect this output.`,

      `**Make the suite fast.** A five-minute suite gets skipped. When agents iterate in 30-second loops, slow tests create gaps where untested changes accumulate. Parallel execution, in-memory databases, targeted test selection — these are requirements, not optimizations.`,

      `**Integration tests over mocks for critical paths.** Mocks verify your code calls what you told it to call. Integration tests verify the system works. The gap between "the mock says fine" and "production says no" gets discovered on Friday evening.`,

      `## Stability through structure`,

      `**Immutable checkpoints.** Every PR leaves the system working. Agents optimizing for throughput will "fix it in the next PR." That next PR has different context. Enforce the invariant: every merge is deployable.`,

      `**Dependency direction.** High-level policy shouldn't depend on low-level detail. When agent A modifies a schema and agent B modifies the API layer, the change that stays within the dependency boundary won't conflict.`,

      `**Version your interfaces.** With parallel agents, interface contracts are coordination points. Changing a shared interface without versioning it silently breaks every other session's work.`,

      `## The human role changes`,

      `In a ralph loop, you're not writing most of the code. You're deciding what "rational" means for this system — setting constraints, reviewing architecture, catching drift that no individual PR reveals.`,

      `It's like managing very fast, very literal junior devs. They do exactly what you ask, quickly. The leverage is in what you ask for — and what you refuse to accept.`,

      `## Practical checklist`,

      `- **Every PR passes CI independently.** No "this fixes the last one" chains.
- **Coverage gates are enforced.** Agents find the path of least resistance.
- **Shared interfaces are versioned.** Even a comment-level contract beats none.
- **Architecture decisions live in the repo.** Agents read files, not your mind.
- **Review cadence matches velocity.** Agents merging every 30 minutes + daily review = 48 unreviewed changes. Automate the reviewable parts.
- **Revert fast.** Cheaper than debugging a cascade built on a bad change.`,
    ],
    compliancePrompt: `Audit this project for codebase rationality. A rational codebase lets a reader — human or LLM — predict the effect of a change without reading the whole system. Check each item and report PASS, FAIL, or N/A with a one-line explanation:

1. Locality of reasoning: Can a function's behavior be understood from its signature and body alone, without reading unrelated files?
2. Explicit data flow: Is state passed through parameters and return values rather than singletons, thread-locals, or ambient context?
3. Small surface area: Are public APIs minimal? Are there unnecessary helpers or abstractions that expand the interaction surface?
4. Boundary testing: Are tests written against contracts (input/output) rather than coupled to internal implementation details?
5. Fast test suite: Does the full suite run in under 2 minutes? Are there slow tests blocking iteration?
6. Integration tests on critical paths: Are critical paths (payments, auth, data persistence) covered by integration tests, not just mocks?
7. Immutable checkpoints: Does every PR leave the system in a deployable state? Are there "fix it in the next PR" chains?
8. Interface versioning: Are shared interfaces versioned or contracted so parallel work doesn't silently break?
9. Review cadence: Does review frequency match commit frequency, or are unreviewed changes accumulating?

For each FAIL, suggest a concrete next step.`,
  },
  {
    slug: "cli-tools-that-keep-you-moving",
    title: "CLI Tools That Keep You Moving",
    date: "2026-03-23",
    summary:
      "Repo-native CLI tools that derive state from code, prioritize work, and track progress — no kanban board required.",
    content: [
      `**TL;DR:** \`features.yaml\` + \`bin/feature todo\` replaces your kanban board. Dual-driver specs (API + UI) auto-track progress. \`bin/demo\` records proof. No tickets to update — the code is the project management.`,

      `## Big projects and lost context`,

      `Veliode is a full-stack service business platform — appointments, scheduling, booking, billing, multi-location. Monday morning, you don't know what to work on first. Features in every state: some need API work, some need UI, some need tests, some are half-built, some are broken.`,

      `The usual answer is Jira or a kanban board. Problem: you have to maintain it. Updating tickets competes with actual work.`,

      `I wanted tools that live in the repo, derive state from the code, and tell me what to do next in one command.`,

      `## features.yaml: single source of truth`,

      `Every feature is defined in a YAML file at the repo root. Committed, diffed, reviewed like code. Each feature has a name, status, and hierarchy. Statuses follow a lifecycle: \`needs-review\` → \`missing\` → \`overhaul\` → \`align\` → \`expand\` → \`refine\` → \`ok\` → \`deprecated\`.`,

      `Simple. But the power is in the tooling that reads it.`,

      `## bin/feature todo`,

      `One command. No arguments. Scans the YAML, cross-references \`@FeatureSpec\` annotations, checks test results, prints a priority-ordered list. Priority: FIX → PLAN → API → UI → DEPR.`,

      `No remembering where you left off. No checking a board. Type \`bin/feature todo\`, the repo tells you what matters.`,

      `Output is a short ranked list: feature name, status, what's missing. Nothing else.`,

      `## bin/feature [name]: drill down`,

      `\`bin/feature Checkout\` — specs, test status, API coverage, UI coverage, passing, failing. One command, one argument, complete picture.`,

      `\`bin/feature Checkout api\` — just API specs. \`bin/feature Checkout ui\` — just UI specs. Output matches your focus.`,

      `## Dual-driver specs`,

      `Every feature spec has two drivers: API and UI. Both implement the same \`Steps\` interface but exercise different layers. API driver validates backend via REST. UI driver validates rendering via Playwright.`,

      `Build features in layers: write the API spec, build backend until the API driver passes, then build UI until the UI driver passes. \`bin/feature todo\` reflects progress automatically — status updates based on which specs pass.`,

      `No ticket updates. No card moves. The code is the project management.`,

      `## bin/demo: proof it works`,

      `\`bin/demo --feature Checkout\` takes existing specs and records browser demos — screen recordings of the feature being exercised. Visual evidence for PRs, stakeholders, or your future self.`,

      `Ad-hoc demos too:`,

      `\`\`\`
bin/demo "login-flow" <<'EOF'
  page.navigateTo("/login")
  page.fillByTestId("login-email", "test@example.com")
  page.clickButton("Sign in")
EOF
\`\`\``,

      `Specs become living documentation. Pass a spec, get a recording. Change a spec, auto-record the new behavior.`,

      `## The pattern`,

      `- **Minimal input.** One command, zero or one argument.
- **Derived state.** Tools read the code, not a separate system. No sync problem.
- **Prioritized output.** What matters most, in order.
- **Progressive detail.** Broad → narrow. Each level gives exactly the context for the current decision.`,

      `Adding a feature: add a YAML entry, write specs. Tooling handles progress tracking, priority ordering, evidence recording, quality gating.`,

      `The tracking is the testing. The project management is the code. \`bin/feature todo\` always knows what's next.`,
    ],
    compliancePrompt: `Audit this project for CLI-driven workflow. Projects stay productive when tooling lives in the repo, derives state from code, and tells you what to work on next without external systems. Check each item and report PASS, FAIL, or N/A with a one-line explanation:

1. Feature inventory: Is there a machine-readable file (YAML, JSON, etc.) that lists all features and their statuses?
2. Single-command priority: Is there a command that outputs a prioritized list of what to work on next, derived from code state?
3. Feature drill-down: Can you get spec status, test coverage, and pass/fail for a single feature with one command?
4. Dual-layer testing: Are features tested at both the API and UI layers with shared spec definitions?
5. Automated progress tracking: Does test pass/fail status automatically update feature progress without manual ticket management?
6. Demo recording: Is there a command that records video evidence of features being exercised?
7. Derived state: Do all project management tools derive their state from the code, or do they require manual sync with an external system?

For each FAIL, suggest a concrete next step.`,
  },
  {
    slug: "clown-check",
    title: "Clown Check: Separating Dev from Reviewer",
    date: "2026-03-24",
    summary:
      "A pre-commit hook that runs a separate Claude session to catch the shortcuts the coding session won't admit to.",
    content: [
      `**TL;DR:** A pre-commit hook runs Claude as a reviewer (separate session from the dev) to catch deleted tests, disabled validation, empty catch blocks, and other regressions that the coding agent won't flag on itself.`,

      `## The problem`,

      `When an LLM writes code and reviews its own code, it has a blind spot: it's already decided the approach is correct. The same session that deleted a test will rationalize the deletion. "The test was fundamentally broken." "The test was testing implementation details." "The test was redundant."`,

      `Sometimes that's true. Often it's the agent taking the path of least resistance — deleting the test is easier than fixing the code the test caught.`,

      `Humans do this too. That's why we have code review: a second set of eyes that didn't write the code and isn't invested in the approach. The reviewer catches what the author can't see.`,

      `LLM workflows need the same separation. The agent that writes the code should not be the agent that reviews it.`,

      `## bin/clown-check`,

      `\`bin/clown-check\` is a pre-commit hook in Veliode. Before a commit lands, it invokes a fresh Claude session — separate from whatever wrote the code — and asks it to review the staged diff.`,

      `The review is structured around two commit types:`,

      `**Scaffolding commits** — TODOs, stubs, placeholders are expected. The reviewer checks that scaffolding is clearly marked and doesn't pretend to be finished.`,

      `**Implementation commits** — TODOs mean incomplete work. The reviewer checks that the implementation actually implements what it claims.`,

      `## What it catches`,

      `The reviewer flags patterns that indicate the dev session cut corners:`,

      `- **Deleted tests.** The most common regression. A test fails, the agent deletes it instead of fixing the underlying code. The agent's own reasoning: "the test was problematic." The reviewer's job: prove it.
- **Disabled validation.** Commenting out checks, adding \`@Suppress\`, weakening type constraints.
- **Empty catch blocks.** Swallowing errors to make tests pass.
- **Unexplained lint suppressions.** \`eslint-disable\` without a comment explaining why.
- **Test weakening.** Loosening assertions, removing edge cases, converting specific checks to \`assertNotNull\`.`,

      `The output is binary: \`PASS\` or \`FAIL: [reason]\`. No ambiguity.`,

      `## Why separation matters`,

      `A single Claude session asked "write this feature and make sure it's good" will produce code and then confirm its own code is good. The context is contaminated — the session has already committed to the approach.`,

      `A fresh session looking only at the diff has no investment in the approach. It sees: "this commit deletes three tests and adds no new ones." That's a fact, not a judgment call. The reviewer doesn't need to understand why the tests existed — it just needs to flag that coverage went down and the commit should explain why.`,

      `This mirrors how human code review works. The reviewer doesn't have the author's full context, and that's a feature. It forces the diff to be self-explanatory.`,

      `## The deleted-test pattern`,

      `This deserves its own section because it's the most insidious failure mode.`,

      `An LLM working on a feature encounters a failing test. The correct response: understand why the test fails, fix the code or update the test to match the new behavior. The lazy response: delete the test, claim it was "fundamentally broken" or "testing implementation details."`,

      `The problem: both responses look identical in the session's own reasoning. The agent genuinely believes the test was broken — it doesn't have the context of why the test was written in the first place. It only sees that removing the test makes everything green.`,

      `\`bin/clown-check\` catches this by flagging any commit that reduces test count without a corresponding explanation in the commit message or new tests that cover the same behavior. The coding session can still delete tests — but it has to justify the deletion to a reviewer that isn't already convinced.`,

      `## Integration with the ralph loop`,

      `In a fast development loop, clown-check adds maybe 10 seconds to each commit. That's cheap insurance against the compounding cost of regressions.`,

      `Without it, a single afternoon of agent-driven development can quietly delete a dozen tests, each one "justified" by the session that deleted it. By the time you notice, the coverage holes have been built on top of. Restoring the tests means understanding code that's changed significantly since they were removed.`,

      `With it, every deletion is flagged at commit time. The developer (human or agent) either justifies it or doesn't commit. Regressions caught at the boundary, not discovered downstream.`,

      `## Setup`,

      `The hook is simple: run \`claude\` against the staged diff with a prompt that distinguishes scaffolding from implementation and flags the patterns above. Output is \`PASS\` or \`FAIL: [reason]\`. Runs as a git pre-commit hook — no CI delay, no PR review wait.`,

      `The key insight is that the reviewer prompt is static and doesn't share conversation history with the coding session. Clean context, no prior commitment to the approach, no rationalization.`,
    ],
    compliancePrompt: `Audit this project for dev/reviewer separation. LLMs that write code and review their own code have a blind spot — they rationalize their own shortcuts. Quality requires a separate review session that examines diffs without the authoring context. Check each item and report PASS, FAIL, or N/A with a one-line explanation:

1. Separate review session: Is there a pre-commit or pre-merge hook that reviews diffs using a fresh LLM session (not the one that wrote the code)?
2. Deleted test detection: Does the review process flag commits that reduce test count without justification?
3. Disabled validation detection: Does the review catch commented-out checks, @Suppress additions, or weakened type constraints?
4. Empty catch block detection: Does the review flag swallowed exceptions?
5. Lint suppression audit: Are eslint-disable / @SuppressWarnings flagged when they lack explanatory comments?
6. Test weakening detection: Does the review catch loosened assertions, removed edge cases, or downgraded checks?
7. Scaffolding vs implementation distinction: Does the review process distinguish between scaffolding commits (TODOs expected) and implementation commits (TODOs = incomplete)?
8. Binary output: Does the review produce a clear PASS/FAIL result, not a nuanced suggestion?

For each FAIL, suggest a concrete next step.`,
  },
  {
    slug: "one-tool-to-replace-twenty",
    title: "One Tool to Replace Twenty: Why I Built tshell",
    date: "2026-03-23",
    summary:
      "Twenty MCP tools burn 4,000 tokens before the model does anything. tshell replaces them with one eval interface at 1,641 tokens.",
    content: [
      `**TL;DR:** tshell is a sandboxed JS-subset eval tool for LLMs. One tool schema replaces 20+. Pipe operator enables single-expression composition. Commands discovered at runtime via \`help()\`, not baked into the prompt. 1,641 tokens total. Maven Central.`,

      `## The context window tax`,

      `MCP tool schemas go into the system prompt. Name, description, parameters, types, examples. A typical tool: 150–250 tokens. Playwright alone adds 8KB.`,

      `Those tokens compete with the conversation, the code, the files being read. Twenty tools at 200 tokens each = 4,000 tokens permanently occupied by descriptions the model may never use.`,

      `Every new capability grows the prompt. SQL tool, file tool, git tool, browser tool — each pushes out room for actual work. And since schemas are baked into the system prompt, the KV cache invalidates when you change the tool set.`,

      `## The insight`,

      `LLMs already know JavaScript. Give a model a JS-like eval interface instead of twenty tools and it can compose operations in one call. The schema for one eval tool is tiny.`,

      `tshell is a sandboxed JS subset — familiar enough for correct calls without special prompting, constrained enough for safe execution. No \`class\`, no \`this\`, no \`import\`, no arbitrary filesystem access. You get: variables, functions, arrows, template strings, destructuring, and the pipe operator.`,

      `## The pipe operator`,

      `\`|>\` passes the left-hand value as the first argument to the right-hand function:`,

      `\`\`\`
"hello world" |> split(" ") |> map(w => w |> upper()) |> join(" ")
// → "HELLO WORLD"
\`\`\``,

      `Three tool calls become one expression. The model writes it naturally — it already knows the pattern. No training needed.`,

      `\`|*\` scatters over elements in parallel. \`<|\` feeds additional arguments. Together they cover composition patterns that would otherwise require orchestration in the model's reasoning.`,

      `## 1,641 tokens total`,

      `Tool description, syntax reference, all command signatures: 1,641 tokens. That's the context cost regardless of capability count. Compare: 2,000–4,000 for 10–20 typical MCP tools.`,

      `Key decision: commands aren't in the system prompt. They're discoverable at runtime via \`help()\`. Adding a toolkit — SQL, browser, a custom MCP server — doesn't grow the prompt. System prompt stays constant. KV cache stays warm.`,

      `## Polyglot composition`,

      `tshell wraps external MCP servers as namespaced commands. Python, Go, TypeScript servers all callable in one expression:`,

      `\`\`\`
app.users() |> filter(u => u.active) |> sort("name") |> map(u => u.name)
\`\`\``,

      `One eval call, one round trip. Without tshell: three tool calls, three round trips, three chances for the model to lose track.`,

      `## The double-escaping problem`,

      `LLM tool call backslash hell: model writes \`\\n\`, JSON escapes it, interpreter sees... something. Leads to \`\\\\\\\\\` spirals.`,

      `tshell fixes this two ways. Raw template strings (\`r\` prefix) disable escape processing. And the \`vars\` parameter passes complex strings as structured data, bypassing escaping entirely:`,

      `\`\`\`
{
  "code": "edit(filepath, pattern, replacement)",
  "vars": {
    "filepath": "C:\\\\Users\\\\admin\\\\config.ini",
    "pattern": "\\\\d{3}-\\\\d{4}",
    "replacement": "[redacted]"
  }
}
\`\`\``,

      `Vars bind as constants before execution. No escaping dance.`,

      `## Benchmarks`,

      `33/33 challenges passed on Qwen3-5-35B (mid-range open model), averaging 1.3 tool calls per task. Tasks that normally need split → filter → count → format chains complete in a single eval.`,

      `Fewer round trips = faster completion, fewer chances to go off track.`,

      `## Why not a REPL?`,

      `A REPL gives full language access: infinite loops, dangerous imports, arbitrary filesystem access. tshell has step limits, call depth limits, timeouts, output caps. Safe to execute without reviewing every expression.`,

      `The other difference: tshell is an MCP server that bridges other MCP servers. Point it at existing tool infrastructure, it wraps everything into one eval interface. The model doesn't know it's talking to five servers. It just writes expressions.`,

      `## Takeaway`,

      `MCP ecosystem is growing. Context windows aren't keeping pace. Every tool you add makes the model less effective at everything else.`,

      `tshell inverts the curve: capabilities grow, prompt stays constant. One tool, 1,641 tokens, unlimited composition. Maven Central, open source.`,
    ],
    compliancePrompt: `Audit this project's LLM tool integration for context efficiency. Every MCP tool schema burns prompt tokens. Fewer tools with composable interfaces reduce token cost and increase model effectiveness. Check each item and report PASS, FAIL, or N/A with a one-line explanation:

1. Tool schema budget: How many MCP tool schemas are in the system prompt? What is the total token cost? Is it under 2,000 tokens?
2. Composition in one call: Can the model compose multi-step operations (filter, transform, aggregate) in a single tool call, or does it require multiple round trips?
3. Runtime discovery: Are tool capabilities discoverable at runtime (e.g. help()) rather than baked into the system prompt?
4. Prompt stability: Does adding a new capability (new MCP server, new command set) grow the system prompt, or does it stay constant?
5. Escaping safety: Are complex strings (file paths, regex, multi-line content) passed as structured data to avoid double-escaping issues?
6. Execution safety: Are eval/script tools sandboxed with step limits, timeouts, and output caps?
7. Multi-server bridging: Can the model call capabilities from multiple backend servers in a single expression?

For each FAIL, suggest a concrete next step.`,
  },
];
