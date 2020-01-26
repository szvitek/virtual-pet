// create a new scene camed "Game"
const gameScene = new Phaser.Scene("Game");

// init parameters
gameScene.init = function() {};

// load asset files
gameScene.preload = function() {
  // load assets
  this.load.image("backyard", "assets/images/backyard.png");
  this.load.image("apple", "assets/images/apple.png");
  this.load.image("candy", "assets/images/candy.png");
  this.load.image("rotate", "assets/images/rotate.png");
  this.load.image("toy", "assets/images/rubber_duck.png");
};

// create
gameScene.create = function() {};

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
