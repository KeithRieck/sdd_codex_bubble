# Project Spec
## Context
This project is a browser-based Phaser 3 game where the player controls a bubble that grows by consuming smaller bubbles and avoids larger or equal bubbles. The game runs as an ES module app with no build step, starts through a scene pipeline (`BootScene` -> `PreloaderScene` -> `GameScene`), and includes PWA support through `manifest.json` and `service-worker.js`.

Repository evidence shows a gameplay loop centered on `GameScene`, shared entity behavior through an abstract `Bubble` class, autonomous enemy movement/spawning, a special `ShrinkBubble` mechanic, and a HUD for score/lives/level. Tests are implemented with Vitest and include unit, integration, and property-style suites.

## Goals
- Preserve the current playable loop: move player bubble, resolve collisions, track score/lives/level, and restart appropriately.
- Preserve progressive difficulty by increasing bubble count across wins/deaths until game over.
- Preserve deterministic scene startup and asset loading flow.
- Preserve existing special bubble behavior (`ShrinkBubble`) and audio feedback.
- Preserve installable/offline-capable PWA behavior consistent with current implementation.
- Keep behavior testable through the existing Vitest test strategy.

## Non-Goals
- Introducing multiplayer, networking, or backend services.
- Adding a build/bundling pipeline.
- Replacing Phaser with another engine.
- Redesigning visuals/audio beyond current mechanics.
- Expanding platform targets beyond modern browser/PWA.

## Actors
- Player: Uses mouse/touch pointer input to direct the player bubble.
- Game Scene Runtime: Executes frame updates, collisions, spawning, and transitions.
- Spawn System: Generates AI and shrink bubbles with distribution, spacing, and velocity constraints.
- Collision System: Detects overlap and returns collision resolution intent.
- HUD: Displays score, lives, level, and game-over messaging.
- Browser/PWA Runtime: Hosts Phaser canvas, registers service worker, and manages cached resources.

## Assumptions & Constraints
- Runtime is modern browser JavaScript with ES modules (`"type": "module"`).
- World dimensions are fixed at 800x600 for game logic and rendering boundaries.
- Player starts at size 30, lives 3, score 0, level 1, and initial bubble count 10.
- Player win threshold is size >= 100.
- Player speed scales inversely with size via `max(50, 300 - size*2)`.
- AI and shrink bubbles move with velocity and bounce off world bounds.
- New spawns target at least 200px center distance from player.
- Spawn mix includes ~10% chance of `ShrinkBubble`; non-shrink sizes are range/distribution-based.
- Scenario restart after win/non-final death includes a 2-second pause and size reset to 30.
- Tech stack is Phaser via CDN plus local ES modules and Vitest-based tests.
- PWA behavior depends on service worker availability and browser support.
- [NEEDS_INPUT:target_fps_or_performance_budget]
- [NEEDS_INPUT:accessibility_requirements]

## Acceptance Criteria
1. WHEN the game initializes THEN the system SHALL instantiate Phaser with an 800x600 play area, include `BootScene`, `PreloaderScene`, and `GameScene` in that order, and use a dark gray outer background color.
2. WHEN `BootScene` runs THEN the system SHALL load the logo asset and SHALL transition to `PreloaderScene`.
3. WHILE `PreloaderScene` is active THEN the system SHALL display the logo, SHALL show loading progress feedback, SHALL preload required audio assets (`pop`, `explosion`, `fanfare`, `shrink`), and THEN SHALL transition to `GameScene` after load completion.
4. WHEN `GameScene` is created THEN the system SHALL render a black game-world background with a white border, SHALL create a player bubble at world center with size 30, SHALL initialize spawn and HUD systems, and SHALL populate bubbles up to the target count.
5. WHEN pointer input occurs (mouse or touch) THEN the system SHALL update the player target position and SHALL move the player toward that target each frame using size-dependent speed.
6. WHILE any bubble updates position THEN the system SHALL constrain bubble positions to the 800x600 world and SHALL apply boundary bounce behavior for autonomous bubbles.
7. WHEN player and AI bubbles collide IF player size is greater THEN the system SHALL remove the AI bubble, SHALL increase score by consumed bubble size, SHALL grow player size using integer square-root growth capped at 100, and SHALL play the pop sound.
8. WHEN player and AI bubbles collide IF player size is less than or equal to AI size THEN the system SHALL decrement lives, SHALL play explosion audio, and THEN SHALL either restart scenario (if lives remain) or trigger game-over flow.
9. WHEN player collides with a shrink bubble THEN the system SHALL set player size to 30, SHALL remove that shrink bubble, and SHALL play the shrink sound.
10. WHEN a scenario restarts after win or non-final death THEN the system SHALL pause gameplay updates for 2 seconds, SHALL increase target bubble count by 2, SHALL clear existing spawned bubbles, SHALL respawn to target count, and SHALL preserve carried state for lives/score/level progression.
11. WHEN player size reaches or exceeds 100 THEN the system SHALL treat this as level completion, SHALL play fanfare, and SHALL advance level progression through scenario restart behavior.
12. WHEN game over occurs (lives <= 0) THEN the system SHALL stop active gameplay updates, SHALL display game-over UI with final score and restart instruction, and SHALL restart to initial baseline state on next pointerdown.
13. WHILE gameplay is running THEN the system SHALL maintain total spawned bubble count at the configured target by spawning replacement bubbles as needed.
14. WHEN spawning a bubble IF current count is below target THEN the system SHALL place the bubble within world bounds, SHALL use velocity magnitude in the configured random range, and SHALL enforce minimum spawn separation from the player.
15. WHEN the application is loaded in a browser supporting service workers THEN the system SHALL attempt to register `/service-worker.js` on window load and SHALL continue functioning if registration fails.
16. WHEN the service worker installs and activates THEN the system SHALL cache declared core assets and SHALL serve cached responses when available before falling back to network.
17. WHERE automated verification is executed THEN the system SHALL support Vitest unit, integration, and property-oriented tests for scenes, entities, systems, HUD, and PWA configuration.

## Risks / Trade-offs
- Current random spawn and movement behavior can produce perceived difficulty spikes even with distribution constraints.
- Service worker pre-cache includes an external CDN asset; offline behavior can vary if cache population fails.
- Full scene restarts simplify state reset but may make future fine-grained transitions harder.
- Collision behavior uses strict size comparison and no invulnerability window, which may feel punishing in dense spawn states.

## Open Questions
- [NEEDS_INPUT:desired_difficulty_curve_tuning]
- [NEEDS_INPUT:target_audio_quality_or_asset_pipeline]
- [NEEDS_INPUT:mobile_ui_scaling_or_responsive_layout]
- [NEEDS_INPUT:explicit_definition_of_level_reset_rules_for_score_and_lives]
- [NEEDS_INPUT:expected_behavior_for_restart_level_baseline_in_design_docs]

## Known Gaps
- Repository history in `README.md` describes iterations where UI should be outside the game world; current implementation draws HUD at top-left within the 800x600 game scene coordinate space, so intent vs implementation may differ.
- `manifest.json` uses icon entries where `sizes`/`type` metadata appears inconsistent with PNG filenames (e.g., `type: image/svg+xml` for `.png`), which may impact strict PWA validation in some environments.
- PWA test expectations in `tests/unit/pwa/pwa-config.test.js` assert `start_url` as `/`, while `manifest.json` currently sets `start_url` to `index.html`.
- Game-over restart baseline currently resets to `bubbleCount: 10, lives: 3, score: 0, level: 1`; prior narrative notes mention a restart at level 0, indicating possible historical mismatch.
