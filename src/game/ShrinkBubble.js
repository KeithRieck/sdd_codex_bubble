import { Bubble } from "./Bubble.js";

export class ShrinkBubble extends Bubble {
  constructor(scene, config) {
    super(scene, {
      ...config,
      isAutonomous: true,
      color: 0xff0000,
    });
    this.isShrinkBubble = true;
  }
}
