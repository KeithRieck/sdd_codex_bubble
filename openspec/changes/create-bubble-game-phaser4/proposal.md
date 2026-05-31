## Why

The repository currently has a complete gameplay specification and assets but no runnable game implementation. We need to deliver a browser-playable bubble game now so the documented behavior can be validated and iterated in code.

## What Changes

- Create a no-build Phaser 4 browser game implementation that satisfies `spec-v001.md` behavior end to end.
- Implement deterministic scene startup (`BootScene -> PreloaderScene -> GameScene`) and audio preloading from `assets/audio/`.
- Implement gameplay systems for movement, spawning, collision outcomes, level/death restarts, and game-over reset baselines.
- Support both pointer-down and pointer-drag input for player target updates.
- Implement role-based bubble colors (white player, pastel enemies, saturated red shrink bubbles).
- Implement HUD rendering outside the play field using the specified typography and displayed values.
- Implement PWA artifacts and registration (`manifest`, `service-worker`) with cache-first behavior for declared core assets.
- Standardize asset locations: audio under `assets/audio/`, image files under `assets/images/`.

## Capabilities

### New Capabilities
- `bubble-gameplay`: Core game loop, scene flow, entities, spawning, collisions, progression, and HUD behavior.
- `bubble-game-pwa-shell`: Browser shell, service worker registration, and offline asset caching behavior.

### Modified Capabilities
- None.

## Impact

- Affected code: new browser app files (`index.html`, `src/main.js`, scene modules, game object modules, HUD module, service worker, manifest).
- Affected assets: existing WAV files in `assets/audio/`; new or future images constrained to `assets/images/`.
- Dependencies: Phaser 4 loaded in-browser (no build pipeline introduced).
- Systems: gameplay runtime, collision/spawn logic, UI text rendering, and PWA caching/registration.
