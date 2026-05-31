import { Bubble } from "./Bubble.js";

export class PlayerBubble extends Bubble {
  constructor(scene, config) {
    super(scene, {
      ...config,
      isAutonomous: false,
      color: 0xffffff,
    });
    this.targetX = this.x;
    this.targetY = this.y;
  }

  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  getMoveSpeed() {
    return Math.max(50, 300 - this.size * 2);
  }

  update(deltaSeconds) {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 1) {
      return;
    }

    const speed = this.getMoveSpeed();
    const maxStep = speed * deltaSeconds;
    const step = Math.min(maxStep, distance);
    const nx = this.x + (dx / distance) * step;
    const ny = this.y + (dy / distance) * step;
    this.setPosition(nx, ny);
  }
}
