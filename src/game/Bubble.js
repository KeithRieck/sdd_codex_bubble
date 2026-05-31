export class Bubble {
  constructor(scene, config) {
    this.scene = scene;
    this.x = config.x;
    this.y = config.y;
    this.size = config.size;
    this.color = config.color ?? 0x66ccff;
    this.isAutonomous = config.isAutonomous ?? true;
    this.vx = config.vx ?? 0;
    this.vy = config.vy ?? 0;

    this.sprite = scene.add.circle(this.x, this.y, this.radius, this.color, 1);
    this.sprite.setStrokeStyle(2, 0xffffff, 0.85);
  }

  get radius() {
    return this.size / 2;
  }

  setSize(newSize) {
    this.size = newSize;
    this.sprite.setRadius(this.radius);
  }

  setVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.sprite.setPosition(x, y);
  }

  update(deltaSeconds) {
    if (!this.isAutonomous) {
      return;
    }

    const nextX = this.x + this.vx * deltaSeconds;
    const nextY = this.y + this.vy * deltaSeconds;
    this.setPosition(nextX, nextY);
  }

  constrainToWorld(bounds) {
    const minX = bounds.minX + this.radius;
    const maxX = bounds.maxX - this.radius;
    const minY = bounds.minY + this.radius;
    const maxY = bounds.maxY - this.radius;

    if (this.x < minX) {
      this.x = minX;
      this.vx = Math.abs(this.vx);
    } else if (this.x > maxX) {
      this.x = maxX;
      this.vx = -Math.abs(this.vx);
    }

    if (this.y < minY) {
      this.y = minY;
      this.vy = Math.abs(this.vy);
    } else if (this.y > maxY) {
      this.y = maxY;
      this.vy = -Math.abs(this.vy);
    }

    this.sprite.setPosition(this.x, this.y);
  }

  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.hypot(dx, dy);
  }

  overlaps(other) {
    return this.distanceTo(other) <= this.radius + other.radius;
  }

  destroy() {
    this.sprite.destroy();
  }
}
