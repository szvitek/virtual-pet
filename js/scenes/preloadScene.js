// create a new scene
const preloadScene = new Phaser.Scene("Preload");

preloadScene.preload = function() {
  // show the logo
  const logo = this.add.sprite(this.sys.game.config.width / 2, 250, "logo");

  // progress bar background
  const bgBar = this.add.graphics();

  const barW = 150;
  const barH = 30;

  bgBar.setPosition(
    this.sys.game.config.width / 2 - barW / 2,
    this.sys.game.config.height / 2 - barH / 2
  );
  bgBar.fillStyle(0xf5f5f5, 1);
  bgBar.fillRect(0, 0, barW, barH);

  // progressBar
  const progressBar = this.add.graphics();
  progressBar.setPosition(
    this.sys.game.config.width / 2 - barW / 2,
    this.sys.game.config.height / 2 - barH / 2
  );

  // listen to the "progress" event
  // value is between 0 and 1
  this.load.on("progress", value => {
    // clearing brogress bar (and draw it again)

    // set style
    progressBar.fillStyle(0x9ad98d, 1);

    // draw rectangle
    progressBar.fillRect(0, 0, value * barW, barH);
  });

  // load assets
  this.load.image("backyard", "assets/images/backyard.png");
  this.load.image("apple", "assets/images/apple.png");
  this.load.image("candy", "assets/images/candy.png");
  this.load.image("rotate", "assets/images/rotate.png");
  this.load.image("toy", "assets/images/rubber_duck.png");

  // load spritesheet
  this.load.spritesheet("pet", "assets/images/pet.png", {
    frameWidth: 97,
    frameHeight: 83,
    margin: 1,
    spacing: 1
  });

  // load audio
  this.load.audio("bg", "assets/audio/bg.mp3");
  this.load.audio("apple", "assets/audio/apple.mp3");
  this.load.audio("candy", "assets/audio/candy.mp3");
  this.load.audio("duck", "assets/audio/duck.mp3");
  this.load.audio("rotate", "assets/audio/rotate.mp3");
  this.load.audio("pop", "assets/audio/pop.mp3");
  this.load.audio("eat", "assets/audio/eat.mp3");
  this.load.audio("lose", "assets/audio/lose.mp3");
};

preloadScene.create = function() {
  this.anims.create({
    key: "funnyfaces",
    frames: this.anims.generateFrameNames("pet", {
      frames: [5, 6]
    }),
    frameRate: 7,
    yoyo: true,
    repeat: 3
  });

  this.anims.create({
    key: "eatingfaces",
    frames: this.anims.generateFrameNames("pet", {
      frames: [1, 2, 3]
    }),
    frameRate: 7,
    yoyo: true,
    repeat: 0
  });

  this.scene.start("Home");
};
