---
title: "Alpha to Maintenance: Knowing Where Your Project Actually Is"
slug: "project-lifecycle-stages"
date: "2026-04-02"
summary: "Seven stages, each with a specific job. Skip one and the debt forces you back. Value defense is the thread through all of them."
---

**TL;DR:** Seven stages: alpha, beta, fledgling, toddler, adolescent, prime, maintenance. Each has a specific job. Skip it and the debt forces you back or kills the project. Value defense (defining what matters and proving it's preserved) runs through all of them.

Projects fail because the team is solving the wrong problems for the project's current stage. Optimizing deployment during alpha is wasted effort. Ignoring data responsibility during fledgling is a time bomb.

## Alpha: exploring value

Mostly placeholders. Architecture being discovered, not refined. That's healthy. But alpha isn't just "prove the concept": it's exploring what the value even is and which strategies might deliver it. You're testing hypotheses about the product as much as the code.

**Do now:**
- Skeleton: stubs, interfaces, data models.
- Feature map, even if every feature says "missing."
- Test harness infrastructure, even if few tests exist yet.
- ARCHITECTURE.md. The earlier it exists, the fewer wrong turns agents take.
- Articulate competing value hypotheses. What problem might this solve? For whom? Which approach wins?

**Don't:** Optimize. Scale. Polish UI. Commit to one strategy before you've tested alternatives.

**Value defense:** Define what "done" could mean, plural. If you can't articulate the value proposition now, velocity will carry you away from it. Not code debt. Value debt.

## Beta: value demonstrated

Everything works end-to-end but isn't hardened. Direction solidifies as much as it's discovered. You can see what the product actually is, caveats and holes included. The planning stack shifts from exploration to refinement.

**Do now:**
- Replace every stub with a working implementation.
- Happy-path test coverage on all core features.
- Stabilize API contracts.
- Demo everything. If you can't demo it, it's alpha with fewer TODOs.

**Don't:** Ship to real users with real data. The system works but hasn't proven it's responsible with what it's given.

**Value defense:** The system exists end-to-end. Does it deliver what you intended, or did the real value turn out to be a side effect? Reconcile. Don't let momentum carry you past this checkpoint.

## Fledgling: data responsibility

The question shifts from "does it work?" to "can it be trusted?"

**Do now:**
- Backup and restore: tested, not documented.
- Non-destructive schema migrations.
- Audit logging for sensitive operations.
- Harden input validation. Edge cases are real bugs now.

**Don't:** Invite users before backups work. "We'll add backups later" is the fledgling-stage equivalent of deleting tests.

**Value defense:** Users give you their data. Lose it and the value is negative. Every backup test, every migration dry-run is defending the value you promised.

## Toddler: stability and observability

Real users, real data, real consequences. "It works on my machine" dies here.

**Do now:**
- Performance baselines: measured, not guessed.
- Repeatable, rollback-capable deploys.
- Health checks and uptime monitoring.
- Actionable error alerts, not dashboards nobody watches.
- Load testing against realistic traffic.

**Don't:** Add features at the expense of stability. Make what exists reliable, not bigger.

**Value defense:** A feature that works but takes 8 seconds is a feature that drives users away. Performance regressions destroy value silently. Every KPI threshold is a line drawn around the value you've built.

## Adolescent: distribution and scale

Single-server architecture hits its limits. The system grows from one process to a coordinated set of services.

**Do now:**
- Decompose where load demands it, not everywhere.
- Centralized logging. You can't debug distributed systems by SSH-ing into one box.
- API versioning. Downstream consumers can't absorb breaking changes at your pace.
- Capacity planning from growth data, not guesses.

**Don't:** Distribute prematurely. If one server handles your load, the complexity of distribution is pure cost. Adolescent is a stage you enter because the toddler outgrew its environment, not because microservices are fashionable.

**Value defense:** A system that can't handle its own success destroys the value it created. Over-engineering for scale you don't have yet also destroys value. Scale to measured need.

## Prime: unsolved problems

Fundamentals are solid. What's left are the hard problems unique to your domain that nobody else has solved. Very few projects get here.

**Do now:**
- Identify pain points no existing tool addresses.
- Build custom solutions from data and experience accumulated through prior stages.
- Open source the reusable parts.

**Why so few projects reach this:** Most get stuck in perpetual toddler or adolescent, forever chasing stability or scale. The projects that reach prime did the boring work at every prior stage. They earned interesting work by building a foundation that doesn't demand constant attention.

**Value defense:** The custom solution is the value. One architectural regression can collapse months of domain-specific engineering. Document why it exists and what it solves that alternatives don't.

## Maintenance: preservation

Feature-complete. Development shifts from building to preserving.

**Do now:**
- Automated dependency updates.
- Security vulnerability scanning.
- Triage: bugs that threaten value vs. cosmetic.
- Keep the test suite green. Maintenance-mode test rot is how systems become unmaintainable.

**Don't:** Add features without re-entering an earlier stage. Maintenance is stable because scope is fixed. New features mean you're back in toddler, whether you admit it or not.

**Value defense:** Every unpatched vulnerability is value at risk. Every ignored dependency update is a future emergency. Maintenance isn't glamorous. It's where value is most easily destroyed by neglect.

## The thread

- At alpha, value is dreamed of. **Define it.**
- At beta, value is explored. **Test it.**
- At fledgling, value includes trust. **Earn it.**
- At toddler, value is measurable. **Measure it.**
- At adolescent, value is at scale. **Sustain it.**
- At prime, value is unique. **Protect it.**
- At maintenance, value is complete. **Preserve it.**

You can ship ten features a day and destroy value with every one. Velocity is not value. Shipping is not progress.

Know your stage. Do that stage's job. Defend value at every step.

<!-- compliance-prompt
Audit this project's lifecycle stage and readiness for progression. Every project stage has specific requirements. Skipping them creates debt that compounds. Identify the project's current stage and check readiness for the next. Report PASS, FAIL, or N/A with a one-line explanation:

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

For each FAIL, suggest a concrete next step.
-->
