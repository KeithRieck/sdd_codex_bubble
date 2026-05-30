import { BootScene } from "./scenes/BootScene.js";
import { PreloaderScene } from "./scenes/PreloaderScene.js";
import { GameScene } from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 920,
  height: 600,
  backgroundColor: "#222222",
  scene: [BootScene, PreloaderScene, GameScene],
};

new Phaser.Game(config);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
    } catch (error) {
      console.warn("Service worker registration failed:", error);
    }
  });
}
