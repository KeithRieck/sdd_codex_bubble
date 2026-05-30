## ADDED Requirements

### Requirement: Phaser 4 Game Initialization and Scene Flow
The system SHALL initialize a Phaser 4 game instance with an 800x600 play area, dark gray outer background, and ordered scene pipeline of BootScene, PreloaderScene, and GameScene.

#### Scenario: Engine and scene startup
- **WHEN** the application is loaded in a compatible browser
- **THEN** the system initializes Phaser 4 with BootScene first and transitions BootScene to PreloaderScene and then GameScene.

### Requirement: Asset Loading and World Setup
The system SHALL load required logo/image assets from `assets/images/` and required audio assets from `assets/audio/`, then initialize a black game world with white border and a player bubble at center with size 30.

#### Scenario: Preload and world creation
- **WHEN** PreloaderScene runs
- **THEN** it displays loading progress, preloads required assets, and starts GameScene after load completion where the world and player are created.

### Requirement: Pointer-Directed Player Movement
The system SHALL update the player movement target on pointer down input and move the player toward that target each frame using speed `max(50, 300 - size*2)`.

#### Scenario: Pointer movement update
- **WHEN** mouse-down or touch pointer down occurs
- **THEN** the player target position is updated and frame updates move the player toward that target using size-dependent speed.

### Requirement: Autonomous Bubble Movement and Bounds
The system SHALL keep autonomous bubbles moving with velocity and SHALL enforce 800x600 boundary bounce behavior for those bubbles.

#### Scenario: Bubble boundary interaction
- **WHEN** autonomous bubbles reach world boundaries
- **THEN** their motion is constrained to the world and reflected to produce bounce behavior.

### Requirement: Collision Outcomes and Audio Feedback
The system SHALL resolve collisions as follows: player larger than AI consumes AI, score increases by consumed size, player grows by integer square-root growth capped at 100, and pop audio plays; player less than or equal to AI loses one life and explosion audio plays; collision with shrink bubble resets player size to 30 and plays shrink audio.

#### Scenario: Player consumes smaller AI bubble
- **WHEN** player collides with an AI bubble and player size is greater
- **THEN** the AI bubble is removed, score and size are updated per rules, and `pop.wav` is played.

#### Scenario: Player loses collision to equal or larger AI bubble
- **WHEN** player collides with an AI bubble and player size is less than or equal
- **THEN** lives decrement by one, `explosion.wav` plays, and restart or game-over flow is selected based on remaining lives.

#### Scenario: Player collides with shrink bubble
- **WHEN** player collides with a shrink bubble
- **THEN** player size is reset to 30, the shrink bubble is removed, and `shrink.wav` is played.

### Requirement: Spawn Maintenance and Distribution
The system SHALL maintain total spawned bubbles at a target count, spawning replacements when below target, with new spawns at least 200px from player center, randomized speed between 50 and 150 px/s, and 10% spawn chance for ShrinkBubble.

#### Scenario: Replace missing bubbles
- **WHEN** current spawned bubble count falls below target
- **THEN** the system spawns additional bubbles that satisfy distance, velocity, and shrink-probability rules.

### Requirement: Level Progression and Restart Flow
The system SHALL treat player size >= 100 as level completion, play `fanfare.wav`, and restart scenario after a 2-second pause; non-final deaths SHALL also restart after a 2-second pause; each scenario restart SHALL increase target bubble count by 2, clear existing spawned bubbles, respawn to target, preserve score, and increment level.

#### Scenario: Win-triggered progression
- **WHEN** player size reaches or exceeds 100
- **THEN** fanfare plays and scenario restart logic runs with preserved score and incremented level.

#### Scenario: Non-final death progression
- **WHEN** the player loses a life and lives remain
- **THEN** gameplay pauses for 2 seconds and scenario restart logic runs with preserved score and incremented level.

### Requirement: Game Over and Full Reset
The system SHALL stop active gameplay updates when lives are 0 or below, display game-over UI including final score and restart instruction, and reset to baseline state (score 0, level 1, bubble count 10, lives 3, player size 30) on next pointer down.

#### Scenario: Restart after game over
- **WHEN** game-over UI is shown and pointer down occurs
- **THEN** the game resets to initial baseline state and starts a fresh scenario.

### Requirement: HUD Placement and Content
The system SHALL render score, level, and lives in 14pt sans-serif text at the top of the screen outside the play field on the left side.

#### Scenario: HUD rendering
- **WHEN** gameplay UI is rendered
- **THEN** HUD text appears in the specified location and style with current score, level, and lives values.
