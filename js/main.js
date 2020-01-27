const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: [preloadScene, homeScene, gameScene],
  title: "Virtual Pet",
  pixelArt: false,
  backgroundColor: "ffffff"
};

const game = new Phaser.Game(config);
