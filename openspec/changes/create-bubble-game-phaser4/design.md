## Context

This project targets a static-site browser runtime and currently contains `spec-v001.md` and game audio assets but no executable Phaser code. The requested implementation must use Phaser 4, follow repository `phaser-game` conventions (no build step, ES modules, simple scene/object structure), and preserve installable/offline-capable PWA behavior. Gameplay is defined around a fixed 800x600 world, pointer-directed player motion, autonomous bubbles, and level/death restart progression with carried state.

## Goals / Non-Goals

**Goals:**
- Implement the full spec-defined bubble game loop with Phaser 4 APIs.
- Keep architecture modular and readable with scene-based flow and reusable bubble entity classes.
- Preserve static hosting and PWA/offline behavior without introducing tooling complexity.
- Enforce asset-path conventions (`assets/audio/`, `assets/images/`).

**Non-Goals:**
- Multiplayer, backend services, analytics, or persistence.
- Build tooling, bundlers, framework migrations, or engine replacement.
- Visual/audio redesign beyond behavior required by the specification.

## Decisions

1. Phaser 4 loaded by CDN script tag in `index.html`, with local game code in ES modules using the global `Phaser` object.
- Rationale: satisfies requested engine/version and repository constraints while keeping Phaser loading centralized and avoiding CDN imports inside application JavaScript modules.
- Alternative considered: Phaser 3 compatibility layer; rejected because requirement is explicitly Phaser 4.

2. Three-scene pipeline: `BootScene -> PreloaderScene -> GameScene`.
- Rationale: deterministic startup/loading path that maps directly to acceptance criteria.
- Alternative considered: single-scene preload+play; rejected due to weaker separation and reduced traceability.

3. OO entity model with shared `Bubble` base and concrete player/enemy/shrink variants.
- Rationale: aligns with repository conventions for reusable moving entities and keeps GameScene orchestration focused.
- Alternative considered: all behavior inside GameScene; rejected due to reduced maintainability.

4. Explicit gameplay controllers inside GameScene for spawn maintenance, collision resolution, and level-state transitions.
- Rationale: centralizes round lifecycle while preserving small helper modules for entities/HUD.
- Alternative considered: over-abstracted manager classes; rejected to avoid unnecessary complexity.

5. Pointer target updates on both pointer-down and pointer-drag while pressed.
- Rationale: improves control responsiveness on mouse and touch input while retaining straightforward input rules.
- Alternative considered: pointer-down only targeting; rejected due to less fluid control.

6. Role-based color strategy in entity subclasses (player white, enemy randomized pastel, shrink saturated red).
- Rationale: preserves OO separation and keeps visual semantics attached to bubble type.
- Alternative considered: central color assignment in scene; rejected to keep type behavior encapsulated.

7. Relative-path-first PWA setup (`service-worker.js`, manifest) and cache-first core asset retrieval.
- Rationale: improves compatibility with static hosting and repository subpaths while maintaining offline functionality.
- Alternative considered: network-first strategy; rejected because spec requires serving cached responses when available.

## Risks / Trade-offs

- [Phaser 4 API variance from prior assumptions] -> Mitigation: verify all scene/input/audio APIs against Phaser 4 docs during implementation.
- [Random spawn distribution can create abrupt difficulty spikes] -> Mitigation: enforce size distribution and minimum spawn distance constraints from spec.
- [Service worker pathing can fail on subpath hosting] -> Mitigation: register via relative-safe approach and keep cache list tightly scoped to shipped assets.
- [Dense collision frames may feel punishing] -> Mitigation: implement exactly as spec first, then tune only in future scoped changes.

## Migration Plan

- No data migration required.
- Introduce game as static browser files and verify local run + hosted run behavior.
- Rollback strategy: revert the change set; no persistent state or external systems are affected.

## Open Questions

- None at this stage; gameplay, asset layout, and engine constraints are explicitly defined by spec and user directives.
