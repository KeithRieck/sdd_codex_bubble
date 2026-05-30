import { Bubble } from "./Bubble.js";

export class ShrinkBubble extends Bubble {
  constructor(scene, config) {
    super(scene, {
      ...config,
      isAutonomous: true,
      color: 0xf5b041,
    });
    this.isShrinkBubble = true;
  }
}
