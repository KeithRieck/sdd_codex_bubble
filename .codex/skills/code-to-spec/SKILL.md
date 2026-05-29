---
name: code-to-spec
description: Generate versioned markdown project specs from the current conversation and the current repository, with acceptance criteria written in strict EARS syntax. Use when the user asks to create project requirements/spec docs grounded in both chat context and codebase state.
---

# Code to Spec

Use this skill to generate a new versioned spec document from both the current conversation and the current repository.

## Scope

- Use the most recent grill-me interview in the current conversation when available.   If no grill-me interview is available, use the current conversation.
- Use repository evidence as first-class input (current code, config, docs, and tests).  Reverse engineer the code to understand the requirements.
- When conversation intent and repository reality conflict, prefer explicit user intent and record the mismatch in `## Known Gaps`.
- Produce a new file each run using versioned naming.

## Output file naming

1. Scan the current working directory for files matching `spec-vNNN.md`.
2. Parse `NNN` as a zero-padded integer.
3. Create the next file in sequence.
4. If none exist, create `spec-v001.md`.
5. Never overwrite previous versions.

## Required document template

The generated file must contain these sections in this order:

```md
# Project Spec
## Context
## Goals
## Non-Goals
## Actors
## Assumptions & Constraints
## Acceptance Criteria
## Risks / Trade-offs
## Open Questions
## Known Gaps
```

## Acceptance Criteria rules

- Use one global ordered list only (`1.`, `2.`, `3.`).
- Every requirement must be phrased in EARS style.
- Normalize wording so EARS keywords are uppercase:
  - `WHEN`
  - `WHILE`
  - `WHERE`
  - `IF`
  - `THEN`
  - `SHALL`
- If a drafted requirement is not valid EARS phrasing, rewrite it into valid EARS form before writing.
- Do not add type labels (no `[Event-driven]`, etc.).

## Repository analysis requirements

- Inspect repository structure and identify relevant modules/files before drafting.
- Extract concrete constraints from existing implementation details (APIs, data models, workflows, test coverage, build/runtime limits).
- Reuse domain language found in the codebase where it improves precision.
- Avoid speculative features not supported by either conversation intent or repository signals; if uncertain, mark as `[NEEDS_INPUT:<topic>]`.

## Missing information handling

- Generate the draft immediately, even with incomplete inputs.
- Do not ask follow-up questions after writing the file.
- Add explicit placeholders for unknowns using `[NEEDS_INPUT:<topic>]`.
- Capture unresolved items and repository-conversation mismatches in `## Known Gaps`.

## Process

1. Synthesize project intent, constraints, and desired outcomes from the conversation.
2. Analyze the repository for current behavior, architecture, and implementation limits relevant to the request.
3. Merge conversation intent with repository evidence into each spec section.
4. Convert acceptance items into strict EARS phrasing with uppercase keywords.
5. Add `[NEEDS_INPUT:<topic>]` where details are missing.
6. Write the next versioned spec file.
7. Stop after generation and report the created filename.
