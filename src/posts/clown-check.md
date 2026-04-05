---
title: "Clown Check: Separating Dev from Reviewer"
slug: "clown-check"
date: "2026-03-24"
summary: "A pre-commit hook that catches the shortcuts the coding session won't admit to."
---

**TL;DR:** A pre-commit hook runs a fresh Claude session (separate from the dev session) to catch deleted tests, disabled validation, and other regressions the coding agent won't flag on itself.

An LLM that writes code and reviews its own code has already decided the approach is correct. The same session that deleted a test will rationalize the deletion. "Fundamentally broken." "Testing implementation details." "Redundant."

Sometimes true. Often it's the path of least resistance: deleting the test is easier than fixing the code the test caught.

Humans do this too. That's why code review exists. The agent that writes the code should not be the agent that reviews it. A fresh session sees: "this commit deletes three tests and adds none." That's a fact, not a judgment call. It doesn't need to understand why the tests existed, just that coverage went down and the commit doesn't explain why.

## bin/clown-check

Pre-commit hook. Before a commit lands, a fresh Claude session with no shared context reviews the staged diff.

Two commit types, two review modes:

**Scaffolding commits:** TODOs and stubs are expected. The reviewer checks that scaffolding doesn't pretend to be finished.

**Implementation commits:** TODOs mean incomplete work. The reviewer checks that the implementation actually implements what it claims.

## What it catches

- **Deleted tests.** Test fails, agent deletes it. The agent's reasoning: "problematic." The reviewer's job: prove it.
- **Disabled validation.** Commenting out checks, adding `@Suppress`, weakening type constraints.
- **Empty catch blocks.** Swallowing errors to make tests pass.
- **Unexplained lint suppressions.** `eslint-disable` without justification.
- **Test weakening.** Loosening assertions, removing edge cases, converting specific checks to `assertNotNull`.

Output is binary: `PASS` or `FAIL: [reason]`.

## The deleted-test pattern

The most insidious failure mode. An agent hits a failing test. Correct response: fix the code or update the test. Lazy response: delete it, claim it was broken.

Both look identical in the session's own reasoning. The agent genuinely believes the test was bad. It has no context for why the test was written. It only sees that removing the test makes everything green.

Clown-check flags any commit that reduces test count without justification or replacement tests. You can still delete tests. You just have to convince a reviewer that isn't already on your side.

## Cost

Ten seconds per commit. Without it, a single afternoon of agent-driven development quietly deletes a dozen tests, each one "justified" by the session that deleted it. By the time you notice, the coverage holes have been built on top of.

With it, regressions are caught at the boundary. Not downstream. Not next week.

## Setup

Run `claude` against the staged diff with a static prompt. `PASS` or `FAIL: [reason]`. Git pre-commit hook. No CI delay.

The reviewer prompt is static. No shared history. No rationalization.

<!-- compliance-prompt
Audit this project for dev/reviewer separation. LLMs that write code and review their own code have a blind spot: they rationalize their own shortcuts. Quality requires a separate review session that examines diffs without the authoring context. Check each item and report PASS, FAIL, or N/A with a one-line explanation:

1. Separate review session: Is there a pre-commit or pre-merge hook that reviews diffs using a fresh LLM session (not the one that wrote the code)?
2. Deleted test detection: Does the review process flag commits that reduce test count without justification?
3. Disabled validation detection: Does the review catch commented-out checks, @Suppress additions, or weakened type constraints?
4. Empty catch block detection: Does the review flag swallowed exceptions?
5. Lint suppression audit: Are eslint-disable / @SuppressWarnings flagged when they lack explanatory comments?
6. Test weakening detection: Does the review catch loosened assertions, removed edge cases, or downgraded checks?
7. Scaffolding vs implementation distinction: Does the review process distinguish between scaffolding commits (TODOs expected) and implementation commits (TODOs = incomplete)?
8. Binary output: Does the review produce a clear PASS/FAIL result, not a nuanced suggestion?
9. Prompt isolation: Is the reviewer prompt static and context-free (no shared conversation history with the coding session)?
10. Overhead budget: Does the review hook complete in under 30 seconds, keeping it viable in fast iteration loops?
11. Commit message justification: When tests are deleted or coverage decreases, does the process require an explanation in the commit message?

For each FAIL, suggest a concrete next step.
-->
