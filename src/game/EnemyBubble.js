import { Bubble } from "./Bubble.js";

export class EnemyBubble extends Bubble {
  constructor(scene, config) {
    super(scene, {
      ...config,
      isAutonomous: true,
      color: 0x5dade2,
    });
  }
}
