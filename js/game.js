// create a new scene camed "Game"
const gameScene = new Phaser.Scene("Game");

// init parameters
gameScene.init = function() {
  // game stats
  this.stats = {
    health: 100,
    fun: 100
  };
};

// load asset files
gameScene.preload = function() {
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
};

// create
gameScene.create = function() {
  // bg
  this.add.sprite(0, 0, "backyard").setOrigin(0, 0);

  // pet
  this.pet = this.add.sprite(100, 200, "pet", 0);

  this.createUi();
};

// create ui
gameScene.createUi = function() {
  // buttons
  this.appleBtn = this.add.sprite(72, 570, "apple").setInteractive();
  this.candyBtn = this.add.sprite(144, 570, "candy").setInteractive();
  this.toyBtn = this.add.sprite(216, 570, "toy").setInteractive();
  this.rotateBtn = this.add.sprite(288, 570, "rotate").setInteractive();
};

// update loop
gameScene.update = function() {};

const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: "Virtual Pet",
  pixelArt: false,
  backgroundColor: "ffffff"
};

const game = new Phaser.Game(config);
