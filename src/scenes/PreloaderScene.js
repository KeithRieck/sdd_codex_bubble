export class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("PreloaderScene");
  }

  preload() {
    this.add.image(460, 180, "logo").setScale(0.8);
    const progressText = this.add.text(460, 320, "Loading: 0%", {
      fontFamily: "sans-serif",
      fontSize: "18px",
      color: "#ffffff",
    });
    progressText.setOrigin(0.5);

    this.load.on("progress", (value) => {
      progressText.setText(`Loading: ${Math.round(value * 100)}%`);
    });

    this.load.audio("pop", "./assets/audio/pop.wav");
    this.load.audio("explosion", "./assets/audio/explosion.wav");
    this.load.audio("fanfare", "./assets/audio/fanfare.wav");
    this.load.audio("shrink", "./assets/audio/shrink.wav");
  }

  create() {
    this.scene.start("GameScene");
  }
}
