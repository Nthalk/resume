---
title: "CLAUDE.md Is Trauma"
slug: "claude-md-is-trauma"
date: "2026-04-03"
summary: "A 30-line file that eliminates half your agent's retry loops, wrong guesses, and wasted context. Every line traces back to a specific failure."
---

**TL;DR:** A good CLAUDE.md cuts agent churn in half. Two files: `~/CLAUDE.md` for personality, `./CLAUDE.md` for project context. Route to docs, don't embed. Hard rules are gates, not lines. You have ~150 instruction slots. Make each one count.

An ETH Zurich study across 138 repos: human-curated context files improved agent success ~4%. LLM-generated ones made it worse. Every line in a good file traces back to a real failure. Every line is trauma. Here's how to write them well, starting with why most of yours are being ignored.

## 150 slots

~150 instruction slots before compliance degrades. The system prompt eats ~50. Every weak line dilutes every strong line uniformly. A 30-line file outperforms a 200-line one.

CLAUDE.md compliance: ~80%. You'd be fired if you ignored the style guide one in five times, every time. If a rule can be enforced by a process guard (formatting, linting, compilation, tests, consistency checks) it doesn't belong in a context file. It belongs in a gate. Enough gates and you trust a junior with the keys unsupervised. CLAUDE.md is for judgment calls. Everything verifiable belongs in a process, not a paragraph.

Two more things. Models struggle with negation: "Do NOT use X" activates the concept regardless. Instead of "no filler," write "terse, direct responses." And put most-violated rules at the top and bottom of the file. Primacy and recency bias are real. Now, the two files.

## Global vs. project

Claude Code loads `~/CLAUDE.md` (every project) and `./CLAUDE.md` (this repo only). Most people don't know the global one exists. The test: "Would this rule make sense in a different repo?" If yes, global.

**`~/CLAUDE.md`**: your relationship with the model. Write once:

- Terse, direct responses. Every token must carry signal.
- Correctness → Simplicity → Testability → Maintainability → Performance.
- If >3 attempts fail, stop. Fix the tool, not the approach.
- Never edit generated code. Never push unless asked.
- `plan/todo.md` for session-scoped work. `plan/plan.md` for roadmap.

**`./CLAUDE.md`**: the project map. One job: minimize time between "Claude opens this repo" and "correct change." Four things:

- **One-line orientation.** What this project is, in a sentence.
- **Build commands.** The full list. Claude greps otherwise and finds the wrong ones in CI configs.
- **Don't-touch boundaries.** Generated code, template-owned dirs, with regen commands.
- **Routing.** The biggest leverage point.

## Route, don't embed

Claude doesn't read your whole project before acting. A convention in a sibling file three directories away doesn't exist if Claude never opens it. Don't put knowledge in CLAUDE.md. Route to it:

```markdown
@docs/architecture.md
- docs/api.md -- read when adding or modifying endpoints
- docs/development.md -- read for DB migrations, testing, dev workflow
```

`@import` loads always-relevant docs automatically, up to 5 levels deep. The list routes to conditional docs with trigger descriptions. No tables; they waste tokens on a reader that doesn't need visual alignment. Size scales with surface area: 13 lines for a simple frontend, 50 with routing for a platform. But how do you know what to route to?

## Detect what's missing

Session history is structured data. Patterns tell you exactly what to add:

- **Retry loops** → add to routing.
- **Grepping for build commands** → add them.
- **Editing generated files, then reverting** → add a don't-touch boundary.
- **Scope drift** → missing architectural boundaries.

Ask Claude to review its own session: "Flag repeated searches, retries, or dead ends. Suggest CLAUDE.md improvements." The model that struggled with missing context knows what was missing.

The project generates friction. Friction reveals gaps. Gaps become lines. Lines reduce friction. The best context file is the one you wish you'd had yesterday.

<!-- compliance-prompt
Audit this project's context file strategy. PASS, FAIL, or N/A for each:

## Instruction budget
1. Is the project context file under 100 lines? Under 50?
2. Is every instruction traceable to a real failure, not proactive style-guiding?
3. Are instructions positively framed ("terse responses" not "no filler")?
4. Are most-violated rules at the top and bottom of the file?

## File split
5. Does a global context file exist with cross-project personality/workflow rules?
6. Does a project context file exist with repo-specific orientation?
7. Are global rules absent from the project file? No duplication?

## Project file content
8. Does it open with a one-line project description?
9. Are build, test, lint, and deploy commands listed explicitly?
10. Are generated files and template-owned directories marked off-limits with regen commands?

## Routing
11. Does the context file route to external docs with trigger descriptions, not embed them?
12. Are always-relevant docs loaded via @import? Conditional docs in a routing list?

## Process gates
13. Are hard rules (formatting, linting, compilation, tests, consistency) enforced by process guards, not context file lines?
14. Is there a clear separation between judgment calls (context file) and verifiable rules (gates)?

## Planning
15. Do plan/todo.md and plan/plan.md exist for session-scoped and roadmap work?

For each FAIL, suggest one concrete next step.
-->
