Hosted at: https://keithrieck.github.io/sdd_codex_bubble/index.html

# Bubble Game

This was an experiment in [Spec Driven Development](https://en.wikipedia.org/wiki/Spec-driven_development) using [OpenAI's Codex](https://chatgpt.com/codex/). 

Previously I'd created this [bubble game](https://github.com/KeithRieck/sdd_kiro_bubble) using Kiro.  Starting with that code, I used my [`code-to-spec`](.codex/skills/code-to-spec/SKILL.md) skill to reverse-engineer the specification file [`spec-v001.md`](spec-v001.md).  Implementation will make use of the [`phaser-game`](.codex/skills/phaser-game/SKILL.md) skill.

## First Iteration.
1. Execute `openspec init`.
2. In Codex, execute: 
    * `$openspec-explore Create a bubble game based on spec-v001.md`
    * `This game should use the Phaser version 4 library and use the $phaser-game conventions.`
    * `Use the sound files under assets/audio .  Put any image files under assets/images .`
    * `Create the spec, proposal, design, and tasks files.  Exit explore mode.`
3. In Codex, execute:
    * `$openspec-apply`
    * `The Phaser library should be imported from a CDN using a script tag within index.html.  It should not be imported via the CDN from any of the Javascript code.  Change the code.  Also, make any necessary corresponding changes to the design or spec files. `
4. In Codex, execute:
    * `The PlayerBubble should always be white.  The EnemyBubbles should have random pastel colors.  The ShrinkBubbles should be saturated red.`
    * `Player input should come from drag events as well as mouse-down events.`
    * `You are incorrectly setting the radius when you should be diameter of all circles and bubbles.`
    * `Sync code changes to all documents.`
5. In Codex, execute:  `$openspec-archive`
