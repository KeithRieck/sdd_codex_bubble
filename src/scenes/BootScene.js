import Phaser from "https://cdn.jsdelivr.net/npm/phaser@4/dist/phaser.esm.js";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("logo", "./assets/images/logo.svg");
  }

  create() {
    this.scene.start("PreloaderScene");
  }
}
