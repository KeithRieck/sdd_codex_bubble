export class HUD {
  constructor(scene) {
    this.scene = scene;
    this.text = scene.add.text(12, 12, "", {
      fontFamily: "sans-serif",
      fontSize: "14pt",
      color: "#ffffff",
      align: "left",
    });
    this.text.setDepth(10);
  }

  update(data) {
    this.text.setText(
      `Score: ${data.score}\nLevel: ${data.level}\nLives: ${data.lives}`,
    );
  }
}
