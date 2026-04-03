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
      "Non-technical PMs can't survive LLM velocity. The role belongs to senior devs defending architecture, managing debt, and designing codebases that steer agents toward correct answers.",
    content: [
      `**TL;DR:** The PM role now belongs to a senior dev. Their job: architectural compliance, tech debt defense, and codebases that steer agents toward correct answers. Non-technical management can't survive LLM velocity.`,

      `## The old model died on schedule`,

      `Project management worked as its own discipline when shipping took weeks. A non-technical PM could track timelines because the architecture moved slowly enough to track. Bad decisions surfaced with time to fix them. The PM correlated work to value — and that was genuinely hard to automate when velocity was human-limited.`,

      `It isn't anymore.`,

      `## Velocity broke the abstraction`,

      `Agents produce in an afternoon what used to take a sprint. I'm managing several projects simultaneously, and the primary activity isn't coordination — it's corralling bad architectural decisions before they metastasize.`,

      `The old bottlenecks — focus, heads-down time, skill — are gone. What limits throughput now is alignment. An LLM can track feature completeness, test coverage, and spec compliance as well as any PM. That was the PM's job. What isn't automatable is the judgment to know when the automated tracking is wrong.`,

      `Non-technical PMs never really looked at PRs — they reviewed test plans. Now that everyone with an LLM considers themselves a project manager, nobody reviews the architecture at all. Code lands in staging before anyone with technical judgment sees it.`,

      `So: let it into staging. Don't let it into production. Staging is the review environment, not the "it's almost done" environment. I review batches of test plans and demo recordings, submit change requests, send back for rework. All after the code has hit staging. Blocking merges to enforce quality gates kills the velocity you're trying to preserve.`,

      `A feature can pass every test and still be a regression if it doubles p95 latency. But you can't drown in dashboards. Outlier-only reporting: show me the 3 KPIs that moved, not the 50 that are fine. If nothing crossed a threshold, the report is empty. I move on.`,

      `The quality gate is no longer "does this PR look right?" It's a test plan, a demo, and an outlier report.`,

      `## The new role: quality at velocity`,

      `The person managing an LLM-driven project needs to be a senior developer. Not because they write the code. Because the job is now:`,

      `- **Architectural compliance.** Agents don't intuit your dependency structure. Someone enforces it.
- **Tech debt triage.** One week of unmanaged agent dev creates months of cleanup. Catch it now or don't catch it.
- **Future-proofing.** Agents optimize for the immediate task. They don't care that today's shortcut kills tomorrow's options.`,

      `Everyone has the same models. The gap isn't who ships fastest. It's who maintains quality at speed vs. who drowns in debt.`,

      `Team structure converges to one senior dev per project set — bounded not by hours or code output, but by how many systems one person can maintain alignment across. That's the saturating resource.`,

      `## The junior developer parallel`,

      `Motivated juniors produce a lot of code fast. Without guardrails, that code creates problems that take longer to fix than to write. The solution was never "slow them down."`,

      `- **Guardrails everywhere.** Every automated constraint is one less thing to catch in review.
- **Errors that teach.** "Failed" is useless. "This module can't import from that layer — see ARCHITECTURE.md" teaches the pattern.
- **Tools that encapsulate workflow.** \`bin/feature todo\` says what to work on. \`bin/clown-check\` catches regressions at commit time. The less you rely on memory, the more reliable the process.`,

      `Everything I learned managing juniors applies to LLMs — amplified. Faster, more literal, more confident in their mistakes.`,

      `## Feature maps make work fall out naturally`,

      `Veliode's feature map tracks every feature through a progression: does it exist? Do specs exist? API tests? UI tests? Recorded demo? Each question is a concrete, checkable state — not a ticket status someone remembered to update.`,

      `Hand an agent \`bin/feature todo\` and it sees the next gap and fills it. The feature map is the backlog, the progress tracker, and the definition of done, all derived from the code. No project manager assigning tasks. Just a tool that answers "what's incomplete?"`,

      `## Design for the first-time reader`,

      `The strategy: **design a codebase where an LLM with zero context gets the answer right, or gets told how.**`,

      `- **Explicit over implicit.** If the pattern isn't visible in the file being edited, the agent won't follow it. Convention-over-configuration is hostile to LLMs.
- **Errors that guide.** Useful error message → self-correction. Stack trace → hallucinated workaround.
- **Architecture in the repo.** \`CLAUDE.md\`, \`ARCHITECTURE.md\`, module READMEs. If the rules aren't in files, the rules don't exist.
- **Small, enforced boundaries.** An agent scoped to one module can't create cross-cutting messes.`,

      `## Before you're ready for velocity`,

      `None of this works bolted on after the fact. Four things go in first:`,

      `- **Auto-deploy to staging.** PRs gate on high-signal tests and KPI checks — just enough to prevent catastrophe. If they pass, it's in staging within minutes.
- **A test CLI.** One command runs the full test plan against staging. \`--demo\` records video evidence. Anyone — human or agent — can verify end-to-end.
- **Per-test timing.** Every test reports duration and resource usage, aggregated to a branch-level baseline. No baseline, no outliers.
- **An artifact server.** Test logs, metrics, demo videos — stored per-branch, referenced in PRs. I review features by reading results and watching recordings, not re-running anything.`,

      `This infrastructure is the job. Features are the easy part.`,

      `## The PM gap is a quality gap`,

      `Projects with non-technical management will ship fast and accumulate invisible debt. Architecture erodes, tests weaken, the codebase becomes harder to change — the one thing you can't afford when your model is built on speed of change.`,

      `The projects that win will have senior devs whose job is structural integrity at velocity. Not writing features. Not managing timelines. Designing guardrails, reviewing architecture, building the tools that keep quality high when everything else moves fast.`,
    ],
    compliancePrompt: `Audit this project for velocity-readiness. High-velocity LLM-driven development requires infrastructure that maintains quality without blocking speed: automated staging, test tooling, metrics baselines, architectural guardrails, and alignment mechanisms. Check each item and report PASS, FAIL, or N/A with a one-line explanation:

1. Staging pipeline: Can a branch deploy to staging automatically after passing CI? Is there a clear gate between staging and production?
2. Test CLI: Is there a single command that runs the full test plan against a live or temporary environment? Does it support recording demos?
3. Per-test metrics: Do tests report timing and resource usage? Is there a branch-level baseline for outlier detection?
4. Artifact server: Are test logs, metrics, and demo videos stored per-branch and referenced in PRs or reports?
5. KPI outlier reporting: Are performance indicators tracked with threshold-based alerting, showing only regressions — not dashboards of everything?
6. Feature map: Is there a machine-readable feature inventory that tracks spec coverage, test coverage (API + UI), and demo status?
7. Architectural guardrails: Are dependency rules, naming conventions, and module boundaries enforced by tooling (linters, CI, pre-commit hooks)?
8. Self-steering codebase: Do error messages, CLAUDE.md/ARCHITECTURE.md, and module READMEs exist such that an LLM with no prior context can make correct changes or be told how?
9. Work-to-value correlation: Is feature completeness, test coverage, and spec compliance tracked automatically — not by a human updating tickets?
10. Alignment mechanism: Is there a process ensuring work being done is the right work (architectural fit, product direction) — not just fast work?
11. Explicit over implicit: Are patterns visible in the files being edited, or do they rely on conventions an agent won't know?
12. Error messages that guide: Do build/test failures tell the agent what to do differently, or just report a stack trace?
13. Team scaling model: Is the project structured so one senior developer can maintain alignment across the full system, or does it require coordination meetings to stay coherent?

For each FAIL, suggest a concrete next step.`,
  },
  {
    slug: "rational-software-in-a-ralph-loop",
    title: "Software That Stays Rational in a Ralph Loop",
    date: "2026-03-23",
    summary:
      "Testable, stable, and sane when the development loop runs in minutes. Structure is the only brake on LLM-accelerated debt.",
    content: [
      `**TL;DR:** Test boundaries not internals. Every PR deploys independently. Version your interfaces. Revert fast. Structure is the only brake on LLM-accelerated debt.`,

      `## The speed trap`,

      `A well-orchestrated agent discovers a task, plans, codes, tests, opens a PR, and moves on — in the time it took you to read this sentence. Ten concurrent sessions and you're shipping at a pace that feels like winning.`,

      `You've inherited codebases written this way. They were expensive to change. LLMs just made that failure mode ten times faster.`,

      `## What "rational" means`,

      `A rational codebase lets any reader — human or LLM — predict the effect of a change without reading the whole system.`,

      `**Locality of reasoning.** If understanding \`processOrder()\` requires reading six files, the codebase has a reasoning problem. LLMs operate in bounded context windows. Code that requires global knowledge to modify will be modified incorrectly.`,

      `**Explicit data flow.** Singletons, thread-locals, ambient context — invisible to agents. They see parameters and return values. If behavior depends on something they can't see, they'll write code that passes the test and breaks production.`,

      `**Small surface area.** LLMs create helpers eagerly. Unchecked, you get a combinatorial explosion of interactions. Fewer public entry points, fewer ways to break things.`,

      `## Testability is non-negotiable`,

      `Tests are the feedback signal that keeps the loop from diverging. Without them you're doing open-loop control — sending commands without observing results.`,

      `**Test the boundary, not the implementation.** Agent-written code churns. Tests coupled to internals break every iteration, training the agent to weaken assertions instead. Test the contract.`,

      `**Make the suite fast.** A five-minute suite gets skipped. Agents iterate in 30-second loops. Slow tests create gaps where untested changes pile up.`,

      `**Integration tests over mocks for critical paths.** Mocks verify your code calls what you told it to call. Integration tests verify the system works. The gap between those two gets discovered on Friday evening.`,

      `## Stability through structure`,

      `**Immutable checkpoints.** Agents love to "fix it in the next PR." That next PR has different context. Every merge must be deployable.`,

      `**Dependency direction.** When agent A modifies a schema and agent B modifies the API layer, the change that respects dependency boundaries won't conflict.`,

      `**Version your interfaces.** Changing a shared interface without versioning it silently breaks every other session's work. With parallel agents, this happens constantly.`,

      `## Automate conformance`,

      `At human velocity, convention and code review enforce rules. At agent velocity, every unenforced rule will be broken. The agent doesn't know your conventions unless the tooling tells it.`,

      `**Lint architecture, not just style.** \`no-restricted-imports\`, ArchUnit, custom detekt rules — encode "module A must not depend on module B" as a failing build.`,

      `**Ban things explicitly.** Deprecated APIs, dangerous patterns — make them lint rules, not comments. Bans are cheaper than cleanup.`,

      `**Type-check strictly.** Every type hole is a place where an agent silently does the wrong thing. Stricter types, narrower space of valid programs.`,

      `**Format on commit.** Pick a formatter, enforce it, never discuss formatting again. Agents produce inconsistent style across sessions. Autoformatting makes every diff about logic.`,

      `**Pre-commit hooks as the last gate.** Linting, formatting, type-checking, clown-check — all before code enters the repo. Fast feedback is how agents self-correct. CI failure 10 minutes later means the agent already built on top of the violation.`,

      `If a human would catch it in review, automate it. If you can state it as a rule, it's a lint rule. What's left for humans is the hard stuff: architectural fitness, product judgment, "does this actually solve the problem."`,

      `## The human role changes`,

      `You're not writing most of the code. You're deciding what "rational" means for this system — and refusing to accept deviations. Very fast, very literal junior devs. The leverage is in what you ask for and what you reject.`,

      `## Checklist`,

      `- **Every PR passes CI independently.** No "this fixes the last one" chains.
- **Coverage gates are enforced.** Agents find the path of least resistance.
- **Shared interfaces are versioned.** A comment-level contract beats none.
- **Architecture decisions live in the repo.** Agents read files, not your mind.
- **Review cadence matches velocity.** Merging every 30 minutes + daily review = 48 unreviewed changes.
- **Revert fast.** Cheaper than debugging a cascade.`,
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
10. Linting coverage: Are linters configured and enforced for every language in the project (ESLint, detekt, ktlint, clippy, etc.)?
11. Architectural lint rules: Are dependency direction and module boundary violations enforced by tooling (no-restricted-imports, ArchUnit, custom rules)?
12. Explicit bans: Are deprecated APIs, dangerous patterns, and banned dependencies encoded as lint rules rather than documented conventions?
13. Strict type-checking: Is strict mode enabled (TypeScript strict, explicit nullability) to narrow the space of valid programs?
14. Autoformatting: Is formatting enforced automatically (Prettier, ktfmt, gofmt) on commit or save?
15. Pre-commit hooks: Do linting, formatting, type-checking, and review hooks run before code enters the repo?

For each FAIL, suggest a concrete next step.`,
  },
  {
    slug: "cli-tools-that-keep-you-moving",
    title: "CLI Tools That Keep You Moving",
    date: "2026-03-23",
    summary:
      "One command, no arguments, the repo tells you what to work on. No kanban board required.",
    content: [
      `**TL;DR:** \`features.yaml\` + \`bin/feature todo\` replaces your kanban board. Dual-driver specs auto-track progress. \`bin/demo\` records proof. The code is the project management.`,

      `## Monday morning, lost`,

      `Veliode is a full-stack service business platform — appointments, scheduling, booking, billing, multi-location. Monday morning, you open the repo and every feature is in a different state. Some need API work. Some need UI. Some need tests. Some are half-built. Some are quietly broken.`,

      `The usual answer is Jira. The actual answer is maintaining Jira, which competes with doing the work Jira is tracking.`,

      `## features.yaml`,

      `Every feature lives in a YAML file at the repo root. Committed, diffed, reviewed like code. Statuses follow a lifecycle: \`needs-review\` → \`missing\` → \`overhaul\` → \`align\` → \`expand\` → \`refine\` → \`ok\` → \`deprecated\`.`,

      `The power isn't the file. It's the tooling that reads it.`,

      `## bin/feature todo`,

      `One command. No arguments. Scans the YAML, cross-references \`@FeatureSpec\` annotations, checks test results, prints a priority-ordered list. FIX → PLAN → API → UI → DEPR.`,

      `No remembering where you left off. No checking a board. The repo tells you what matters.`,

      `## bin/feature [name]`,

      `\`bin/feature Checkout\` — specs, test status, API coverage, UI coverage, pass/fail. One command, complete picture.`,

      `\`bin/feature Checkout api\` — just API specs. \`bin/feature Checkout ui\` — just UI. Output matches your focus.`,

      `## Dual-driver specs`,

      `Every spec has two drivers: API and UI. Same \`Steps\` interface, different layers. API validates backend via REST. UI validates rendering via Playwright.`,

      `Build in layers: write the API spec, build backend until it passes, build UI until it passes. \`bin/feature todo\` reflects progress automatically. No ticket updates. No card moves.`,

      `## bin/demo`,

      `\`bin/demo --feature Checkout\` records browser demos from existing specs. Visual evidence for PRs, stakeholders, or your future self wondering if this ever actually worked.`,

      `\`\`\`
bin/demo "login-flow" <<'EOF'
  page.navigateTo("/login")
  page.fillByTestId("login-email", "test@example.com")
  page.clickButton("Sign in")
EOF
\`\`\``,

      `Pass a spec, get a recording. Change a spec, auto-record the new behavior.`,

      `## The pattern`,

      `- **Minimal input.** One command, zero or one argument.
- **Derived state.** Tools read the code, not a separate system. No sync problem.
- **Prioritized output.** What matters most, in order.
- **Progressive detail.** Broad → narrow. Exactly the context for the current decision.`,

      `The tracking is the testing. \`bin/feature todo\` always knows what's next.`,
    ],
    compliancePrompt: `Audit this project for CLI-driven workflow. Projects stay productive when tooling lives in the repo, derives state from code, and tells you what to work on next without external systems. Check each item and report PASS, FAIL, or N/A with a one-line explanation:

1. Feature inventory: Is there a machine-readable file (YAML, JSON, etc.) that lists all features and their statuses?
2. Single-command priority: Is there a command that outputs a prioritized list of what to work on next, derived from code state?
3. Feature drill-down: Can you get spec status, test coverage, and pass/fail for a single feature with one command?
4. Dual-layer testing: Are features tested at both the API and UI layers with shared spec definitions?
5. Automated progress tracking: Does test pass/fail status automatically update feature progress without manual ticket management?
6. Demo recording: Is there a command that records video evidence of features being exercised?
7. Derived state: Do all project management tools derive their state from the code, or do they require manual sync with an external system?
8. Feature lifecycle: Do features follow a defined progression (e.g. missing → spec → API tests → UI tests → demo → complete)?
9. Minimal input: Can the most common workflow actions be performed with zero or one argument?
10. Progressive detail: Does tooling support broad-to-narrow drill-down — overview first, then per-feature, then per-layer?

For each FAIL, suggest a concrete next step.`,
  },
  {
    slug: "clown-check",
    title: "Clown Check: Separating Dev from Reviewer",
    date: "2026-03-24",
    summary:
      "A pre-commit hook that catches the shortcuts the coding session won't admit to.",
    content: [
      `**TL;DR:** A pre-commit hook runs a fresh Claude session — separate from the dev session — to catch deleted tests, disabled validation, and other regressions the coding agent won't flag on itself.`,

      `## The blind spot`,

      `An LLM that writes code and reviews its own code has already decided the approach is correct. The same session that deleted a test will rationalize the deletion. "Fundamentally broken." "Testing implementation details." "Redundant."`,

      `Sometimes true. Often it's the path of least resistance — deleting the test is easier than fixing the code the test caught.`,

      `Humans do this too. That's why code review exists. The agent that writes the code should not be the agent that reviews it.`,

      `## bin/clown-check`,

      `Pre-commit hook. Before a commit lands, a fresh Claude session — no shared context with whatever wrote the code — reviews the staged diff.`,

      `Two commit types, two review modes:`,

      `**Scaffolding commits** — TODOs and stubs are expected. The reviewer checks that scaffolding doesn't pretend to be finished.`,

      `**Implementation commits** — TODOs mean incomplete work. The reviewer checks that the implementation actually implements what it claims.`,

      `## What it catches`,

      `- **Deleted tests.** Test fails, agent deletes it. The agent's reasoning: "problematic." The reviewer's job: prove it.
- **Disabled validation.** Commenting out checks, adding \`@Suppress\`, weakening type constraints.
- **Empty catch blocks.** Swallowing errors to make tests pass.
- **Unexplained lint suppressions.** \`eslint-disable\` without justification.
- **Test weakening.** Loosening assertions, removing edge cases, converting specific checks to \`assertNotNull\`.`,

      `Output is binary: \`PASS\` or \`FAIL: [reason]\`.`,

      `## Why separation matters`,

      `"Write this feature and make sure it's good" will always produce code that the same session confirms is good. The context is contaminated.`,

      `A fresh session sees: "this commit deletes three tests and adds none." That's a fact, not a judgment call. It doesn't need to understand why the tests existed — just that coverage went down and the commit doesn't explain why.`,

      `## The deleted-test pattern`,

      `The most insidious failure mode. An agent hits a failing test. Correct response: fix the code or update the test. Lazy response: delete it, claim it was broken.`,

      `Both look identical in the session's own reasoning. The agent genuinely believes the test was bad — it has no context for why the test was written. It only sees that removing the test makes everything green.`,

      `Clown-check flags any commit that reduces test count without justification or replacement tests. You can still delete tests. You just have to convince a reviewer that isn't already on your side.`,

      `## Cost`,

      `Ten seconds per commit. Without it, a single afternoon of agent-driven development quietly deletes a dozen tests, each one "justified" by the session that deleted it. By the time you notice, the coverage holes have been built on top of.`,

      `With it, regressions are caught at the boundary. Not downstream. Not next week.`,

      `## Setup`,

      `Run \`claude\` against the staged diff with a static prompt. \`PASS\` or \`FAIL: [reason]\`. Git pre-commit hook — no CI delay.`,

      `The reviewer prompt is static. No shared history. No rationalization.`,
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
9. Prompt isolation: Is the reviewer prompt static and context-free — no shared conversation history with the coding session?
10. Overhead budget: Does the review hook complete in under 30 seconds, keeping it viable in fast iteration loops?
11. Commit message justification: When tests are deleted or coverage decreases, does the process require an explanation in the commit message?

For each FAIL, suggest a concrete next step.`,
  },
  {
    slug: "one-tool-to-replace-twenty",
    title: "One Tool to Replace Twenty: Why I Built tshell",
    date: "2026-03-23",
    summary:
      "Twenty MCP tools burn 4,000 tokens before the model does anything. tshell replaces them with one eval interface at 1,641 tokens.",
    content: [
      `**TL;DR:** One sandboxed JS-eval tool replaces 20+ MCP tools. Pipe operator for composition. Runtime-discoverable commands. 1,641 tokens total. Maven Central.`,

      `## The context window tax`,

      `MCP tool schemas live in the system prompt. A typical tool: 150–250 tokens. Playwright alone adds 8KB. Twenty tools at 200 tokens each = 4,000 tokens permanently occupied by descriptions the model may never use.`,

      `Every new capability grows the prompt and invalidates the KV cache. You're paying for tools in the currency your model thinks with.`,

      `## The insight`,

      `LLMs already know JavaScript. One JS-like eval interface replaces twenty tools, composes operations in one call, and the schema is tiny.`,

      `tshell: sandboxed JS subset. No \`class\`, no \`this\`, no \`import\`, no filesystem access. You get variables, functions, arrows, template strings, destructuring, and the pipe operator. Familiar enough for correct calls. Constrained enough for safe execution.`,

      `## The pipe operator`,

      `\`\`\`
"hello world" |> split(" ") |> map(w => w |> upper()) |> join(" ")
// → "HELLO WORLD"
\`\`\``,

      `Three tool calls become one expression. The model already knows the pattern.`,

      `\`|*\` scatters over elements in parallel. \`<|\` feeds additional arguments. Composition patterns that otherwise require orchestration in the model's reasoning.`,

      `## 1,641 tokens`,

      `Tool description, syntax reference, all command signatures. That's the context cost regardless of how many capabilities you add. Compare: 2,000–4,000 for 10–20 typical MCP tools.`,

      `Commands aren't in the system prompt — they're discoverable at runtime via \`help()\`. Add a SQL toolkit, a browser, a custom MCP server. Prompt stays constant. KV cache stays warm.`,

      `## Polyglot composition`,

      `tshell wraps external MCP servers as namespaced commands:`,

      `\`\`\`
app.users() |> filter(u => u.active) |> sort("name") |> map(u => u.name)
\`\`\``,

      `One eval call, one round trip. Without tshell: three calls, three round trips, three chances for the model to lose the thread.`,

      `## The double-escaping problem`,

      `Model writes \`\\n\`, JSON escapes it, interpreter sees... something. The \`\\\\\\\\\` spiral is a rite of passage nobody asked for.`,

      `tshell: raw template strings (\`r\` prefix) disable escape processing. The \`vars\` parameter passes complex strings as structured data, bypassing escaping entirely:`,

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

      `## Benchmarks`,

      `33/33 challenges on Qwen3-5-35B (mid-range open model), averaging 1.3 tool calls per task. Chains that normally need split → filter → count → format complete in a single eval.`,

      `## Why not a REPL?`,

      `A REPL gives infinite loops, dangerous imports, arbitrary filesystem access. tshell has step limits, call depth limits, timeouts, output caps.`,

      `The other difference: tshell bridges MCP servers. Point it at your existing tool infrastructure. The model doesn't know it's talking to five servers. It just writes expressions.`,

      `## Takeaway`,

      `Every tool you add makes the model worse at everything else. tshell inverts the curve: capabilities grow, prompt stays constant. One tool, 1,641 tokens, unlimited composition.`,
    ],
    compliancePrompt: `Audit this project's LLM tool integration for context efficiency. Every MCP tool schema burns prompt tokens. Fewer tools with composable interfaces reduce token cost and increase model effectiveness. Check each item and report PASS, FAIL, or N/A with a one-line explanation:

1. Tool schema budget: How many MCP tool schemas are in the system prompt? What is the total token cost? Is it under 2,000 tokens?
2. Composition in one call: Can the model compose multi-step operations (filter, transform, aggregate) in a single tool call, or does it require multiple round trips?
3. Runtime discovery: Are tool capabilities discoverable at runtime (e.g. help()) rather than baked into the system prompt?
4. Prompt stability: Does adding a new capability (new MCP server, new command set) grow the system prompt, or does it stay constant?
5. KV cache stability: Does the tool schema remain constant across requests, allowing the KV cache to stay warm?
6. Escaping safety: Are complex strings (file paths, regex, multi-line content) passed as structured data to avoid double-escaping issues?
7. Execution safety: Are eval/script tools sandboxed with step limits, call depth limits, timeouts, and output caps?
8. Multi-server bridging: Can the model call capabilities from multiple backend servers in a single expression?
9. Round-trip efficiency: What is the average number of tool calls per task? Is it close to 1?

For each FAIL, suggest a concrete next step.`,
  },
  {
    slug: "show-your-work-transparency-as-architecture",
    title: "Show Your Work: Transparency as Architecture",
    date: "2026-04-01",
    summary:
      "Make the application explain itself. The explanation becomes a test surface, a review surface, and the reason users trust your output.",
    content: [
      `**TL;DR:** Explanations are backend data objects — generated by code, carrying references back to that code, auditable from UI to source. The application explains itself. The explanation becomes a test surface.`,

      `## You can't watch the development`,

      `Multiple agents, parallel PRs, code moving faster than any human reads. Stop tracking the process. Start observing the output.`,

      `Your users face the same problem. They can't audit your process. But they can audit your results — if you let them.`,

      `## Transparency is not logging`,

      `Logging tells you what happened after something goes wrong. Transparency tells the user what's happening now, and why.`,

      `In the King County Assessor Analysis platform, every valuation is drillable. The number on screen isn't a black box — methodology visible, inputs listed, statistical approach explained. A user can see exactly how their property assessment was derived.`,

      `This wasn't just good UX. If the explanation doesn't match the output, that's a visible bug — catchable by any user, any tester, any LLM reviewing the page.`,

      `## Explanations are data objects`,

      `\`\`\`
// Not this:
return { value: 450000, label: "Estimated market value" }

// This:
return {
  value: 450000,
  explanation: {
    method: "sales-comparison",
    inputs: [
      { field: "comparable_sales", count: 12, source: "kc-assessor-2025" },
      { field: "adjustments", factors: ["sqft", "lot_size", "year_built"] }
    ],
    reference: "ValuationService.salesComparison:L142-L198",
    confidence: { r_squared: 0.94, sample_size: 12 }
  }
}
\`\`\``,

      `The \`reference\` field points back to the source code that generated it. An audit process follows the reference, reads the function, verifies the explanation matches. Testable: assert the method matches the code path, the inputs match the data used, the reference points to code that exists.`,

      `## The UI is just one consumer`,

      `Users click into a valuation, see the methodology, the comparables, the adjustment factors. But the explanation objects exist at the API layer — returnable, serializable, assertable.`,

      `Tests call the valuation endpoint and verify the explanation's stated method matches the code path. Compliance audits pull every explanation for a jurisdiction and check consistency. LLM reviewers cross-reference metadata against source code. Every layer agrees, or something is wrong.`,

      `## This solves a portion of code review`,

      `An LLM changes the valuation logic. The explanation still says "sales comparison" but the code now does something else. Testable discrepancy. You don't read the diff — the test catches it.`,

      `The transparency layer becomes a contract. The code promises to do what the explanation says. When code changes, either the explanation updates (visible, reviewable) or a test fails. Cheaper than reviewing every PR. More reliable than trusting the commit message.`,

      `## Domain-specific, not generic`,

      `"Info" tooltips don't cut it. In the KC assessor platform:`,

      `- A valuation box shows the statistical method, R-squared, comparable count, and adjustments applied.
- A trend chart shows time window, outlier exclusion, and data source.
- An area summary shows how boundaries were defined and what aggregation produced the statistics.`,

      `Each is a domain object with generation logic, not a string pasted into a template. Users trust results they can interrogate. They distrust results that just appear.`,

      `## The pattern`,

      `- **Explanations are backend data objects.** Generated by functions, carrying metadata.
- **References point to source code.** Auditable by humans, tests, and LLMs.
- **The UI surfaces them**, but they exist independently at the API layer.
- **Tests verify agreement.** Discrepancies are bugs.
- **Domain-specific.** Each explanation speaks the language of the domain.`,

      `The application explains itself. The explanation becomes a review surface. The code reviews itself every time it runs.`,
    ],
    compliancePrompt: `Audit this project for transparency architecture. Applications that explain their own reasoning — with structured, referenced, testable explanation objects — are partially self-reviewing. Check each item and report PASS, FAIL, or N/A with a one-line explanation:

1. Explanation data objects: Are computation results accompanied by structured explanation objects (not just UI labels)?
2. Source references: Do explanation objects carry references back to the code that generated them (file, function, line range)?
3. Method transparency: Does each explanation state what method/algorithm was used to produce the result?
4. Input visibility: Does each explanation list the inputs and data sources that fed the computation?
5. UI drill-down: Can users drill into results to see methodology, inputs, and confidence metrics?
6. API accessibility: Are explanation objects available at the API layer, not just rendered in the UI?
7. Testable agreement: Are there tests that verify the explanation metadata matches the actual code path taken?
8. Explanation-as-contract: When code changes, does a stale explanation cause a test failure — or does it silently drift?
9. Domain specificity: Are explanations written in domain-specific terms, not generic "computed value" labels?
10. Audit trail: Can a compliance process or LLM reviewer programmatically audit explanations across the system?
11. Code-range references: Do source references use line ranges (e.g. L142-L198) for precise debugging, not just function names?

For each FAIL, suggest a concrete next step.`,
  },
  {
    slug: "project-lifecycle-stages",
    title: "Alpha to Maintenance: Knowing Where Your Project Actually Is",
    date: "2026-04-02",
    summary:
      "Seven stages, each with a specific job. Skip one and the debt forces you back. Value defense is the thread through all of them.",
    content: [
      `**TL;DR:** Seven stages — alpha, beta, fledgling, toddler, adolescent, prime, maintenance. Each has a specific job. Skip it and the debt forces you back or kills the project. Value defense — defining what matters and proving it's preserved — runs through all of them.`,

      `## Why stages matter`,

      `Projects don't fail because of bad code. They fail because the team is solving the wrong problems for the project's current stage. Optimizing deployment during alpha is wasted effort. Ignoring data responsibility during fledgling is a time bomb. Building custom solutions before the fundamentals are stable is vanity engineering.`,

      `## Alpha: exploring value`,

      `Mostly placeholders. Architecture being discovered, not refined. That's healthy. But alpha isn't just "prove the concept" — it's exploring what the value even is and which strategies might deliver it. You're testing hypotheses about the product as much as the code.`,

      `**Do now:**
- Skeleton: stubs, interfaces, data models.
- Feature map, even if every feature says "missing."
- Test harness infrastructure — even if few tests exist yet.
- ARCHITECTURE.md. The earlier it exists, the fewer wrong turns agents take.
- Articulate competing value hypotheses. What problem might this solve? For whom? Which approach wins?`,

      `**Don't:** Optimize. Scale. Polish UI. Commit to one strategy before you've tested alternatives.`,

      `**Value defense:** Value is dreamed of in alpha. Define what "done" could mean — plural. If you can't articulate the value proposition now, velocity will carry you away from it. Not code debt — value debt. The risk at alpha isn't building the wrong thing. It's building the wrong thing fast and never questioning it.`,

      `## Beta: value demonstrated`,

      `Everything works end-to-end but isn't hardened. Direction solidifies as much as it's discovered — you can see what the product actually is, caveats and holes included. The planning stack shifts from exploration to refinement.`,

      `**Do now:**
- Replace every stub with a working implementation.
- Happy-path test coverage on all core features.
- Stabilize API contracts.
- Demo everything. If you can't demo it, it's alpha with fewer TODOs.`,

      `**Don't:** Ship to real users with real data. The system works but hasn't proven it's responsible with what it's given.`,

      `**Value defense:** Value is explored in beta. The system exists end-to-end — does it deliver what was dreamed of, or did the real value turn out to be something you built as a side effect? Reconcile what you set out to build with what you actually built. Adjust. Don't let momentum carry you past this checkpoint.`,

      `## Fledgling: data responsibility`,

      `The question shifts from "does it work?" to "can it be trusted?"`,

      `**Do now:**
- Backup and restore — tested, not documented.
- Non-destructive schema migrations.
- Audit logging for sensitive operations.
- Harden input validation. Edge cases are real bugs now.`,

      `**Don't:** Invite users before backups work. "We'll add backups later" is the fledgling-stage equivalent of deleting tests.`,

      `**Value defense:** Users give you their data. Lose it and the value is negative. Every backup test, every migration dry-run is defending the value you promised.`,

      `## Toddler: stability and observability`,

      `Real users, real data, real consequences. "It works on my machine" dies here.`,

      `**Do now:**
- Performance baselines — measured, not guessed.
- Repeatable, rollback-capable deploys.
- Health checks and uptime monitoring.
- Actionable error alerts, not dashboards nobody watches.
- Load testing against realistic traffic.`,

      `**Don't:** Add features at the expense of stability. Make what exists reliable, not bigger.`,

      `**Value defense:** A feature that works but takes 8 seconds is a feature that drives users away. Performance regressions destroy value silently. Every KPI threshold is a line drawn around the value you've built.`,

      `## Adolescent: distribution and scale`,

      `Single-server architecture hits its limits. The system grows from one process to a coordinated set of services.`,

      `**Do now:**
- Decompose where load demands it — not everywhere.
- Centralized logging. You can't debug distributed systems by SSH-ing into one box.
- API versioning. Downstream consumers can't absorb breaking changes at your pace.
- Capacity planning from growth data, not guesses.`,

      `**Don't:** Distribute prematurely. If one server handles your load, the complexity of distribution is pure cost. Adolescent is a stage you enter because the toddler outgrew its environment, not because microservices are fashionable.`,

      `**Value defense:** A system that can't handle its own success destroys the value it created. Over-engineering for scale you don't have yet also destroys value. Scale to measured need.`,

      `## Prime: unsolved problems`,

      `Fundamentals are solid. What's left are the hard problems unique to your domain that nobody else has solved. Very few projects get here.`,

      `**Do now:**
- Identify pain points no existing tool addresses.
- Build custom solutions from data and experience accumulated through prior stages.
- Open source the reusable parts.`,

      `**Why so few projects reach this:** Most get stuck in perpetual toddler or adolescent — forever chasing stability or scale. The projects that reach prime did the boring work at every prior stage. They earned interesting work by building a foundation that doesn't demand constant attention.`,

      `**Value defense:** The custom solution is the value. One architectural regression can collapse months of domain-specific engineering. Document why it exists and what it solves that alternatives don't.`,

      `## Maintenance: preservation`,

      `Feature-complete. Development shifts from building to preserving.`,

      `**Do now:**
- Automated dependency updates.
- Security vulnerability scanning.
- Triage: bugs that threaten value vs. cosmetic.
- Keep the test suite green. Maintenance-mode test rot is how systems become unmaintainable.`,

      `**Don't:** Add features without re-entering an earlier stage. Maintenance is stable because scope is fixed. New features mean you're back in toddler, whether you admit it or not.`,

      `**Value defense:** Every unpatched vulnerability is value at risk. Every ignored dependency update is a future emergency. Maintenance isn't glamorous. It's where value is most easily destroyed by neglect.`,

      `## The thread`,

      `- At alpha, value is dreamed of. **Define it.**
- At beta, value is explored. **Test it.**
- At fledgling, value includes trust. **Earn it.**
- At toddler, value is measurable. **Measure it.**
- At adolescent, value is at scale. **Sustain it.**
- At prime, value is unique. **Protect it.**
- At maintenance, value is complete. **Preserve it.**`,

      `You can ship ten features a day and destroy value with every one. Velocity is not value. Shipping is not progress.`,

      `Know your stage. Do that stage's job. Defend value at every step.`,
    ],
    compliancePrompt: `Audit this project's lifecycle stage and readiness for progression. Every project stage has specific requirements — skipping them creates debt that compounds. Identify the project's current stage and check readiness for the next. Report PASS, FAIL, or N/A with a one-line explanation:

**Stage identification:**
0. Current stage: Based on the evidence below, what stage is this project in? (alpha/beta/fledgling/toddler/adolescent/prime/maintenance)

**Alpha → Beta readiness:**
1. Placeholder elimination: Are all stubs and placeholder implementations replaced with real code?
2. Architecture documentation: Does ARCHITECTURE.md or equivalent exist and reflect the current system?
3. Test harness: Is the test infrastructure in place, even if coverage is incomplete?
4. Feature map: Is there a machine-readable inventory of features and their statuses?

**Beta → Fledgling readiness:**
5. End-to-end functionality: Does every defined feature have a working implementation (not stubs)?
6. API contract stability: Are API contracts defined and stable enough for consumers to build against?
7. Core path coverage: Are happy-path tests passing for all core features?
8. Demoability: Can every feature be demonstrated with recorded evidence?

**Fledgling → Toddler readiness:**
9. Backup and restore: Are backup procedures tested and verified, not just documented?
10. Data migration: Are schema changes handled through non-destructive migrations?
11. Audit logging: Are sensitive operations logged with an audit trail?
12. Input validation: Is input validation hardened beyond happy-path assumptions?

**Toddler → Adolescent readiness:**
13. Performance baselines: Are response times, query counts, and resource usage measured with branch-level baselines?
14. Deployment automation: Are deploys repeatable with rollback capability?
15. Monitoring and alerting: Are health checks, uptime monitoring, and actionable error alerts in place?
16. Load testing: Has the system been tested against realistic traffic patterns?

**Adolescent → Prime readiness:**
17. Service boundaries: Are services decomposed where load demands it (not prematurely)?
18. Distributed observability: Are metrics centralized and logs aggregatable across services?
19. API versioning: Are breaking changes managed through versioned APIs?
20. Capacity planning: Is scaling driven by measured growth data, not speculation?

**Value defense (all stages):**
21. Value definition: Is the project's value proposition written down and current?
22. Value measurement: Are there metrics that track whether the system is delivering its stated value?
23. Regression detection: Do tests, KPIs, and outlier reports catch value-destroying changes?
24. Observability: Can the team see whether velocity is building or destroying value?

For each FAIL, suggest a concrete next step.`,
  },
];
