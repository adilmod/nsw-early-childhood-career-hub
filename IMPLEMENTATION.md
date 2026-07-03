# NSW Early Childhood Career App — Implementation Plan

## Decision (brainstorm outcome)
A **static, wiki-style multi-page web app** (plain HTML/CSS/JS, no build tools) in this folder.
Why: zero setup for the user (open `index.html` or run a tiny local server), easy to edit like a wiki,
works offline, and all "features" are pages + one interactive module. A framework (React/Next) adds
nothing here and complicates resuming later.

## Features (in implementation order)

| # | Feature | Description | Owner | Rationale |
|---|---------|-------------|-------|-----------|
| 1 | Research content (`content/research-content.md`) | Verified pathway/course/fee/job/interview facts + links | **Fable only** | Accuracy judgment on regulatory info (ACECQA/NESA) — errors here mislead a career decision |
| 2 | Site scaffold + shared styles/nav | `index.html`, shared CSS, nav across 7 pages | **Opus alone** | Pure frontend build from a fixed spec; fully self-evaluable |
| 3 | Wiki pages: Pathways, Courses, Employment, Jobs, Resources | Render content file #1 into structured pages with link lists and comparison tables | **Opus alone** (content supplied verbatim by Fable) | Opus must not invent facts — only lay out supplied content |
| 4 | Interview Prep interactive module | Flashcard/quiz of scenario + standards-based questions (EYLF v2.0, NQS, APST) with model-answer reveal and self-rating | **Opus alone** (questions supplied by Fable) | Self-contained JS widget |
| 5 | Personal roadmap on index | Step-by-step recommended plan for this candidate profile | **Fable supervision** | Requires weighing the candidate's profile against pathway trade-offs |
| 6 | Verification pass | Checklist below | **Fable** | Cross-checking facts vs sources + live preview |

## Verification steps
1. Every page loads with no console errors (preview server + `preview_console_logs`).
2. Nav works between all pages; no dead internal links.
3. Every external link in the site appears in `content/research-content.md` (no invented URLs).
4. Interview module: card flip, next/prev, category filter all function.
5. Facts spot-check: fees/durations marked "indicative — verify with provider" where sourced loosely.

## How to run
Open `site/index.html` directly in a browser, or `cd site && python -m http.server 8080`.
