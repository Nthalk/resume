---
title: "Cost Per Feature"
slug: "cost-per-feature"
date: "2026-04-04"
summary: "LLMs increase cost per feature on most projects. Not because the models are bad, but because the projects aren't built to verify fast enough. Three bottlenecks determine whether LLMs help or hurt."
---

**TL;DR:** LLMs increase cost per feature on most projects. Not because the models are bad, but because the projects aren't built to verify fast enough and completely enough. Fix that and cost per feature drops by an order of magnitude. Ignore it and the LLM is just a faster way to create debt.

You already know what a feature costs. A senior dev for two weeks, a sprint of coordination, a QA cycle, a deployment window. Multiply by headcount. Add the features that slipped because someone was blocked on someone else. That's your cost per feature, and it's almost entirely labor.

LLMs should crater that number. In practice, they often increase it. The senior dev on your team who's skeptical has watched an LLM confidently delete a test, break an integration, or "refactor" something load-bearing. They're not wrong. On their project, LLMs do increase cost per feature. The model writes code fast, but the cleanup, the debugging, the "why did this break something unrelated" takes longer than writing it by hand would have.

This isn't a model problem. It's a project problem. Three bottlenecks determine whether LLMs reduce or increase your cost per feature:

- **Verification completeness.** If your project can't catch a bad change before it compounds, every LLM attempt is a gamble. Weak type coverage, missing integration tests, untyped boundaries between layers: these are gaps where LLM mistakes hide until production.
- **Verification speed.** Even thorough projects fail here. A 90-second build cycle means you can't afford to check multiple attempts. You need the model to get it right the first time, which it often doesn't. Slow verification forces you toward expensive models, erasing the cost advantage.
- **Architectural direction.** The most expensive failure isn't bad code. It's correct code solving the wrong problem, compounding for days before anyone reviews it. No amount of testing catches "this feature shouldn't exist."

Naive projects hit all three. They try LLMs, cost per feature goes up, and they conclude the tools don't work. That's tying your laces together and blaming the shoes when you lose the race.

## The org chart didn't change

Every project that ships reliable software has three roles, whether it admits it or not:

**Project Owner.** Holds the roadmap. Knows what features matter, what order they ship in, and what "done" looks like. Doesn't need to be technical. Needs to be right about value.

**Lead Architect.** Turns business requirements into implementation plans. Knows the architecture, the design patterns, the gotchas, the tricky areas where a naive implementation will bite you in three months. When requirements conflict or baseline assumptions crack, they bounce back to the owner. When the plan is solid, they hand fragments to developers. But their most important job isn't planning new work. It's reviewing what developers produce and defending the value that already exists. A feature that passes every test can still be a regression if it solves the wrong problem, duplicates existing functionality, or subtly undermines an architectural decision that took weeks to get right. This is where you want a frontier model, or a senior human, or both. Cutting costs here is where projects die.

**Developers.** Get an implementation plan (or a fragment of one) and execute. Team size, responsibility boundaries, and dependency chains are decided by the architect. They don't need to understand the whole system. They need to understand their assignment and have fast feedback when they get it wrong.

This structure predates LLMs by decades. What's changing is the cost of each tier.

## Level 1: Verification completeness

Before LLMs touch your codebase, the project needs to catch bad changes automatically. This is table stakes. Without it, every LLM attempt is a coin flip.

- **Linting and pattern bans.** Deprecated APIs, dangerous patterns, import boundary violations, raw SQL outside the query layer, direct DOM manipulation in a React codebase, `any` in TypeScript: encode them as lint rules, not conventions. An LLM doesn't know your conventions. It will reach for the most common pattern it's seen in training data, which is often the pattern you've explicitly banned. A failing lint rule it can read and fix. A convention it will cheerfully ignore.
- **Strict typing across boundaries.** Types from source to screen. Change a database migration, the compiler tells you everything that broke, all the way to the UI. No untyped gaps where mistakes hide. Discriminated unions with exhaustiveness checks: adding a new API response variant is a compile error everywhere it's not handled.
- **Generated contracts between layers.** The API doesn't manually sync with the database models. The TypeScript client doesn't manually sync with the API. Generation eliminates the class of bugs where two layers disagree about a type.
- **Feature-defending tests.** Not just unit tests. Integration tests that verify the feature works end-to-end. Test coverage that proves existing value is preserved, not just that new code runs.
- **Independent review gates.** The agent that writes the code doesn't review it. A [separate session with no shared context](/blog/clown-check) reviews the diff: deleted tests, disabled validation, weakened assertions. Pass or fail with notes, just like a code review. The developer agent gets the notes and tries again.

This is where most projects that "tried LLMs and it didn't work" are stuck. The model produces code, nobody catches the problems, debt compounds. Fix this first. Cost per feature won't improve until bad changes are caught before they land.

## Level 2: Verification speed

Completeness without speed is a trap. I've built thorough verification pipelines in Postgres/JOOQ/Spring/Kotlin/TypeScript for years. Types start at the migration and end at the user's screen. Touch a column, the compiler catches it everywhere. It works.

The problem is the cost.

`gradle assemble`: 45 seconds. TypeScript generation + `tsc --noEmit`: another 30. Playwright tests: minutes. A single validation cycle takes longer than the LLM takes to write the code.

When verification is the bottleneck, you can't afford to check every attempt. You batch changes. You skip integration tests to save time. You need the model to get it right the first time, which pushes you toward expensive models, erasing the cost advantage. The economics don't invert. They just shift.

Verification should be faster than the model that's waiting on it. Every attempt fully checked before the next one arrives.

I tried Go first. Compile times dropped immediately. But Go lacks comptime, so every language boundary (database schema → Go models, Go API → TypeScript client) required a hand-written parser and code generator. Each one is its own maintenance surface, its own bugs, its own drift. The build got faster. The codegen pipeline got more fragile.

Zig's `comptime` solved it. Same language, evaluated at compile time, full access to types as values. The Zest framework demonstrates the pipeline:

**Database → Zig models.** An inspector reads `information_schema`, emits Zig structs where every column carries its SQL type, Zig type, and TypeScript type as comptime metadata.

**Zig models → SQL DSL.** `From(User).where(User.id.eqParam("id")).fetch(.{ User.name, User.email })` builds a type-safe query at comptime. Result type inferred. Parameters typed. SQL injection structurally impossible.

**API → TypeScript.** Define an endpoint:

```zig
pub fn getUser(app: App, params: struct { id: i32 }) !?UserRow {
    return app.fetchOne(Q.GetUserById, .{ params.id });
}
```

The framework infers HTTP method, route, parameters, and error handling from the signature. At compile time, it emits a TypeScript client with matching types:

```typescript
export const getUser = (params: { id: number }): Promise<UserRow> =>
  fetch(`/api/user?${new URLSearchParams(params as any)}`).then(r => r.json());
```

| | Kotlin/Spring/TS | Zig/Zest |
|---|---|---|
| Full compile | ~90s | ~2s |
| Memory (build) | ~2GB | ~80MB |
| Type pipeline | 3 codegen steps + build | 1 compile |
| Integration test cycle | minutes | seconds |

Two-second compile. The LLM is the bottleneck again. Every attempt gets fully verified. Five cheap developer agents running in parallel, each taking a different plan fragment, validation catching mistakes before the next fragment starts.

As the project grows, verification speed becomes a scaling problem. Shard your test suite across hosts. Parallelize integration tests. The bottleneck will try to creep back. Keep pushing it down.

## Level 3: Transparency as review

Completeness catches bad code. Speed lets you check every attempt. But neither catches "this feature shouldn't exist" or "this refactor undermines an assumption three layers away." That's the architect's job, and the architect's attention is the scarcest resource.

Make it cheap for the architect to review by making the work [show itself](/blog/show-your-work-transparency-as-architecture):

- **Test plans for every change.** Not just "tests pass." A plan that states what was tested, what wasn't, and why. The architect reads the plan, not the diff.
- **Demoable artifacts.** Record videos of new features or feature changes using existing specs. The architect sees what changed in 30 seconds instead of reading 400 lines of code. `bin/demo --feature Checkout` produces visual proof.
- **Code references to concerning areas.** When a change touches something load-bearing, the test plan links to the specific functions and lines. The architect knows where to look if something feels wrong.

This is [transparency as architecture](/blog/show-your-work-transparency-as-architecture). The application explains itself. The explanation becomes the review surface. The architect spends their attention on direction and value, not on whether the code compiles.

## Level 4: Architectural direction

Buggy code costs a retry. Wrong problem gets caught in review. The expensive failure is the correct-ish solution that closes doors: a data model that can't support the next feature, an abstraction that forecloses a better approach, a concurrency assumption baked into three layers that turns out to be wrong under load. It passes tests. It ships. Then it constrains every decision that follows.

LLMs are exceptionally good at producing convincingly almost-right solutions. The architect's job is catching them before they become load-bearing. Short leashes:

- **Plan fragments, not plans.** Small, scoped assignments. Review after each fragment, not after a week of work.
- **Value defense.** "Does it work?" is necessary. "Does it close any doors?" is the question that saves you.
- **Encode invariants.** Every constraint the architect would catch in review should be a compilation error, lint rule, or test assertion. Free the architect's attention for what can't be automated: is this the right approach?

## It's the economy, stupid

One frontier model. $0.06 per attempt. 90-second build. One shot.

Five cheap models. $0.002 each. 2-second build. First one that passes wins.

Same outcome. One-sixth the cost. Forty-five times faster.

That's not the gap between models. That's the gap between projects.

The team with complete, fast verification and architectural review uses the cheapest model on the market and ships faster than the team running the best model against a slow build with thin tests. Their cost per feature drops every month as cheaper models appear. The other team's cost is stuck, because their bottleneck was never the model.

Every skeptic who told you LLMs don't work for serious projects was right about their project. The model is a commodity. The verification pipeline is the asset. The architect is the investment. Everything else is a variable cost trending toward zero.

Cost per feature. That's the only number.

<!-- compliance-prompt
Audit this project's readiness for LLM-driven development against four maturity levels. Each level unlocks the next. Report PASS, FAIL, or N/A for each item. Identify which level the project is stuck at.

## Level 1: Verification completeness
Can your project catch a bad change before it compounds?
1. Pattern bans: Are dangerous patterns, deprecated APIs, and import boundary violations encoded as lint rules (not conventions)?
2. Type coverage: Do types flow from data source to UI with no untyped gaps between layers?
3. Generated contracts: Are types between layers (DB → API → client) generated, not manually synced?
4. Feature-defending tests: Are critical features covered by integration tests that verify end-to-end behavior?
5. Independent review: Is there a review gate that operates independently from the session that wrote the code?

## Level 2: Verification speed
Is your verification faster than the LLM?
6. Full compile: Does the project compile in under 10 seconds?
7. Type-check feedback: Can a type error be detected in under 5 seconds from file save?
8. Integration tests: Do integration tests complete in under 30 seconds?
9. Full loop: From code change to complete verification result, is the cycle under 15 seconds?
10. Test sharding: As the project grows, can tests be distributed across hosts to maintain speed?

## Level 3: Transparency as review
Can the architect review efficiently without reading every diff?
11. Test plans: Does every change include a plan stating what was tested, what wasn't, and why?
12. Demoable artifacts: Can new features or changes produce recorded video demos automatically?
13. Code references: Do test plans link to specific functions and lines for areas of concern?
14. Review surface: Can the architect assess a change from its test plan and demo in under 2 minutes?

## Level 4: Architectural direction
Are wrong directions caught before they become load-bearing?
15. Plan fragmentation: Are implementation plans broken into small, independently reviewable fragments?
16. Value defense: Does the review process ask "does this close any doors?" not just "does it work?"
17. Encoded invariants: Are architectural constraints (dependency rules, module boundaries) enforced by tooling, not memory?
18. Review cadence: Are fragments reviewed before the next fragment is assigned, not batched?

## Overall
19. Current level: Which is the highest level where all items pass? That's where your project is.
20. Bottleneck: Which failing item at the next level is the biggest blocker to reducing cost per feature?

For each FAIL, suggest one concrete next step.
-->
