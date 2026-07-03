# HANDOFF — NSW Early Childhood Career Hub
Updated: 4 July 2026. Purpose: resume point after clearing context / stepping away.

## State: COMPLETE and verified
The app is built and working. No agent is running; nothing is blocked on Claude.

## ⚠️ Duplicate from an earlier session
A previous session (3 July) left a **partial** build in `app\` and notes in `research\`. Today's session (4 July) is a complete, verified rebuild:
- **Canonical app: `site\`** (finished, link-audited, tested).
- `app\` and `research\` are superseded. Suggest deleting them after a quick look — not deleted automatically because they weren't created this session.

## Deployment (4 July 2026)
- Live site: https://adilmod.github.io/nsw-early-childhood-career-hub/
- Repo (public): https://github.com/adilmod/nsw-early-childhood-career-hub — `main` holds the whole project; `gh-pages` is a subtree of `site/` and is what Pages serves.
- To publish site changes: commit to `main`, then `git subtree split --prefix site -b gh-pages --rebuild` … simpler: `git push origin ``$(git subtree split --prefix site main)``:gh-pages --force`.
- Note: repo is public (required for Pages on a free plan) and the home page describes the candidate's personal situation — ask Claude to de-personalise or make the repo private (needs GitHub Pro for Pages) if that's a concern.

## What exists (canonical)
- `site/` — 7-page static wiki app (works offline, no dependencies).
  - Open `site/index.html` in a browser, or use the preview server (`.claude/launch.json`, config `career-hub`: `python -m http.server 8641 --directory site`).
  - Pages: index (personal roadmap), pathways, courses (comparison table), jobs (path-to-job ladder + job boards), interview (20 interactive flashcards grounded in EYLF v2.0 / NQS / APST), resources (all 54 links).
- `content/research-content.md` — verified research source of truth. Edit this first, then update site pages to match.
- `IMPLEMENTATION.md` — design decision, feature classification (Opus vs Fable), verification checklist.

## Build provenance
- Research + roadmap + all facts/URLs: Fable (this session), web-sourced 4 July 2026.
- Site construction: Opus subagent, restricted to layout only (no invented facts). Its link audit: 54/54 URLs match the content file, zero invented links. It found and fixed one JS filter bug (HTML-entity category matching).
- Fable verification: all 6 pages HTTP 200, zero console errors/warnings, interview module tested live (Scenarios filter → 8 cards, reveal-answer works, counter 1/20).

## HUMAN ACTIONS NEEDED (for the user)
1. **`[TO VERIFY]` placeholders in `site/courses.html`** — content file had no per-provider figures for: Mode (Macquarie MTeach, both WSU MTeach rows, RMIT Grad Dip) and Cost (every university row except RMIT). Check provider pages (linked in the table) and fill in, or ask Claude to research and patch.
2. **Scholarship deadlines** — 2026 NSW ECEC Scholarship Program intakes have enrolment-window cutoffs; check current dates before enrolling: https://education.nsw.gov.au/early-childhood-education/initiatives/early-childhood-careers/available-supports
3. **Personal decisions**: Grad Dip ECE vs Master of Teaching (Birth–5); confirm the Pakistani Master's meets provider entry + English-language requirements (overseas degrees often need IELTS-equivalent evidence).
4. **First real-world step**: apply for the Working With Children Check (link on index page).
5. **Decide** whether to delete the superseded `app\` and `research\` folders.

## If resuming with Claude, likely next tasks
- Fill the `[TO VERIFY]` fees/modes from provider websites (Fable researches, Opus patches HTML).
- Add an application-deadline tracker or course-comparison picker.
- Draft a resume/cover letter for Cert III casual educator roles (leverage overseas teaching + parenting decade).
