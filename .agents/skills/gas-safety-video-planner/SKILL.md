---
name: gas-safety-video-planner
description: Turn verified gas-safety guidance and contest research into feasible one-minute concepts, scripts, storyboards, and shot lists for a solo Google Flow production.
---

# Gas Safety Video Planner

## Preflight gate

Read these exact inputs before generating concepts:

- `knowledge/contest/official-rules.md`
- `knowledge/contest/judging-rubric.md`
- `knowledge/production/project-constraints.md`
- `knowledge/winners/winning-patterns.md`
- `knowledge/gas-safety/verified-safety-rules.md`
- `knowledge/production/flow-models-and-credits.md` when estimating production cost

The selected topic must contain at least one usable `verified` safety action with a direct official URL, check date, application context, exceptions, and allowed and forbidden depictions. Select exactly one of those actions for the film. If none qualifies, return `NO-GO: safety evidence missing`, identify the missing fields, and route to the safety reviewer. Do not invent concepts, generic prevention advice, or medical advice while this gate is closed.

If winning-pattern evidence is missing, do not claim a pattern predicts winning. Mark the research gap and route to the award researcher.

## Concept gate

Each concept must specify one audience, one safe action, one emotional turn, one memorable phrase, and one reason AI video improves the story. Reject concepts that need explanation outside the film or exceed the time and credit budget.

Generate five materially different concepts internally unless the user explicitly requests a different number. Respect the requested number in the visible output; if fewer than two are requested, note that a main/fallback comparison is unavailable. Score concepts with the official rubric and add production difficulty, credit estimate, safety risk, continuity risk, and reuse potential. Label all scores as internal estimates, provide an evidence-strength rating, and never present the internal threshold as an official cutoff.

Use the current Flow cost table and remaining credit balance for numeric estimates. If the balance is unknown, mark affordability as `TBD` and request it instead of claiming the plan fits.

## Write the film after approval

For a concept-only request, stop after the concept comparison. Write a script, storyboard, or shot list only after a concept is approved or the user explicitly requests those artifacts.

Use a 60-second timeline. Target a 55–58 second story including the transition into the end card, then use the remaining 2–5 seconds for a readable end card:

- 0–3s: hook
- 3–15s: ordinary world and risk signal
- 15–35s: conflict or wrong assumption
- 35–48s: verified safe action changes the outcome
- 48–55s: emotional payoff
- 55–60s: memorable safety line and KGS-compatible end card

Prefer visible actions over explanation. Keep important generated dialogue replaceable in editing.

## Handoff by stage

For concept stage, deliver a logline, audience, verified safety statement and source, the five required gate fields for each visible concept, rubric estimate with confidence, credit estimate or `TBD`, and fallback simplification. After approval, add the two-column audio/visual script, scene cards, shot list, and continuity bible.
