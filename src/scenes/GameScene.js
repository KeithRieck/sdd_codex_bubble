import Phaser from "https://cdn.jsdelivr.net/npm/phaser@4/dist/phaser.esm.js";
import { PlayerBubble } from "../game/PlayerBubble.js";
import { EnemyBubble } from "../game/EnemyBubble.js";
import { ShrinkBubble } from "../game/ShrinkBubble.js";
import { HUD } from "../ui/HUD.js";

const WORLD = {
  x: 120,
  y: 0,
  width: 800,
  height: 600,
};

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.drawWorld();
    this.resetGameState();
    this.bindInput();
  }

  resetGameState() {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.targetBubbleCount = 10;
    this.isGameOver = false;
    this.isTransitioning = false;

    this.player?.destroy();
    this.bubbles?.forEach((bubble) => bubble.destroy());
    this.bubbles = [];

    this.player = new PlayerBubble(this, {
      x: WORLD.x + WORLD.width / 2,
      y: WORLD.y + WORLD.height / 2,
      size: 30,
    });

    this.player.setTarget(this.player.x, this.player.y);
    this.hud = this.hud ?? new HUD(this);
    this.gameOverText?.destroy();
    this.gameOverText = null;
    this.fillToTargetCount();
    this.updateHud();
  }

  bindInput() {
    this.input.on("pointerdown", (pointer) => {
      if (this.isGameOver) {
        this.resetGameState();
        return;
      }
      const targetX = Phaser.Math.Clamp(pointer.x, WORLD.x, WORLD.x + WORLD.width);
      const targetY = Phaser.Math.Clamp(pointer.y, WORLD.y, WORLD.y + WORLD.height);
      this.player.setTarget(targetX, targetY);
    });
  }

  drawWorld() {
    const g = this.add.graphics();
    g.fillStyle(0x000000, 1);
    g.fillRect(WORLD.x, WORLD.y, WORLD.width, WORLD.height);
    g.lineStyle(2, 0xffffff, 1);
    g.strokeRect(WORLD.x, WORLD.y, WORLD.width, WORLD.height);
  }

  update(_time, delta) {
    if (this.isGameOver || this.isTransitioning) {
      return;
    }

    const dt = delta / 1000;
    this.player.update(dt);
    this.keepInsidePlayerWorld();

    for (const bubble of this.bubbles) {
      bubble.update(dt);
      bubble.constrainToWorld({
        minX: WORLD.x,
        maxX: WORLD.x + WORLD.width,
        minY: WORLD.y,
        maxY: WORLD.y + WORLD.height,
      });
    }

    this.handleCollisions();
    this.fillToTargetCount();
    this.updateHud();
  }

  keepInsidePlayerWorld() {
    const minX = WORLD.x + this.player.size;
    const maxX = WORLD.x + WORLD.width - this.player.size;
    const minY = WORLD.y + this.player.size;
    const maxY = WORLD.y + WORLD.height - this.player.size;
    this.player.setPosition(
      Phaser.Math.Clamp(this.player.x, minX, maxX),
      Phaser.Math.Clamp(this.player.y, minY, maxY),
    );
  }

  handleCollisions() {
    for (let i = this.bubbles.length - 1; i >= 0; i -= 1) {
      const bubble = this.bubbles[i];
      if (!this.player.overlaps(bubble)) {
        continue;
      }

      if (bubble.isShrinkBubble) {
        this.player.setSize(30);
        this.sound.play("shrink");
        this.removeBubbleAt(i);
        continue;
      }

      if (this.player.size > bubble.size) {
        this.score += Math.floor(bubble.size);
        const growth = Math.floor(Math.sqrt(bubble.size));
        this.player.setSize(Math.min(100, this.player.size + growth));
        this.sound.play("pop");
        this.removeBubbleAt(i);
        if (this.player.size >= 100) {
          this.sound.play("fanfare");
          this.beginScenarioTransition();
          return;
        }
      } else {
        this.lives -= 1;
        this.sound.play("explosion");
        if (this.lives <= 0) {
          this.triggerGameOver();
          return;
        }
        this.beginScenarioTransition();
        return;
      }
    }
  }

  removeBubbleAt(index) {
    const bubble = this.bubbles[index];
    bubble.destroy();
    this.bubbles.splice(index, 1);
  }

  beginScenarioTransition() {
    this.isTransitioning = true;
    this.level += 1;
    this.time.delayedCall(2000, () => {
      this.player.setSize(30);
      this.player.setPosition(
        WORLD.x + WORLD.width / 2,
        WORLD.y + WORLD.height / 2,
      );
      this.player.setTarget(this.player.x, this.player.y);
      this.targetBubbleCount += 2;
      this.clearBubbles();
      this.fillToTargetCount();
      this.isTransitioning = false;
      this.updateHud();
    });
  }

  clearBubbles() {
    this.bubbles.forEach((bubble) => bubble.destroy());
    this.bubbles.length = 0;
  }

  triggerGameOver() {
    this.isGameOver = true;
    this.clearBubbles();
    this.gameOverText?.destroy();
    this.gameOverText = this.add.text(520, 300, `Game Over\nScore: ${this.score}\nTap to restart`, {
      fontFamily: "sans-serif",
      fontSize: "28px",
      color: "#ffffff",
      align: "center",
    });
    this.gameOverText.setOrigin(0.5);
    this.updateHud();
  }

  fillToTargetCount() {
    while (this.bubbles.length < this.targetBubbleCount) {
      this.bubbles.push(this.spawnBubble());
    }
  }

  spawnBubble() {
    let x = 0;
    let y = 0;
    let tries = 0;
    do {
      x = Phaser.Math.Between(WORLD.x + 20, WORLD.x + WORLD.width - 20);
      y = Phaser.Math.Between(WORLD.y + 20, WORLD.y + WORLD.height - 20);
      tries += 1;
    } while (
      tries < 100 &&
      Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) < 200
    );

    const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    const speed = Phaser.Math.FloatBetween(50, 150);
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    if (Math.random() < 0.1) {
      return new ShrinkBubble(this, {
        x,
        y,
        size: Phaser.Math.Between(12, 18),
        vx,
        vy,
      });
    }

    const size = Phaser.Math.Between(10, 60);
    return new EnemyBubble(this, { x, y, size, vx, vy });
  }

  updateHud() {
    this.hud.update({
      score: this.score,
      lives: this.lives,
      level: this.level,
    });
  }
}
