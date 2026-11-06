---
name: task-readiness-gate
description: "Audit task PRD, Product WBS alignment, error states, and external links before prototyping to issue a Stage 1 Gate Verdict."
---

# Task Readiness & Ambiguity Gate

Use this skill before building any UI or interactive prototype for a PaDi UMKM task.

## Purpose

Enforce the **Stage 1 Pre-Design Gate** to eliminate specification ambiguities, missing error states, and unaligned scope before code or Figma assets are produced.

## Procedure

1. **Resolve Task & WBS Context:**
   - Run `node scripts/sync-wbs-tasks.mjs init <task-code-or-id>` to scaffold the prototype directory (`src/prototypes/wongsdigun/<task-slug>/`).
   - Inspect `_task-context.json` to verify the joined Product WBS `Goals`, `Solution`, `Sprint Schedule`, and `Drop` status from `data/product-wbs-q4.json`.

2. **Audit Source Documentation:**
   - Check if PRD or RFC is linked in `_task-context.json` (`links.prd`).
   - If PRD link is from Google Docs, use the `gdocs` skill to extract user stories, acceptance criteria, and edge cases.
   - If PRD link is from Telkom Wiki (`wiki.digitaltelkom.id`) or SharePoint, inspect via authenticated browser session.
   - If Figma master is linked, inspect component structure with `figma-console`.

3. **Evaluate Against the Readiness Rubric (`rubrics/readiness-gate.md`):**
   - **Happy Path:** Entry points, primary actions, success outcomes.
   - **Error & Failure States:** Validation failures, network drop, timeout, duplicate actions.
   - **Empty States:** Zero-data and cleared search behavior.
   - **Permissions:** Buyer vs Seller vs Admin capabilities.
   - **Mobile Responsiveness:** Layout reflow below 768px.

4. **Issue Gate Verdict:**
   Update `1-readiness.md` with one of four verdicts:
   - `🟢 PROCEED TO PROTOTYPE`: All criteria pass. Generate `2-locked-brief.md` and proceed to Stage 2 (`figma-to-padi-view`).
   - `🔴 BLOCKED: MISSING ERROR STATES`: Pose 2–4 targeted questions with recommended defaults in chat and wait for confirmation.
   - `🟠 BLOCKED: SCOPE CREEP`: Initiative contains out-of-sprint scope or references dropped WBS codes (e.g. `EPC#2`).
   - `🟡 BLOCKED: UNRESOLVED DEPENDENCY`: Upstream API or third-party blocker requires resolution.

5. **Lock Scope:**
   Once clarified or approved, finalize `2-locked-brief.md` to establish the immutable scope contract.
