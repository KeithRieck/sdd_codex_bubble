import { Bubble } from "./Bubble.js";

export class EnemyBubble extends Bubble {
  constructor(scene, config) {
    super(scene, {
      ...config,
      isAutonomous: true,
      color: EnemyBubble.randomPastelColor(),
    });
  }

  static randomPastelColor() {
    const red = 180 + Math.floor(Math.random() * 76);
    const green = 180 + Math.floor(Math.random() * 76);
    const blue = 180 + Math.floor(Math.random() * 76);
    return (red << 16) | (green << 8) | blue;
  }
}
