## 1. Project Shell and Runtime Setup

- [x] 1.1 Create browser app entry files (`index.html`, `src/main.js`) and initialize Phaser 4 with 800x600 config and scene order BootScene, PreloaderScene, GameScene.
- [x] 1.2 Add service worker registration on window load with failure-tolerant behavior.
- [x] 1.3 Add `manifest.webmanifest` and `service-worker.js` with cache-first core asset strategy and image references under `assets/images/`.

## 2. Scene Pipeline and Asset Loading

- [x] 2.1 Implement `BootScene` to load logo/image prerequisites from `assets/images/` and transition to `PreloaderScene`.
- [x] 2.2 Implement `PreloaderScene` with loading progress UI and preload required audio (`pop`, `explosion`, `fanfare`, `shrink`) from `assets/audio/`.
- [x] 2.3 Transition from `PreloaderScene` to `GameScene` after successful preload completion.

## 3. Core Gameplay Entities and Movement

- [x] 3.1 Implement reusable bubble base entity with position constraints and autonomous bounce logic for spawned bubbles.
- [x] 3.2 Implement player bubble movement toward pointer-down and pointer-drag target updates with size-based speed `max(50, 300 - size*2)`.
- [x] 3.3 Implement enemy and shrink bubble variants with randomized spawn velocity magnitude between 50 and 150 px/s.
- [x] 3.4 Implement role-based bubble visuals: white player bubble, randomized pastel enemy bubbles, and saturated red shrink bubbles.

## 4. Spawn, Collision, and Round State Systems

- [x] 4.1 Implement spawn controller maintaining target bubble count, 200px minimum spawn distance from player, and 10% shrink spawn probability.
- [x] 4.2 Implement collision outcomes for consume/loss/shrink including score, size growth cap, life decrement, and per-event audio playback.
- [x] 4.3 Implement restart flow with 2-second pause, spawn reset, target bubble count +2, score preservation, and level increment on each new scenario.

## 5. Win/Loss UX and HUD

- [x] 5.1 Implement win detection at player size >= 100 with `fanfare.wav` and transition into scenario restart flow.
- [x] 5.2 Implement game-over state that halts active updates and shows final score plus restart instruction.
- [x] 5.3 Implement full baseline reset on post-game-over pointer down (score 0, level 1, lives 3, player size 30, bubble count 10).
- [x] 5.4 Implement HUD showing score/level/lives in 14pt sans-serif outside the play field on the top-left side.

## 6. Verification and Acceptance

- [x] 6.1 Validate implemented behavior against all `bubble-gameplay` scenarios.
- [x] 6.2 Validate service worker registration and cache-first behavior against `bubble-game-pwa-shell` scenarios.
- [ ] 6.3 Perform manual browser playtest for pointer input, progression loops, audio cues, and restart paths.
