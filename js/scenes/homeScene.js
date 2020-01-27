// create a new scene
const homeScene = new Phaser.Scene("Home");

homeScene.create = function() {
  // game background, with active input
  const bg = this.add
    .sprite(0, 0, "backyard")
    .setOrigin(0, 0)
    .setInteractive();

  // welcome text
  const gameW = this.sys.game.config.width;
  const gameH = this.sys.game.config.height;
  const text = this.add.text(gameW / 2, gameH / 2, "😄 VIRTUAL PET", {
    font: "40px Arial",
    fill: "#ffffff"
  });
  text.setOrigin(0.5);
  text.depth = 1;

  // text background rectangle
  const textBg = this.add.graphics();
  textBg.fillStyle(0x000000, 0.7);
  textBg.fillRect(
    gameW / 2 - text.width / 2 - 10,
    gameH / 2 - text.height / 2 - 10,
    text.width + 20,
    text.height + 20
  );

  bg.on("pointerdown", () => {
    this.scene.start("Game");
  });

  // audio
  this.bgMusic = this.sound.add("bg");
  this.bgMusic.play({ loop: true });
};
